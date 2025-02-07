"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseModule } from "@prisma/client";

const FormSchema = z.object({
  isPublished: z.boolean().default(false),
});

interface PublishFormProps {
  module: CourseModule;
  initialValue: boolean;
  courseId: string;
  moduleId: string;
  switcher?: boolean;
}

export function PublishModuleForm({
  module,
  initialValue,
  courseId,
  moduleId,
  switcher = false,
}: PublishFormProps) {
  const [currentState, setCurrentState] = useState(initialValue);
  const router = useRouter();

  const [allowedToPublish, setAllowedToPublish] = useState(false);

  useEffect(() => {
    const fullFilled =
      Object.keys(module).filter(
        (key) =>
          module[key as keyof typeof module] !== null &&
        module[key as keyof typeof module] !== "" &&
        module[key as keyof typeof module] !== undefined,
      ).length === Object.keys(module).length;
      console.log(module)
      console.log(fullFilled);
      if (module && fullFilled) setAllowedToPublish(true);
  }, [module])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isPublished: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ isPublished: data.isPublished });
    try {
      if (currentState && switcher)
        await fetch(`/api/courses/${courseId}`, {
          method: "PATCH",
          body: JSON.stringify({ isPublished: false }),
        });
      const response = await fetch(
        `/api/courses/${courseId}/courseModules/${moduleId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ isPublished: data.isPublished }),
        },
      );
      if (!response.ok) {
        const error = await response.text();
        toast.error("Fild uattenpt");
        throw new Error(
          response.status === 404
            ? "Course not found. Please check the course ID."
            : `Failed to update course: ${error}`,
        );
      }
      console.log(response.json());
      // const responseData = await response.json();
      // console.log(responseData)
      toast.success("Successfully aplied");
      setCurrentState(!currentState);

      router.refresh();
    } catch (error) {
      toast.error("Fild uattenpt");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-row items-center ${allowedToPublish ? "" : "opacity-50"}`}
      >
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-2">
              <FormLabel className="text-base">
                {currentState ? "Unpublish" : "Publish"}
              </FormLabel>
              <FormControl>
                <Switch
                  disabled={!allowedToPublish}
                  type="submit"
                  checked={currentState}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
