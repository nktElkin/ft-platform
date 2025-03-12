"use client";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { toast } from "sonner";

interface TextEditSectionProps {
  time?: number;
  initialValue?: string;
  courseId: string;
  moduleId: string;
}

const TextEditSection = ({
  initialValue,
  courseId,
  moduleId,
  time = 2000,
}: TextEditSectionProps) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSavedValue, setLastSavedValue] = useState(initialValue);
  const router = useRouter();

  const uploadContent = useCallback(async () => {
    if (value === lastSavedValue) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/courses/${courseId}/courseModules/${moduleId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ moduleContent: value }),
        },
      );
      if (!response.ok) {
        switch (response.status) {
          case 403:
            throw new Error("Unauthorized: You do not have permission to edit this content.");
            case 404:
            throw new Error("Not Found: The course module could not be found.");
          case 500:
            throw new Error("Server error: Failed to update course module.");
          default:
            throw new Error("Unknown error: Failed to update course module.");
          }
      }
      setLastSavedValue(value);
      router.refresh();
    } catch (error : any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [value, lastSavedValue, courseId, moduleId]);

  // auto-update
  useEffect(() => {
    const timer = setTimeout(uploadContent, time);
    return () => clearTimeout(timer);
  }, [value, time, uploadContent]);

  const handleManualUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    await uploadContent();
  };

  return (
    <form
      onSubmit={handleManualUpload}
      className="space-y-2"
      aria-label="Markdown editor form"
      role="form"
    >
      <span id="editor-description" className="sr-only">
        Edit your content using Markdown syntax
      </span>
      <MDEditor
        className="col-span-2"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        preview="edit"
        textareaProps={{
          placeholder: "Please enter Markdown text",
        }}
        value={value || ""}
        onChange={setValue}
      />
      <Button
        disabled={isLoading || value === lastSavedValue}
        aria-busy={isLoading}
        aria-label={isLoading ? "Saving changes" : "Save changes"}
        type="submit"
      >
        <LoadingSpinner state={isLoading ? "loading" : ""} />{" "}
        {isLoading ? <>Loading</> : "Upload"}
      </Button>
    </form>
  );
};

export default TextEditSection;
