"use client";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface CourseCreationFormProps {
  initials: any,
  courseId: string,
}

const CourseCreationForm = ({ initials, courseId }: CourseCreationFormProps) => {
    const [isEditigin, setIsEditing] = useState(false);
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initials,
    })
    const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: FormValues) => {
    values = {...initials, ...values}
    try {
        const response = await fetch(`/api/courses/${courseId}`, { method: "PATCH", body: JSON.stringify(values) });
        if (!response.ok) {
          const error = await response.text();
          throw new Error(response.status === 404 
              ? "Course not found. Please check the course ID." 
              : `Failed to update course: ${error}`);
        }
        const responseData = await response.json();
        console.log(responseData)
        toast.success("Success fully aplied");
    } catch (error) {
      console.error(error)
    }
  }

  return (  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} disabled={isSubmitting}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting? 'Loading...':'Apply'}</Button>
        {/* <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? "Bulishing" : `${initials.isPublished? 'To draft' : 'Publish now'}` }</Button> */}
      </form>
    </Form>
  )
}

export default CourseCreationForm