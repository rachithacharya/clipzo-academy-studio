import { createFileRoute } from "@tanstack/react-router";
import { BrandPage, type BrandPageKey } from "@/components/brand-page";

const validPages = ["about", "partner", "videos"] as const;

export const Route = createFileRoute("/academy/$page")({
  head: ({ params }) => ({ meta: [{ title: `Clipzo Academy - ${params.page}` }] }),
  component: AcademyPage,
});

function AcademyPage() {
  const { page } = Route.useParams();
  const selectedPage = validPages.includes(page as typeof validPages[number]) ? page as BrandPageKey : "home";
  return <BrandPage brand="academy" page={selectedPage} />;
}
