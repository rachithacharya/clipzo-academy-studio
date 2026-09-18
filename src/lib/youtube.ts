import type { YoutubeReel } from "@/components/brand-page";

const youtubeFeedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCOfGYJgXItJTgmQQiQJYI7Q";
const youtubeChannelId = "UCOfGYJgXItJTgmQQiQJYI7Q";
const youtubeApiKey = process.env["YOUTUBE_API_KEY"];
const feedCacheTtl = 60_000;
let cachedFeed: { expiresAt: number; reels: YoutubeReel[] } | undefined;
let pendingFeed: Promise<YoutubeReel[]> | undefined;

function decodeXml(value: string) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export async function fetchYoutubeReels(): Promise<YoutubeReel[]> {
  if (cachedFeed && cachedFeed.expiresAt > Date.now()) return cachedFeed.reels;
  if (pendingFeed) return pendingFeed;

  const request = fetchYoutubeFeed();
  pendingFeed = request;
  const reels = await request;
  pendingFeed = undefined;
  cachedFeed = { expiresAt: Date.now() + feedCacheTtl, reels };
  return reels;
}

async function fetchYoutubeFeed(): Promise<YoutubeReel[]> {
  const [apiReels, feedReels] = await Promise.all([
    youtubeApiKey ? fetchYoutubeApi(youtubeApiKey) : Promise.resolve([]),
    fetchYoutubeAtomFeed(),
  ]);
  return apiReels.length > 0 ? apiReels : feedReels;
}

async function fetchYoutubeAtomFeed(): Promise<YoutubeReel[]> {
  try {
    const response = await fetch(youtubeFeedUrl, { headers: { Accept: "application/atom+xml" }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) return [];
    const xml = await response.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    return entries.flatMap((entry) => {
      const block = entry[1] ?? "";
      const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      if (!id || !title) return [];
      return [{
        id,
        title: decodeXml(title.trim()),
        thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        url: `https://www.youtube.com/shorts/${id}`,
      }];
    });
  } catch {
    return [];
  }
}

async function fetchYoutubeApi(apiKey: string): Promise<YoutubeReel[]> {
  try {
    const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${youtubeChannelId}&key=${apiKey}`, { signal: AbortSignal.timeout(2500) });
    if (!channelResponse.ok) return [];
    const channelData = await channelResponse.json() as { items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }> };
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return [];

    const playlistResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`, { signal: AbortSignal.timeout(2500) });
    if (!playlistResponse.ok) return [];
    const playlistData = await playlistResponse.json() as { items?: Array<{ contentDetails?: { videoId?: string }; snippet?: { title?: string; thumbnails?: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } } } }> };

    return (playlistData.items ?? []).flatMap(item => {
      const id = item.contentDetails?.videoId;
      const snippet = item.snippet;
      if (!id || !snippet?.title) return [];
      return [{
        id,
        title: snippet.title,
        thumbnail: snippet.thumbnails?.maxres?.url ?? snippet.thumbnails?.high?.url ?? snippet.thumbnails?.medium?.url ?? `https://i.ytimg.com/vi/${id}/hq720.jpg`,
        url: `https://www.youtube.com/shorts/${id}`,
      }];
    });
  } catch {
    return [];
  }
}
