import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, moduleId:string } },
) {
  try {
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
    const { courseId, moduleId } = params;
    if (!courseId || !moduleId)
      return NextResponse.json(
    { message: "[COURSES/PROGRESS[MODULE_ID]] Invalid course id, module id, or no request parameters" },
    { status: 400 },
  );
  
    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ message: "[COURSES/PROGRESS[MODULE_ID]] Course not found" }, { status: 404 });
    if (!course.isPublished) return NextResponse.json({ message: "[COURSES/PROGRESS[MODULE_ID]] Course is not published, access denied" }, { status: 401 });

    const modules = await db.courseModule.findMany({ where: { courseId: courseId } });
    if (!modules || modules.length === 0) return NextResponse.json({ message: "[COURSES/PROGRESS[MODULE_ID]] Course is blank" }, { status: 404 });

    const targetModule = modules.find((module) => module.id === moduleId);
    if (!targetModule) return NextResponse.json({ message: "[COURSES/PROGRESS[MODULE_ID]] Target module not found" }, { status: 500 });
    if (!targetModule.isPublished) return NextResponse.json({ message: "[COURSES/PROGRESS[MODULE_ID]] Target module not published" }, { status: 500 });

    const response = await db.userProgress.create({
      data: {
        userId: currentUser?.id,
        courseModuleId: targetModule.id,
      }
    });
    if (!response) return NextResponse.json({ message: "[COURSES/PROGRESS[MODULE_ID]] Failed to create progress" }, { status: 500 });
    
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create course progress", { status: 500 });
  }
}



export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string, moduleId: string }> },
  ) {
    try {
      const { session, currentUser } = await getSession();
      if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
      const { courseId, moduleId } = await params;
      if (!courseId || !moduleId)
        return NextResponse.json(
          { message: "[COURSES/ENROL-PATCH] Invalid course id, or no request parameters" },
          { status: 400 },
        );
  
      const course = await db.course.findUnique({ where: { id: courseId } });
      if (!course) return NextResponse.json({ message: "[COURSES/ENROL-PATCH] Course not found" }, { status: 404 });
  
      const modules = await db.courseModule.findMany({ where: { courseId: courseId } });
      if (!modules) return NextResponse.json({ message: "[COURSES/ENROL-PATCH] Course is blank" }, { status: 404 });
  
      const progress = await db.userProgress.findMany({ where: { userId: currentUser?.id, courseModuleId: { in: modules.map((module) => module.id) } }, orderBy: { updatedAt: "desc" } });
      if (!progress.length) return NextResponse.json({ message: "[COURSES/ENROL-PATCH] Progress doesn't exist" }, { status: 404 });
  
      const response = await db.userProgress.update({
        where: {
          userId_courseModuleId: {
            userId: currentUser?.id,
            courseModuleId: moduleId,
          },
        },
        data: {
          isDone: true,
          updatedAt: new Date(),
        }
      });
      if (!response) return NextResponse.json({ message: "[COURSES/ENROL-PATCH] Failed to update progress" }, { status: 500 });
  
      return NextResponse.json({ response }, { status: 200 });
    } catch (error) {
      return new NextResponse("Failed to update course progress", { status: 500 });
    }
  }
  