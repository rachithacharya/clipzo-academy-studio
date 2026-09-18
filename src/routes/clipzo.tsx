import { createFileRoute } from "@tanstack/react-router";
import { BrandPage } from "@/components/brand-page";
import productionImage from "@/assets/clipzo-production.jpg";
import { fetchYoutubeReels } from "@/lib/youtube";

const shareImage = new URL(productionImage, "https://id-preview--60f1774b-8fb8-4a6c-a8d2-8e843384a534.lovable.app").href;

export const Route = createFileRoute("/clipzo")({
  head: () => ({ meta: [
    { title: "Clipzo — Creative Content Production" },
    { name: "description", content: "Cinematic reels, videography, photography, and editing by Clipzo." },
    { property: "og:title", content: "Clipzo — Creative Content Production" },
    { property: "og:description", content: "Stories engineered for the scroll, from first frame to final grade." },
    { property: "og:url", content: "/clipzo" },
    { property: "og:image", content: shareImage }, { name: "twitter:image", content: shareImage },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/clipzo" }, { rel: "preconnect", href: "https://i.ytimg.com" }, { rel: "preconnect", href: "https://www.youtube.com" }] }),
  loader: async () => ({ youtubeReels: await fetchYoutubeReels() }),
  component: ClipzoHomeRoute,
});

function ClipzoHomeRoute() {
  const { youtubeReels } = Route.useLoaderData();
  return <BrandPage brand="clipzo" youtubeReels={youtubeReels} />;
}