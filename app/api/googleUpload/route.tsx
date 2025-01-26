import { UploadFileToGoogle } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST (req: Request){
    try {
        const form = await req.formData();
        await UploadFileToGoogle(form);
        return NextResponse.json({message: 'File uploaded successfully'}, {status: 201});
    } catch (error) {
        
    }
}