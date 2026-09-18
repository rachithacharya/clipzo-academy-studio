import { createFileRoute } from "@tanstack/react-router";
import { BrandPage } from "@/components/brand-page";
import studioImage from "@/assets/studio-soundstage.jpg";

const shareImage = new URL(studioImage, "https://id-preview--60f1774b-8fb8-4a6c-a8d2-8e843384a534.lovable.app").href;

export const Route = createFileRoute("/studio")({
  head: () => ({ meta: [
    { title: "Clipzo Studio — Professional Production Space" },
    { name: "description", content: "A premium production studio with stages, cameras, lighting, and crew support." },
    { property: "og:title", content: "Clipzo Studio — Professional Production Space" },
    { property: "og:description", content: "Shoot, create, and produce on a floor built to perform." },
    { property: "og:url", content: "/studio" },
    { property: "og:image", content: shareImage }, { name: "twitter:image", content: shareImage },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/studio" }] }),
  component: () => <BrandPage brand="studio" />,
});