'use client';

import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveCourseModuleBtnProps{
    moduleId: string,
    courseId: string
    absolute?: boolean
}


const RemoveCourseModuleBtn = ({moduleId, courseId, absolute}:RemoveCourseModuleBtnProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    
    const handleDelete = async () => {
        //misclick prevention
        const confirmed = window.confirm('Are you sure you want to delete this module?');
        if (!confirmed) return;

        try {
            setIsLoading(true);
            const response = await fetch(`/api/courses/${courseId}/courseModules/${moduleId}`, {
              method: 'DELETE',
            });
      
            if (!response.ok) {
              throw new Error('Failed to delete module');
            }
      
            toast.success('Module deleted successfully');
        
            router.refresh();
          } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
          } finally {
            setIsLoading(false);
          }

    }

    return (
        <button type="button" aria-description="Delete course button" onClick={handleDelete} className={`font-bold ${absolute && 'absolute'} px-3 py-2`}><CircleX/></button>
    );
}
 
export default RemoveCourseModuleBtn;

