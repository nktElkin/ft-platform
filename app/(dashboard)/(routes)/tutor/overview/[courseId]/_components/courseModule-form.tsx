'use client'
import { z } from "zod";
import EditCategoryForm from "./edit-category-form";
import EditDescriptionForm from "./edit-description-form";
import EditTitleForm from "./edit-title-form";
import UploadMediaForm from "./upload-media-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCover from "@/components/ui/input-cover";


// const formSchema = z.object({
//   title: z.string().min(2, {
//     message: "Title must be at least 2 characters",
//   })
// })

// interface CourseModuleCreationFormProps {
//   courseId: string,
//   initialValue?: string | null
// }

// type FormValues = z.infer<typeof formSchema>


// const CourseModuleCreationForm = ({ courseId, initialValue }: CourseModuleCreationFormProps) => {
//   const [isEditigin, setIsEditing] = useState(false);
//   const router = useRouter();
  
//   const form = useForm<FormValues>({
//           resolver: zodResolver(formSchema),
//           defaultValues: {
//               title: '[New module]',
//           }
//       })
//       const { isSubmitting, isValid } = form.formState;

//   function editMode() {
//     setIsEditing((cur) => !cur);
//   }

//   const onSubmit = async (values: FormValues) => {
//     console.log(values)
//     try {
//       const response = await fetch(`/api/courses/${courseId}/courseModules`, { method: "POST", body: JSON.stringify(values) });
//       if (!response.ok) {
//         const error = await response.text();
//         throw new Error(response.status === 404
//           ? "Course not found. Please check the course ID."
//           : `Failed to update course: ${error}`);
//       }
//       const responseData = await response.json();
//       console.log(responseData)
//       toast.success("Successfully created");
//     } catch (error) {
//       toast.error('Fild uattenpt')
//       console.error(error)
//     }
//     editMode();
//     router.refresh();
//   }


//   return (
//     <div className="flex flex-col space-y-8">
//             <Label className="">Course Title</Label>
//             {!isEditigin &&
//                 <InputCover value={initialValue || '[New module]'} onToggle={editMode} controllerState={isEditigin} inputVariant="input"/>
//             }
//             {isEditigin &&
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                         <FormField
//                             control={form.control}
//                             name="title"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormControl>
//                                         <Input placeholder="Enter course title" {...field} disabled={isSubmitting} />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />
//                         <Button className="mr-2 font-semibold" type="reset" onClick={editMode} variant='outline'>Cancel</Button>
//                         <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Loading...' : 'Apply'}</Button>
//                         {/* <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? "Bulishing" : `${initials.isPublished? 'To draft' : 'Publish now'}` }</Button> */}
//                     </form>
//                 </Form>
//             }
//         </div>
//     // <section className="flex flex-col w-full gap-6" aria-description="Course Module creation form">
//     //   <EditTitleForm initials={initials} courseId={courseId} />
//     //   <span className="border-solid border-2 border-grey-100" />

//     // </section>
//   )
// }

// export default CourseModuleCreationForm



const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  })
});

interface CourseModuleCreationFormProps {
  courseId: string,
  initialValue?: string | null
}

type FormValues = z.infer<typeof formSchema>

const CourseModuleCreationForm = ({ courseId, initialValue }: CourseModuleCreationFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValue || '',
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const editMode = () => setIsEditing(prev => !prev);

  // const onSubmit = async (values: FormValues) => {
  //   try {
  //     const response = await fetch(`/api/courses/${courseId}/courseModules`, {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(values)
  //     });

  //     if (!response.ok) {
  //       const error = await response.text();
  //       throw new Error(response.status === 404
  //         ? "Course not found. Please check the course ID."
  //         : `Failed to update course: ${error}`);
  //     }

  //     const responseData = await response.json();
  //     console.log(responseData);
  //     toast.success("Successfully created");
  //     editMode();
  //     router.refresh();
  //   } catch (error) {
  //     toast.error('Failed to create module');
  //     console.error(error);
  //   }
  // }

  const onSubmit = async (values: FormValues) => {
        console.log(values)
        try {
          const response = await fetch(`/api/courses/${courseId}/courseModules`, { method: "POST",headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
          if (!response.ok) {
            const error = await response.text();
            throw new Error(response.status === 404
              ? "Course not found. Please check the course ID."
              : `Failed to create module: ${error}`);
          }
          const responseData = await response.json();
          console.log(responseData)
          toast.success("Successfully created");
        } catch (error) {
          toast.error('Faild attempt')
          console.error(error)
        }
        editMode();
        router.refresh();
      }

  return (
    <div className="flex flex-col space-y-8">
      <Label>Module Title</Label>
      {!isEditing ? (
        <InputCover 
          value={initialValue || 'No Title yet'} 
          onToggle={editMode} 
          controllerState={isEditing} 
          inputVariant="input"
        />
      ) : (
        <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormControl>
                                          <Input placeholder="Enter module title" {...field} disabled={isSubmitting} />
                                      </FormControl>
                                  </FormItem>
                              )}
                          />
                          <Button className="mr-2 font-semibold" type="reset" onClick={editMode} variant='outline'>Cancel</Button>
                          <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Loading...' : 'Apply'}</Button>
                          {/* <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? "Bulishing" : `${initials.isPublished? 'To draft' : 'Publish now'}` }</Button> */}
                      </form>
                  </Form>
      )}
    </div>
  );
}

export default CourseModuleCreationForm;