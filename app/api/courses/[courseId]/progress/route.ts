import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  try {
    const { session, currentUser } = await getSession();
    if (!session || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
    const courseId = (await params)?.courseId;
    if (!courseId)
      return NextResponse.json(
    { message: "[PROGRESS/ENROL-COURSE] Invalid course id, or no request parameters" },
    { status: 400 },
  );
  
    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course) return NextResponse.json({ message: "[PROGRESS/ENROL-COURSE] Course not found" }, { status: 404 });
    if (!course.isPublished) return NextResponse.json({ message: "[PROGRESS/ENROL-COURSE] Course is not published, access denied" }, { status: 401 });

    const modules = await db.courseModule.findMany({ where: { courseId: courseId, isPublished: true }, orderBy: { index: "asc" } });
    if (!modules || modules.length === 0)
      return NextResponse.json({ message: "[PROGRESS/ENROL-COURSE] Course is blank" }, { status: 404 });

    const progress = await db.userProgress.findMany({ where: { userId: currentUser?.id, courseModuleId: { in: modules.map((module) => module.id) } }, orderBy: { updatedAt: "desc" } });
    if (progress.length > 0) return NextResponse.json({ message: "[PROGRESS/ENROL-COURSE] Progress already exists" }, { status: 404 });
    
    // const firstModule = modules[0];

    const response = await db.userProgress.create({
      data: {
        userId: currentUser?.id,
        courseModuleId: modules[0].id,
      }
    });
    if (!response) return NextResponse.json({ message: "[PROGRESS/ENROL-COURSE] Failed to create progress" }, { status: 500 });
    
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create course progress", { status: 500 });
  }
}
