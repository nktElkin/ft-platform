import { db } from "@/lib/db";
import { getSession, hasPermissionToEdit } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
    
    const courseId = (await params).courseId;
    if (!courseId)
      return NextResponse.json({ message: "[COURSE-PATCH] Invalid course id, or no request parameters" }, { status: 400 });
    const values = await req.json();
    if (!values) return NextResponse.json({ message: "[COURSE-PATCH] Invalid request body" },{ status: 400 });

    const targetCourse = await db.course.findFirst({where: {id: courseId}})
    if (!targetCourse) return NextResponse.json({ message: "[COURSE-PATCH] Course not found" },{ status: 404 });
    const canEdit = await hasPermissionToEdit(targetCourse?.authorId);
    if (!canEdit) return new NextResponse("Permission denied", { status: 403 });
    
    const course = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...values,
        updatedAt: new Date(),
      },
    });
    if (!course) return NextResponse.json({ message: "[COURSE-PATCH] Faild upadte" },{ status: 404 });
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error("[PATCH-COURSE]", error);
    return new NextResponse("Failed to update course", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
){
  try{
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("[COURSE-DELETE] Unauthorized", { status: 401 });
    const canEdit = await hasPermissionToEdit(currentUser?.id) 
      && await db.course.findFirst({where: {id: (await params).courseId}});
    if (!canEdit) return new NextResponse("[COURSE-DELETE] Permission denied", { status: 403 });

    const courseId = (await params).courseId;
    const response = await db.course.delete({where: {id: courseId}});
    return NextResponse.json({ response }, { status: 200 });
  }catch(error){
    console.error("[COURSE-DELETE] INTERNAL ERROR", error);
    return new NextResponse("Failed to delete course, internal server error", { status: 500 });  
  }
}
