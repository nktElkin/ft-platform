"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import InputCover from "@/components/ui/input-cover";
import { CourseModule } from "@prisma/client";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "description must be at least 2 characters",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditDesctiptionFormProps {
  initials: CourseModule;
  courseId: string;
}

const EditDesctiptionForm = ({
  initials,
  courseId,
}: EditDesctiptionFormProps) => {
  const [isEditigin, setIsEditing] = useState(false);
  const router = useRouter();

  function editMode() {
    setIsEditing((cur) => !cur);
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initials?.description || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    const moduleId = initials?.id;

    try {
      const response = await fetch(
        `/api/courses/${courseId}/courseModules/${moduleId}`,
        { method: "PATCH", body: JSON.stringify(values) },
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(
          response.status === 404
            ? "Course not found. Please check the course ID."
            : `Failed to update course: ${error}`,
        );
      }
      const responseData = await response.json();
    } catch (error) {
      toast.error("Fild uattenpt");
      // console.error(error)
    }
    editMode();
    router.refresh();
  };

  return (
    <div className="flex flex-col space-y-8">
      <Label className="">Course description</Label>
      {!isEditigin && (
        <InputCover
          value={initials?.description || "[No description yet]"}
          onToggle={editMode}
          controllerState={isEditigin}
          inputVariant="input"
        />
      )}
      {isEditigin && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter course description"
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
      )}
    </div>
  );
};

export default EditDesctiptionForm;
