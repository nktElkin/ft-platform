import EditCategoryForm from "../../_components/edit-category-form";
import EditDescriptionForm from "../../_components/edit-description-form";
import EditTitleForm from "../../_components/edit-title-form";


interface CourseCreationFormProps {
  initials: any,
  courseId: string,
  categories: {label: string; value: string}[];
  defaultCategory : string
}

const CourseCreationForm = ({ initials, courseId, categories, defaultCategory }: CourseCreationFormProps) => {


  return ( 
    <section className="flex flex-col w-full gap-6">
    <EditTitleForm initials={initials} courseId={courseId} />
    <span className="border-solid border-2 border-grey-100"/>
    <EditDescriptionForm initials={initials} courseId={courseId} />
    <span className="border-solid border-2 border-grey-100"/>
    <EditCategoryForm initials={initials} courseId={courseId} categories={categories} defaultCategory={defaultCategory}/>
    </section>  
  )
}

export default CourseCreationForm