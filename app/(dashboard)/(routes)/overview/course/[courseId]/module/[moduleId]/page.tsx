import { db } from "@/lib/db";

// generateStaticParams for dynamical routes
export const generateStaticParams = async () => {
    const modules = await db.courseModule.findMany({ select: { id: true } });
    return modules.map(module  => ({
        moduleId: module.id,
    }));
};

const ModulIdPage = ({params} :  { params: Promise<{ moduleId: string }> }) => {
    return (<>
    </>);
}
 
export default ModulIdPage;