import type { YoutubeReel } from "@/components/brand-page";

const youtubeChannelId = "UCOfGYJgXItJTgmQQiQJYI7Q";
const feedCacheTtl = 60_000;
let cachedFeed: { expiresAt: number; reels: YoutubeReel[] } | undefined;
let pendingFeed: Promise<YoutubeReel[]> | undefined;

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
  const youtubeApiKey = process.env["YOUTUBE_API_KEY"];
  return youtubeApiKey ? fetchYoutubeApi(youtubeApiKey) : [];
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
