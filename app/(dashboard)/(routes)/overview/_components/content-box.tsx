import { memo } from "react";
import CoursePreviewCard from "../_components/user-preview-course-card";
import { Course } from "@prisma/client";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface ContentBoxProps {
    content: {
        courses: Course[];
    } | any,
    isLoading : boolean,
    requestFilter?: {
        value: string,
        label: string
    } | null,
}

const ContentBox = memo(function ContentBox({content, isLoading, requestFilter}: ContentBoxProps){
    let courses = content?.courses;
    if(requestFilter){
        courses = requestFilter?.value !== '' ? content?.courses.filter((course: Course) => course.categoryId === requestFilter?.value) : courses;
    }

    if(isLoading){
        return(<div className="w-full flex flex-col items-center justify-around"> 
        <LoadingSpinner state="loading" size={50}/>
        </div>)
    }

    if(!courses && !isLoading){
        return(<div className="w-full flex flex-col items-center justify-around"> 
        <h1 className="text-lg text-zinc-500">No courses found</h1>
        </div>)
    }

    return (<>
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}
        {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}
        {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}
        {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}    
            {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}    
            {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}    
            {courses.map((course : Course) => (
        <div key={course.id} className="">
                <CoursePreviewCard course={course} />
        </div>
            ))}    
    </div>
    </>
    );
        
})
 
export default ContentBox;