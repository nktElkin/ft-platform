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

interface CourseCreationFormProps {
    initials: any,
    moduleId: string,
    isValidImageUrl?: boolean
}

const UploadCourseMediaForm = () => {
    const [isEditigin, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0);


    const [file, setFile] = useState<File | null>();
    const [url, setUrl] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        // setIsSubmitting(true);
        // const uploadOk = await uploadFile(file.name, file)


        // // const formData = new FormData();
        // // formData.append('file', file);

        // // const response = await fetch('/api/googleUpload', {
        // //     method: 'POST',
        // //     body: file,
        // //     headers: {
        // //         'file-name': file.name,
        // //         'content-type': file.type,
        // //     },
        // // });

        // // const data = await response.json();
        // // setUrl(data.url);
        setIsSubmitting(false);
    };


    return (
        <div className="flex flex-col space-y-7">
            <form className="space-y-8" action="api/googleUpload" method="POST" encType="multipart/form-data">
                <SingleImageDropzone
                    onChange={(file) => {
                        setFile(file);
                        console.log(file);
                    }}
                    value={file ? file : undefined}
                />
                <Button className="mr-2 font-semibold" type="reset" onClick={() => setFile(null)} variant='outline'>Cancel</Button>
                {/* <Button className="mr-2 font-semibold" type="submit">Upload</Button> */}
                <Button type="submit" onClick={async () => {
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






// export default function UploadForm() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [url, setUrl] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: file,
//       headers: {
//         'file-name': file.name,
//         'content-type': file.type,
//       },
//     });

//     const data = await response.json();
//     setUrl(data.url);
//     setUploading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//       <button type="submit" disabled={uploading}>
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//       {url && <p>File URL: <a href={url}>{url}</a></p>}
//     </form>
//   );
// }