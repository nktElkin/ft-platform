import CoursePreviewCard from "../_components/user-preview-course-card";
import { Course } from "@prisma/client";

interface ContentBoxProps {
    content: {
        courses: Course[];
    } | any;
}

const ContentBox = ({content}: ContentBoxProps) => {
    const courses = content?.courses;
    return (<>
    {!courses ? <p>No courses found</p> : 
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    }
    </>
    );
        
}
 
export default ContentBox;