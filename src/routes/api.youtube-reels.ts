import { createFileRoute } from "@tanstack/react-router";
import { fetchYoutubeReels } from "@/lib/youtube";

export const Route = createFileRoute("/api/youtube-reels")({
  server: {
    handlers: {
      GET: async () => {
        const videos = await fetchYoutubeReels();
        return Response.json({ videos }, {
          headers: {
            "cache-control": "public, max-age=900, stale-while-revalidate=2700",
          },
        });
      },
    },
  },
});