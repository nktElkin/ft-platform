import { ArrowDownUp } from "lucide-react";
import RemoveCourseModuleBtn from "./cross-btn";
import IndicatorsBlock from "./indicators-block";
import Link from "next/link";

interface PreviewCardProps {
  object: any;
  variant: "course" | "module";
  courseCategory?: string;
  courseId?: string;
  hover?: boolean;
}

const PreviewCard = ({
  object,
  variant,
  courseCategory,
  courseId,
  hover,
}: PreviewCardProps) => {
  const title = object?.title ? new String(object?.title) : "[No Title yet]";
  const description = object?.description
    ? new String(object?.description)
    : "[No Description yet]";
  return (
    <div
      aria-roledescription={`${variant} preview-card`}
      className={`h-fit flex flex-col w-full rounded-md border border-input bg-transparent p-3 text-base shadow-sm md:text-sm relative ${hover && "hover:shadow-md transition duration-300 ease-in-out"}`}
    >
      {variant === "course" && (
        <>
          {object?.wallpaperUrl && (
            <img
              src={`${object?.wallpaperUrl}`}
              alt="object Image"
              className="w-full h-40 object-cover rounded-t-md mb-3"
            />
          )}
          <div className="text-start">
            <h3
              className={`text-lg font-semibold ${variant === "course" && "mb-2"}`}
            >
              {title}
            </h3>
            <p className="text-sm text-zinc-500 mb-2">
              {description.length > 120
                ? `${description.slice(0, 120)}...`
                : `${description}`}
            </p>
            <IndicatorsBlock
              type={variant}
              object={object}
              categoryName={courseCategory}
            />
          </div>
        </>
      )}
      {variant === "module" && (
        <>
          <div className="text-start">
            <div className="flex items-center justify-between">
              <Link
                href={`/tutor/edit-course/${courseId}/edit-module/${object?.id}`}
              >
                <div className="flex flex-row space-x-2 items-center mr-2">
                  <span>
                    <ArrowDownUp size={16} />
                  </span>
                  <h3 className={`text-lg font-semibold'}`}>{title}</h3>
                </div>
              </Link>
              <div className="flex flex-row items-center">
                <IndicatorsBlock
                  type={variant}
                  object={object}
                  categoryName={courseCategory}
                />
                <RemoveCourseModuleBtn
                  courseId={object?.courseId}
                  moduleId={object?.id}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewCard;
