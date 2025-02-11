'use client'

import { memo, useEffect, useState } from "react";
import CoursePreviewCard from "../_components/user-preview-course-card";
import { Category, Course } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterVariant } from "../../tutor/_components/search-filter";

interface ContentBoxProps {
  content:
    | {
        courses: Course[];
      }
    | any;
  isLoading: boolean;
  requestFilter?: {
    variant: FilterVariant;
    value: string | boolean;
    label: string;
  } | null;
  categories: Category[]
}

const ContentBox = memo(function ContentBox({
  content,
  isLoading,
  requestFilter,
  categories,
}: ContentBoxProps) {

  const [courses, setCourses] = useState<Course[] | null>(content?.courses); 

  useEffect(() => {
    if (requestFilter) {
      switch (requestFilter.variant) {
        case "category":
          setCourses(
            requestFilter.value !== ""
              ? content?.courses.filter(
                  (course: Course) => course.categoryId === requestFilter.value
                )
              : content?.courses
          );
          break;
        case "status":
          setCourses(
            requestFilter.value !== ""
              ? content?.courses.filter(
                  (course: Course) => course.isPublished.toString() === requestFilter.value
                )
              : content?.courses
          );
          break;
        default:
          setCourses(content?.courses);
      }
    } else {
      if (courses !== content?.courses) setCourses(content?.courses);
    }
  }, [requestFilter, content?.courses]);

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:max-w-7xl lg:mx-auto gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-full rounded-md h-52" />
        ))}
      </div>
    );
  }

  if (!courses && !isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-around">
        <h1 className="text-lg text-zinc-500">No courses found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:max-w-7xl lg:mx-auto gap-4">
        {courses?.map((course: Course) => (
          <div key={course.id}>
            <CoursePreviewCard course={course} courseCategoryName={categories?.find((category) => category?.id === course?.categoryId)?.categoryName || ''} />
          </div>
        ))}
        



        {/* dev only */}
        {courses?.map((course: Course) => (
          <div key={course.id} className="">
            <CoursePreviewCard course={course} courseCategoryName={categories?.find((category) => category?.id === course?.categoryId)?.categoryName || ''} />
          </div>
        ))}
        {courses?.map((course: Course) => (
          <div key={course.id} className="">
            <CoursePreviewCard course={course} courseCategoryName={categories?.find((category) => category?.id === course?.categoryId)?.categoryName || ''} />
          </div>
        ))}
        {courses?.map((course: Course) => (
          <div key={course.id} className="">
            <CoursePreviewCard course={course} courseCategoryName={categories?.find((category) => category?.id === course?.categoryId)?.categoryName || ''} />
          </div>
        ))}
        {courses?.map((course: Course) => (
          <div key={course.id} className="">
            <CoursePreviewCard course={course} courseCategoryName={categories?.find((category) => category?.id === course?.categoryId)?.categoryName || ''} />
          </div>
        ))}
        {courses?.map((course: Course) => (
          <div key={course.id} className="">
            <CoursePreviewCard course={course} courseCategoryName={categories?.find((category) => category?.id === course?.categoryId)?.categoryName || ''} />
          </div>
        ))}
      </div>
    </>
  );
});

export default ContentBox;
