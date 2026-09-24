import type { YoutubeReel } from "@/components/brand-page";

const feedCacheTtl = 30 * 60_000;
const maxVideos = 30;
const defaultYoutubeChannelId = "UCOfGYJgXItJTgmQQiQJYI7Q";
let cachedFeed: { expiresAt: number; reels: YoutubeReel[] } | undefined;
let pendingFeed: Promise<YoutubeReel[]> | undefined;

export async function fetchYoutubeReels(): Promise<YoutubeReel[]> {
  if (cachedFeed && cachedFeed.expiresAt > Date.now()) return cachedFeed.reels;
  if (pendingFeed) return pendingFeed;

  const request = fetchYoutubeFeed().catch((error) => {
    console.error("YouTube feed refresh failed", error);
    return cachedFeed?.reels ?? [];
  });
  pendingFeed = request;
  try {
    const reels = await request;
    if (reels.length > 0) cachedFeed = { expiresAt: Date.now() + feedCacheTtl, reels };
    return reels;
  } finally {
    pendingFeed = undefined;
  }
}

async function fetchYoutubeFeed(): Promise<YoutubeReel[]> {
  const youtubeChannelId = process.env["YOUTUBE_CHANNEL_ID"] ?? defaultYoutubeChannelId;

  const rssReels = await fetchYoutubeRss(youtubeChannelId);
  if (rssReels.length > 0) return rssReels;

  const youtubeApiKey = process.env["YOUTUBE_API_KEY"];
  return youtubeApiKey ? fetchYoutubeApi(youtubeApiKey, youtubeChannelId) : [];
}

async function fetchYoutubeRss(channelId: string): Promise<YoutubeReel[]> {
  const feedUrl = new URL("https://www.youtube.com/feeds/videos.xml");
  feedUrl.searchParams.set("channel_id", channelId);
  const response = await fetch(feedUrl, { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error(`YouTube RSS feed returned ${response.status}`);

  const xml = await response.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap((match) => {
    const entry = match[1];
    const id = readXmlTag(entry, "yt:videoId");
    const title = readXmlTag(entry, "title");
    if (!id || !title) return [];
    return [{
      id,
      title,
      description: readXmlTag(entry, "media:description") ?? "",
      publishedAt: readXmlTag(entry, "published") ?? "",
      thumbnail: `https://i.ytimg.com/vi/${id}/0.jpg`,
      youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
    }];
  }).slice(0, maxVideos);
}

function readXmlTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match?.[1] ? decodeXmlEntities(match[1].trim()) : undefined;
}

function decodeXmlEntities(value: string): string {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

async function fetchYoutubeApi(apiKey: string, channelId: string): Promise<YoutubeReel[]> {
  const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
  channelUrl.searchParams.set("part", "contentDetails");
  channelUrl.searchParams.set("id", channelId);
  channelUrl.searchParams.set("key", apiKey);
  const channelResponse = await fetch(channelUrl, { signal: AbortSignal.timeout(5000) });
  if (!channelResponse.ok) throw new Error(`YouTube channels.list returned ${channelResponse.status}`);
  const channelData = await channelResponse.json() as { items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }> };
  const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) throw new Error("YouTube uploads playlist was not found");

  const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  playlistUrl.searchParams.set("part", "snippet,contentDetails");
  playlistUrl.searchParams.set("maxResults", "50");
  playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
  playlistUrl.searchParams.set("key", apiKey);
  const playlistResponse = await fetch(playlistUrl, { signal: AbortSignal.timeout(5000) });
  if (!playlistResponse.ok) throw new Error(`YouTube playlistItems.list returned ${playlistResponse.status}`);
  const playlistData = await playlistResponse.json() as {
    items?: Array<{
      contentDetails?: { videoId?: string };
      snippet?: {
        title?: string;
        description?: string;
        publishedAt?: string;
        thumbnails?: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } };
      };
    }>;
  };

  return (playlistData.items ?? []).flatMap(item => {
    const id = item.contentDetails?.videoId;
    const snippet = item.snippet;
    if (!id || !snippet?.title) return [];
    return [{
      id,
      title: snippet.title,
      description: snippet.description ?? "",
      publishedAt: snippet.publishedAt ?? "",
      thumbnail: snippet.thumbnails?.maxres?.url ?? snippet.thumbnails?.high?.url ?? snippet.thumbnails?.medium?.url ?? `https://i.ytimg.com/vi/${id}/hq720.jpg`,
      youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
    }];
  }).sort((left, right) => right.publishedAt.localeCompare(left.publishedAt)).slice(0, maxVideos);
}
