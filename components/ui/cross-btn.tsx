'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveCourseModuleBtnProps{
    moduleId: string,
    courseId: string
}


const RemoveCourseModuleBtn = ({moduleId, courseId}:RemoveCourseModuleBtnProps) => {
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
        <button type="button"  onClick={handleDelete} className="font-bold absolute top-2 right-5 delete-btn">&times;</button>
    );
}
 
export default RemoveCourseModuleBtn;

