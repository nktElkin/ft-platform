import { db } from "@/lib/db";
import TutorOverviewPage from "./_components/tutor-page-layout";


// export const revalidate = 60; // 2 minutes 

const TutorDataLayout = async () => {

    const [categories] = await Promise.all([
        db.category.findMany().catch(() => null),
    ]);

    return (<TutorOverviewPage categories={categories || []} />);
}

export default TutorDataLayout;
