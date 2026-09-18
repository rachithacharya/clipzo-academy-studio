import { createFileRoute } from "@tanstack/react-router";
import { BrandPage, type BrandPageKey } from "@/components/brand-page";
import { fetchYoutubeReels } from "@/lib/youtube";

const validPages = ["about", "partner", "videos", "reels"] as const;

export const Route = createFileRoute("/clipzo/$page")({
  head: ({ params }) => ({ meta: [{ title: `Clipzo - ${params.page}` }] }),
  loader: async () => ({ youtubeReels: await fetchYoutubeReels() }),
  component: ClipzoPage,
});

function ClipzoPage() {
  const { page } = Route.useParams();
  const { youtubeReels } = Route.useLoaderData();
  const selectedPage = validPages.includes(page as typeof validPages[number]) ? page as BrandPageKey : "home";
  return <BrandPage brand="clipzo" page={selectedPage} youtubeReels={youtubeReels} />;
}
