import { createFileRoute } from "@tanstack/react-router";
import { BrandPage } from "@/components/brand-page";
import academyImage from "@/assets/academy-classroom.jpg";

const shareImage = new URL(academyImage, "https://id-preview--60f1774b-8fb8-4a6c-a8d2-8e843384a534.lovable.app").href;

export const Route = createFileRoute("/academy")({
  head: () => ({ meta: [
    { title: "Clipzo Academy - Learn Creative Craft" },
    { name: "description", content: "Practical multimedia courses in editing, camera craft, and direction." },
    { property: "og:title", content: "Clipzo Academy - Learn Creative Craft" },
    { property: "og:description", content: "Learn, create, and master the craft behind every frame." },
    { property: "og:url", content: "/academy" },
    { property: "og:image", content: shareImage }, { name: "twitter:image", content: shareImage },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/academy" }] }),
  component: () => <BrandPage brand="academy" />,
});