import EditCategoryForm from "./edit-category-form";
import EditDescriptionForm from "./edit-description-form";
import EditTitleForm from "./edit-title-form";
import UploadMediaForm from "./upload-courseMedia-form";

interface CourseEditingFormProps {
  initials: any;
  courseId: string;
  categories: { label: string; value: string }[];
  defaultCategory: string;
  courseWallpaperIsValid?: boolean;
}

const CourseEditingForm = ({
  initials,
  courseId,
  categories,
  defaultCategory,
  courseWallpaperIsValid,
}: CourseEditingFormProps) => {
  return (
    <section
      className="flex flex-col w-full gap-6"
      aria-description="Course creation form"
    >
      <EditTitleForm initials={initials} courseId={courseId} />
      <span className="border-solid border-2 border-grey-100" />
      <EditDescriptionForm initials={initials} courseId={courseId} />
      <span className="border-solid border-2 border-grey-100" />
      <EditCategoryForm
        initials={initials}
        courseId={courseId}
        categories={categories}
        defaultCategory={defaultCategory}
      />
      <span className="border-solid border-2 border-grey-100" />
      <UploadMediaForm
        initials={initials}
        courseId={courseId}
        isValidImageUrl={courseWallpaperIsValid}
      />
    </section>
  );
};

export default CourseEditingForm;
