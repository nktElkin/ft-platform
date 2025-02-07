import IndicatorsBlock from "@/components/ui/indicators-block";
import { Course } from "@prisma/client";
import Link from "next/link";

interface CoursePreviewCardProps {
  course: Course;
  courseCategory?: string;
}

const CoursePreviewCard = ({
  course,
  courseCategory = "Uncategorized",
}: CoursePreviewCardProps) => {
  return (
    <Link
      href={`overview/course/${course.id}`}
      className="h-full w-auto block"
    >
      <div
        aria-roledescription="course preview-card"
        className="h-full w-full rounded-md border border-input bg-transparent p-3 text-base shadow-sm sm:text-sm relative hover:shadow-md transition duration-300 ease-in-out  flex flex-col justify-around"
      >
        <div>
          {course?.wallpaperUrl && (
            <img
              src={`${course?.wallpaperUrl}`}
              alt="object Image"
              className="w-full h-40 sm:h-20 object-cover rounded-t-md mb-3"
            />
          )}
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-zinc-500 mb-2">
              {!course?.description ? (
                <>
                  Hmmm, not alot
                  <br />
                  Click on and find oit more info!
                </>
              ) : course?.description.length > 90 ? (
                `${course?.description?.slice(0, 90)}...`
              ) : (
                `${!course?.description}`
              )}
            </p>
          </div>
          <IndicatorsBlock
            type="course"
            object={course}
            categoryName={courseCategory}
          />
        </div>
      </div>
    </Link>
  );
};

export default CoursePreviewCard;
