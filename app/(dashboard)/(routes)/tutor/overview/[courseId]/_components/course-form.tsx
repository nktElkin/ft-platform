import EditCategoryForm from "./edit-category-form";
import EditDescriptionForm from "./edit-description-form";
import EditTitleForm from "./edit-title-form";
import UploadMediaForm from "./upload-media-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




interface CourseCreationFormProps {
  initials: any,
  courseId: string,
  categories: {label: string; value: string}[];
  defaultCategory : string
  courseWallpaperIsValid?: boolean
}

const  CourseCreationForm = ({ initials, courseId, categories, defaultCategory, courseWallpaperIsValid }: CourseCreationFormProps) => {

  return (
    <section>
      <Tabs defaultValue="course-info">
        <TabsList className="mb-3">
          <TabsTrigger value="course-info">Info</TabsTrigger>
          <TabsTrigger value="course-mudule">Module</TabsTrigger>
        </TabsList>
        <TabsContent value="course-info" className="flex flex-col w-full gap-6">
          <EditTitleForm initials={initials} courseId={courseId} />
          <span className="border-solid border-2 border-grey-100"/>
          <EditDescriptionForm initials={initials} courseId={courseId} />
          <span className="border-solid border-2 border-grey-100"/>
          <EditCategoryForm initials={initials} courseId={courseId} categories={categories} defaultCategory={defaultCategory}/>
          <span className="border-solid border-2 border-grey-100"/>
          <UploadMediaForm initials={initials} courseId={courseId} isValidImageUrl={courseWallpaperIsValid}/>
        </TabsContent>
        <TabsContent value="course-mudule">Module edition form</TabsContent>
      </Tabs>
    </section>
  )
}

export default CourseCreationForm


// <Tabs defaultValue="account" className="w-[400px]">
//   <TabsList>
//     <TabsTrigger value="account">Account</TabsTrigger>
//     <TabsTrigger value="password">Password</TabsTrigger>
//   </TabsList>
//   <TabsContent value="account">Make changes to your account here.</TabsContent>
//   <TabsContent value="password">Change your password here.</TabsContent>
// </Tabs>
