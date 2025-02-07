"use client";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
// import { uploadMakrdownToDB } from '@/lib/actions';
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

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

    try {
      setIsLoading(true);
      console.log(value);
      // const response = await fetch(`/api/courses/${courseId}/courseModules/${moduleId}`, { method: "PATCH", body: JSON.stringify({moduleContent: value || ''})})
      const response = await fetch(
        `/api/courses/${courseId}/courseModules/${moduleId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ moduleContent: value }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error ||
            `Server error: ${response.status} ${response.statusText}`,
        );
      }
      setLastSavedValue(value);
      router.refresh();
    } catch (error) {
      console.error("Upload failed:", error);
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
    // <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', color: '#333', backgroundColor: 'transparent' }}/>
  );
};

export default TextEditSection;
