import type { YoutubeReel } from "@/components/brand-page";

const feedCacheTtl = 30 * 60_000;
const maxVideos = 30;
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
  const youtubeApiKey = process.env["YOUTUBE_API_KEY"];
  const youtubeChannelId = process.env["YOUTUBE_CHANNEL_ID"];
  if (!youtubeApiKey || !youtubeChannelId) return [];
  return fetchYoutubeApi(youtubeApiKey, youtubeChannelId);
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
