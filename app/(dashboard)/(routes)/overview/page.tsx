import OverviewPage from "./_components/overviewPage";
import { db } from "@/lib/db";

export default async function OverviewLayout() {
  const categories = await db.category.findMany();
  return <OverviewPage categories={categories} />;
}
