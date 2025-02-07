"use client";
import { generateId } from "@/lib/utils";
import { SingleObjectDopzone } from "./image-upload-dropzone";

interface DropzoneProps {
  onUploadSuccess: (objectData: string) => void;
}

const GCSDropzone = ({ onUploadSuccess }: DropzoneProps) => {
  const gcsUpload = async (file: File | null) => {
    if (!file) return;

    const fileExtension = file.name.split(".").pop(); // get extension
    const newFileName = `${generateId()}.${fileExtension}`; // combine UUID with extension
    const renamedFile = new File([file], newFileName, { type: file.type });
    const formData = new FormData();
    formData.append("file", renamedFile);

    const response = await fetch("/api/gcs", {
      method: "POST",
      body: formData,
    });

    // console.log('response:', response);

    if (response.ok) {
      const data = await response.json();
      onUploadSuccess(decodeURIComponent(data.url));
      // console.log('onSetObjectUrl:', decodeURIComponent(data.url));
    } else {
      console.error("Upload failed:", response.statusText);
    }
  };

  return (
    <SingleObjectDopzone
      onChange={(file) => {
        gcsUpload(file || null);
      }}
    />
  );
};

export default GCSDropzone;

// const onDrop = useCallback(async (acceptedFiles: File[]) => {
//   const file = acceptedFiles[0];
//   const fileExtension = file.name.split('.').pop(); // get extension
//   const newFileName = `${generateId()}.${fileExtension}`; // combine UUID with extension
//   const renamedFile = new File([file], newFileName, { type: file.type });

//   const formData = new FormData();
//   formData.append('file', renamedFile);

//   const response = await fetch('/api/gcs', {
//     method: 'POST',
//     body: formData,
//   });

//   if (response.ok) {
//     const data = await response.json();
//     onSetObjectUrl(decodeURIComponent(data.url))
//   } else {
//     console.error('Upload failed:', response.statusText);
//   }
// }, []);

// const { getRootProps, getInputProps } = useDropzone({ onDrop });

// <div className={className}>
// <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
//   <input {...getInputProps()} />
//   <p>Drag & drop a file here, or click to select one</p>
// </div>
// </div>

// const onRemove = async () => {
//   if(!objectUrl) return;
//   const objectName =  decodeURIComponent(objectUrl)?.split('/').pop();

//   try {
//     const response = await fetch('/api/gcs', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json', // Add headers
//       },
//       body: JSON.stringify({ objectName: objectName }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('onDelete response:', data);
//     } else {
//       console.error('onDelete failed:', response.statusText);
//     }
//   } catch (error) {
//     console.error('onRemove error:', error);
//   }
// };

{
  /* {objectUrl && (
  <div>
    <p>File uploaded successfully!</p>
    <a href={objectUrl} target="_blank" rel="noopener noreferrer">
      View File
    </a>
  </div>
)} */
}
