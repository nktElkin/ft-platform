'use client';
import { SingleImageDropzone } from "@/components/image-upload-dropzone";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import InputCover from "@/components/ui/input-cover";
import { Label } from "@/components/ui/label";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { init } from "next/dist/compiled/webpack/webpack";
import { imageUrlIsValid } from "@/lib/utils";
import { ArrowUpFromLine } from "lucide-react";
import { UploadFileToGoogle } from "@/lib/actions";

interface CourseCreationFormProps {
    initials: any,
    moduleId: string,
    isValidImageUrl?: boolean
}

const UploadCourseMediaForm = () => {
    const [isEditigin, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [file, setFile] = useState<File | null>();
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0);

    function editMode() {
        setIsEditing((cur) => !cur);
    }

    // const dbWallpaperPatch = async (url: string, action?: 'edit' | 'delete') => {
    //     if(action === 'delete') url = '';
    //     const values = { ...initials, wallpaperUrl: url }
    //     try {
    //         const response = await fetch(`/api/courses/${courseId}`, { method: "PATCH", body: JSON.stringify(values) });
    //         if (!response.ok) {
    //             const error = await response.text();
    //             throw new Error(response.status === 404
    //                 ? "Course not found. Please check the course ID."
    //                 : `Failed to update course: ${error}`);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData)
    //         await edgestore.publicFiles.confirmUpload({url})
    //         toast.success("Successfully aplied");
    //     } catch (error) {
    //         toast.error('Fild uattenpt')
    //         console.error(error)
    //     }
    //     editMode();
    //     router.refresh();
    // }

    return (
        <div className="flex flex-col space-y-7">
            {/* <Label className="">Course Wallpaper</Label>
            {!isEditigin &&
                <InputCover onToggle={editMode} controllerState={isEditigin} inputVariant="text-area">
                    {isValidImageUrl ? (
                        <img src={initials?.wallpaperUrl} alt="course wallpaper" />
                    ):(
                        <p>No wallpaper yet</p>
                    )}
                </InputCover>
                }
            {isEditigin &&
            
            } */}
            <form className="space-y-8" action="api/googleUpload" method="POST" encType="multipart/form-data">
             <SingleImageDropzone
                                        onChange={(file) => {
                                            setFile(file); 
                                        }}
                                        value={file ? file : undefined}
                                        />
                <Button className="mr-2 font-semibold" type="reset" onClick={() => setFile(null)} variant='outline'>Cancel</Button>
                {/* <Button className="mr-2 font-semibold" type="submit">Upload</Button> */}
                <Button type="submit" onClick={async() => {
                    setIsSubmitting(true);
                    if (file) {
                        await fetch('/api/googleUpload', { method: "POST", body: file });
                        setIsSubmitting(false);
                    } else {
                        toast.error('Please select a file to upload')
                    }
                }} disabled={!file || isSubmitting}>{isSubmitting ? "Preparing..." : <>Upload <ArrowUpFromLine /></>}</Button>
            </form>
        </div>
    );
}

export default UploadCourseMediaForm;