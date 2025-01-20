import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import React from "react";


export async function POST (
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try{
        const session = await auth();
        if (!session) return new NextResponse("Unauthorized", { status: 403 });
        // find user via filter
        const user = await db.user.findUnique({
            where: {
                email: session?.user?.email || "",
            }
        });
        if (!user) return new NextResponse("User not found", { status: 404 });
        if (user?.role === "STUDENT") return new NextResponse("Permission denied", { status: 403 });

        const courseId = await params.courseId;
       const {title} = await req.json(); 
       
       //    find the latest module
       const latestModule = await db.courseModule.findFirst({
           where:{
               courseId
            },
            orderBy:{
                index: 'desc'
            }
        });
        
        const latestModuleIndex = latestModule ? latestModule.index + 1 : 0; 
        
        const courseModule = await db.courseModule.create({
            data: {
                title,
                index: latestModuleIndex,
                courseId
            }
        });
    return NextResponse.json({courseModule}, { status: 201 });
    } catch (error) {
        console.error('[CREATE-COURSE-MODULE]',error);
        return new NextResponse("Failed to create course module", { status: 500 });
    }
}