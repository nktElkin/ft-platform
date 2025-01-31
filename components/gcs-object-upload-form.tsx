"use client";

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
import Dropzone from "./gcs-dropzone";
import { useState } from "react";

// Define the form schema
const FormSchema = z.object({
  altText: z.string().min(1, "Alt text is required").max(120, "Alt text cannot exceed 120 characters"),
  description: z.string().max(200, "Description cannot exceed 200 characters").optional(),
//   url: z.string().url("Invalid URL"),
});

const GCSFileUploadForm = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null); // State to store the uploaded file URL

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      altText: "",
      description: "",
    //   url: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!fileUrl) {
      alert("Please upload a file first.");
      return;
    }

    // Prepare the payload
    const payload = {
      storageUrl: fileUrl,
      id: fileUrl.split("/").pop(), // Extract the file ID from the URL
      altText: data.altText,
      description: data.description,
    };

    console.log("Submitting form with payload:", payload);

    // try {
    //   // Send the POST request to your API
    //   const response = await fetch("/api/media", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (response.ok) {
    //     alert("Media uploaded successfully!");
    //     form.reset();
    //     setFileUrl(null);
    //   } else {
    //     const errorData = await response.json();
    //     alert(`Error: ${errorData.error}`);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   alert("An error occurred while submitting the form.");
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Dropzone for file upload */}
       
        <FormItem>
          <FormLabel>Upload Media</FormLabel>
          <FormControl>
            <Dropzone onUploadSuccess={(url) => setFileUrl(url)} />
          </FormControl>
          <FormDescription>Upload your media file here.</FormDescription>
          <FormMessage />
        </FormItem>

        {/* Alt Text Input */}
        <FormField
          control={form.control}
          name="altText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <FormControl>
                <Input placeholder="Enter alt text" {...field} />
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
                <Input placeholder="Enter description (optional)" {...field} />
              </FormControl>
              <FormDescription>
                Provide additional context for the media (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default GCSFileUploadForm;