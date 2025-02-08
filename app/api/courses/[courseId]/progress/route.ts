import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
    const { courseId } = params;
    if (!courseId)
      return NextResponse.json(
    { message: "[COURSES/ENROL-POST] Invalid course id, or no request parameters" },
    { status: 400 },
  );
  
    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ message: "[COURSES/ENROL-POST] Course not found" }, { status: 404 });
    if (!course.isPublished) return NextResponse.json({ message: "[COURSES/ENROL-POST] Course is not published, access denied" }, { status: 401 });

    const modules = await db.courseModule.findMany({ where: { courseId: courseId } });
    if (!modules || modules.length === 0) return NextResponse.json({ message: "[COURSES/ENROL-POST] Course is blank" }, { status: 404 });

    const progress = await db.userProgress.findMany({ where: { userId: currentUser?.id, courseModuleId: { in: modules.map((module) => module.id) } }, orderBy: { updatedAt: "desc" } });
    if (progress.length > 0) return NextResponse.json({ message: "[COURSES/ENROL-POST] Progress already exists" }, { status: 404 });
    
    const firstModule = modules.find((module) => module.index === 0);
    if (!firstModule) return NextResponse.json({ message: "[COURSES/ENROL-POST] First module not found" }, { status: 500 });

    const response = await db.userProgress.create({
      data: {
        userId: currentUser?.id,
        courseModuleId: firstModule.id,
      }
    });
    if (!response) return NextResponse.json({ message: "[COURSES/ENROL-POST] Failed to create progress" }, { status: 500 });
    
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create course progress", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
    const { courseId } = params;
    const {moduleId} = await req.json();
    if (!courseId || !moduleId)
      return NextResponse.json(
        { message: "[COURSES/ENROL-PUT] Invalid course id, or no request parameters" },
        { status: 400 },
      );

    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ message: "[COURSES/ENROL-PUT] Course not found" }, { status: 404 });

    const modules = await db.courseModule.findMany({ where: { courseId: courseId } });
    if (!modules) return NextResponse.json({ message: "[COURSES/ENROL-PUT] Course is blank" }, { status: 404 });

    const progress = await db.userProgress.findMany({ where: { userId: currentUser?.id, courseModuleId: { in: modules.map((module) => module.id) } }, orderBy: { updatedAt: "desc" } });
    if (!progress.length) return NextResponse.json({ message: "[COURSES/ENROL-PUT] Progress doesn't exist" }, { status: 404 });

    const response = await db.userProgress.create({
      data: {
        userId: currentUser?.id,
        courseModuleId: moduleId,
      }
    });
    if (!response) return NextResponse.json({ message: "[COURSES/ENROL-PUT] Failed to create progress" }, { status: 500 });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update course progress", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
    const { courseId } = params;
    const {moduleId} = await req.json();
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
      }
    });
    if (!response) return NextResponse.json({ message: "[COURSES/ENROL-PATCH] Failed to update progress" }, { status: 500 });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update course progress", { status: 500 });
  }
}
