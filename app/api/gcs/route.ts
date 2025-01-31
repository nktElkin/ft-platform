// app/api/gcs/route.ts


import { NextResponse } from 'next/server';
import { deleteObject, uploadFile } from '@/lib/gcs';



// POST - upload to bucket, returns url
export async function POST(request: Request) {
  try {
    // Read the file data from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the file to a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    // Upload file to GCS
    const response = await uploadFile(fileBuffer, file.name);
    
    // Save file URL to your database (e.g., using Prisma)
    // Example: await prisma.file.create({ data: { url: fileUrl } });
    
    return NextResponse.json({ url: response}, { status: 200 });
  } catch (error) {
    console.error('[GCS-PUT] ', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


// DELETE - deletes object in bucket
export async function DELETE(req: Request){
  if(!req) return NextResponse.json({ error: 'No url provided' }, { status: 400 });
  try{
    const obj = await req.json();
    const objecName = decodeURIComponent(obj.objectName);
    const response = await deleteObject(objecName)
    if (response) {
      return NextResponse.json({ success: true }, { status: 204 });
    } else {
      return NextResponse.json({ error: 'Failed to delete object' }, { status: 500 });
    }
  }catch(error){
    console.error('[GCS-DELETE] ', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
// return NextResponse.json({}); // fixin' -------------------------------- fixin' -------------------------------- fixin' -------------------------------- fixin'