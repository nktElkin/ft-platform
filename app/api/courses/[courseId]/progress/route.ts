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
    if (!response) return NextResponse.json({ message: "[COURSES/FINISG-POST] Failed to create progress" }, { status: 500 });
    
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create course progress", { status: 500 });
  }
}
