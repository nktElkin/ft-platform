"use client";











// FIXME:  payload is null, must be an object ???? сука блять он ебаный объкт








import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GCSDropzone from "./gcs-dropzone";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Define the form schema
const FormSchema = z.object({
  altText: z.string().min(1, "Alt text is required").max(120, "Alt text cannot exceed 120 characters"),
  description: z.string().max(200, "Description cannot exceed 200 characters").optional(),
  url: z.string().url("Invalid URL"),
});

// interface GCFMediaUploadFormProps {
//   moduleId: string;
//   courseId: string;
// }

const GCFMediaUploadFormProps = () => {
  const [fileUrl, setFileUrl] = useState<string | null>('https://storage.googleapis.com/mediastorage-buck/10430079863304.png'); // State to store the uploaded file URL
  useEffect(() => {
    form.setValue("url", fileUrl ? fileUrl : '');
  }, [fileUrl]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      altText: "",
      description: "",
      url: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!fileUrl) {
      alert("Please upload a file first.");
      return;
    }



    const courseId = '676e8fb07ef28e10b5566426';
    const moduleId = '6790a2ac42a2db93549849cd';

    // Prepare the values
    const payload = {
      url: fileUrl,
      id: fileUrl.split("/").pop()?.split('.').at(0), // Extract the file ID from the URL
      altText: data.altText,
      description: data.description || '',
      courseModuleId: moduleId
    };


      console.log(payload);
    try {
      const response = await fetch(`/api/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify({ payload, courseId }),
      });

      const data = await response.json()
      console.log(data);

      // if (response.ok) {
      //   alert("Media uploaded successfully!");
      //   form.reset();
      //   setFileUrl(null);
      //   toast.success("Media uploaded successfully!");
      // } else {
      //   const errorData = await response.json();
      //   console.error("Error submitting form:", errorData);
      //   toast.error("Failed to upload media");
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to upload media");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Dropzone for file upload */}

        <FormItem>
          <FormLabel>Upload Media</FormLabel>
          <FormControl>
            <GCSDropzone onUploadSuccess={(url) => setFileUrl(url)} />
          </FormControl>
          <FormDescription>Upload your media file here.</FormDescription>
          <FormMessage />
        </FormItem>

        {/* hidden ull input */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="hidden" // Hide the input field
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alt Text Input */}
        <FormField
          control={form.control}
          name="altText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <FormControl>
                <Input disabled={!fileUrl} placeholder="Enter alt text" {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description of the media for accessibility.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Input */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input disabled={!fileUrl} placeholder="Enter description (optional)" {...field} />
              </FormControl>
              <FormDescription>
                Provide additional context for the media (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button disabled={!fileUrl && isValid && !isSubmitting} type="submit">{isSubmitting ? 'Uploading...' : 'Submit'}</Button>
      </form>
    </Form>
  );
}

export default GCFMediaUploadFormProps;