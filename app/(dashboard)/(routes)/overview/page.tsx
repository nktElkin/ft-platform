import PageLayout from "./_components/pageLayout";
import { db } from "@/lib/db";

export default async function SearchPage() {
    const categories = await db.category.findMany();

    return (<PageLayout categories={categories}/>);
    
}
