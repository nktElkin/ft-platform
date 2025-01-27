// import { UploadFileToGoogle } from "@/lib/actions";
// import { NextResponse } from "next/server";

// export async function POST (req: Request){
//     try {
//         const form = await req.formData();
//         await UploadFileToGoogle(form);
//         return NextResponse.json({message: 'File uploaded successfully'}, {status: 201});
//     } catch (error) {
        
//     }
// }








// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse, NextRequest } from 'next/server';
// import { Storage } from '@google-cloud/storage';

// // Initialize Google Cloud Storage
// const storage = new Storage({
//   projectId: process.env.GCS_PROJECT_ID,
//   credentials: {
//     client_email: process.env.GCS_CLIENT_EMAIL,
//     private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Fix newlines
//   },
// });

// const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);

// // Disable the default body parser to handle file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };


// export async function POST(req: Request, res: Response) {
//     try {
//         // Read the file data from the request
//         const chunks: Buffer[] = [];
//         for await (const chunk of req) {
//           chunks.push(chunk);
//         }
//         const buffer = Buffer.concat(chunks);
    
//         // Extract the file name from the headers or generate a unique name
//         const fileName = req.headers['file-name'] as string || `file-${Date.now()}`;
    
//         // Upload the file to Google Cloud Storage
//         const blob = bucket.file(fileName);
//         const blobStream = blob.createWriteStream({
//           metadata: {
//             contentType: req.headers['content-type'],
//           },
//         });
//         blobStream.on('error', (err) => {
//           console.error('Error uploading file:', err);
//           NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
//         });
    
//         blobStream.on('finish', () => {
//           const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//           res.status(200).json({ url: publicUrl });
//         });
    
//         blobStream.end(buffer);
//       } catch (error) {
//         console.error('Error handling upload:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
// }


// export async function POST(request: Request) {
//     try {
//       const busboy = Busboy({ headers: request.headers });
//       const chunks: Buffer[] = [];
//       let fileName: string | null = null;
//       let contentType: string | null = null;
  
//       // Parse the incoming form data
//       const filePromise = new Promise((resolve, reject) => {
//         busboy.on('file', (fieldname, file, info) => {
//           fileName = info.filename;
//           contentType = info.mimeType;
  
//           file.on('data', (chunk) => {
//             chunks.push(chunk);
//           });
  
//           file.on('end', () => {
//             resolve(Buffer.concat(chunks));
//           });
  
//           file.on('error', (err) => {
//             reject(err);
//           });
//         });
  
//         busboy.on('error', (err) => {
//           reject(err);
//         });
  
//         busboy.on('finish', () => {
//           resolve(null);
//         });
//       });
  
//       // Pipe the request body to busboy
//       const requestBody = await request.arrayBuffer();
//       busboy.end(Buffer.from(requestBody));
  
//       // Wait for the file to be parsed
//       const fileBuffer = await filePromise;
  
//       if (!fileBuffer || !fileName || !contentType) {
//         return NextResponse.json(
//           { error: 'No file uploaded' },
//           { status: 400 }
//         );
//       }
  
//       // Upload the file to Google Cloud Storage
//       const blob = bucket.file(fileName);
//       const blobStream = blob.createWriteStream({
//         metadata: {
//           contentType,
//         },
//       });
  
//       blobStream.on('error', (err) => {
//         console.error('Error uploading file:', err);
//         return NextResponse.json(
//           { error: 'Failed to upload file' },
//           { status: 500 }
//         );
//       });
  
//       blobStream.on('finish', () => {
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         return NextResponse.json({ url: publicUrl }, { status: 200 });
//       });
  
//       blobStream.end(fileBuffer);
//     } catch (error) {
//       console.error('Error handling upload:', error);
//       return NextResponse.json(
//         { error: 'Internal server error' },
//         { status: 500 }
//       );
//     }
//   }





import type { NextApiRequest, NextApiResponse } from "next";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignedPostPolicyV4Output | string>
) {
  const { query, method } = req;
  if (method !== "POST") {
    res.status(405).json("Method not allowed");
    return;
  }
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });
//   const bucket = storage.bucket(process.env.BUCKET_NAME);
  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) {
    res.status(500).json("Bucket name is not defined");
    return;
  }
  const bucket = storage.bucket(bucketName);

  const file = bucket.file(query.file as string);
  const options = {
    expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
    fields: { "x-goog-meta-source": "nextjs-project" },
  };
  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
}