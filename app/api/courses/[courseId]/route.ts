import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    // const courseId = params.courseId[0];

    const values = await req.json();
    if(!params) return NextResponse.json({ message: "[COURSE-PATCH] Invalid request paramenters" }, { status: 400 });
    const courseId = Array.isArray(params.courseId)
      ? params.courseId[0]
      : params.courseId;
    if (!courseId)
      return NextResponse.json(
        { message: "[COURSE-PATCH] Invalid course id" },
        { status: 400 },
      );
    if (!values)
      return NextResponse.json(
        { message: "[COURSE-PATCH] Invalid request body" },
        { status: 400 },
      );
    //update data
    // return NextResponse.json({values});
    const course = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        // ...values,
        title: values?.title,
        description: values?.description,
        wallpaperUrl: values?.wallpaperUrl,
        authorId: values?.authorId,
        categoryId: values?.categoryId,
        isPublished: values?.isPublished,
        updatedAt: new Date(),
      },
    });
    if (!course)
      return NextResponse.json(
        { message: "[COURSE-PATCH] Faild upadte" },
        { status: 404 },
      );
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error("[COURSE-PATCH]", error);
    return new NextResponse("Failed to update course", { status: 500 });
  }
}
