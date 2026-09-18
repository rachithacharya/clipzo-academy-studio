import { createFileRoute } from "@tanstack/react-router";
import { BrandPage, type BrandPageKey } from "@/components/brand-page";

const validPages = ["about", "partner", "videos"] as const;

export const Route = createFileRoute("/studio/$page")({
  head: ({ params }) => ({ meta: [{ title: `Clipzo Studio — ${params.page}` }] }),
  component: StudioPage,
});

function StudioPage() {
  const { page } = Route.useParams();
  const selectedPage = validPages.includes(page as typeof validPages[number]) ? page as BrandPageKey : "home";
  return <BrandPage brand="studio" page={selectedPage} />;
}
