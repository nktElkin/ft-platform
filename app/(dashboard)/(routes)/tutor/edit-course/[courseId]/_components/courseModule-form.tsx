"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCover from "@/components/ui/input-cover";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
});

interface CourseModuleCreationFormProps {
  courseId: string;
  initialValue?: string | null;
}

type FormValues = z.infer<typeof formSchema>;

const CourseModuleCreationForm = ({
  courseId,
  initialValue,
}: CourseModuleCreationFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValue || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const editMode = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/courseModules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(
          response.status === 404
            ? "Course not found. Please check the course ID."
            : `Failed to create module: ${error}`,
        );
      }
      const responseData = await response.json();
      form.reset();
      toast.success("Successfully created");
    } catch (error) {
      toast.error("Faild attempt");
      console.error(error);
    }
    editMode();
    router.refresh();
  };

  return (
    <section className="flex flex-col space-y-8">
      <Label>Module Title</Label>
      {/* {!isEditing ? (
        <InputCover 
          value={initialValue || 'No Title yet'} 
          onToggle={editMode} 
          controllerState={isEditing} 
          inputVariant="input"
        />
      ) : (
      )} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter module title"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="mr-2 font-semibold"
            type="reset"
            onClick={editMode}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Loading..." : "Apply"}
          </Button>
          {/* <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? "Bulishing" : `${initials.isPublished? 'To draft' : 'Publish now'}` }</Button> */}
        </form>
      </Form>
    </section>
  );
};

export default CourseModuleCreationForm;
