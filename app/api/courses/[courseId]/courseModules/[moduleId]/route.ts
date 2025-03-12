import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> },
) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });
    // find user via filter
    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (!user) return new NextResponse("User not found", { status: 404 });
    if (user?.role === "STUDENT")
      return new NextResponse("Permission denied", { status: 403 });

    const {courseId, moduleId} = await params

    const actionCourseModule = await db.courseModule.findFirst({
      where: {
        id: moduleId,
        courseId: courseId,
      },
    });
    if (!actionCourseModule)
      return new NextResponse("Course module not found", { status: 404 });

    const deleteCourseModule = await db.courseModule.delete({
      where: {
        id: moduleId,
        courseId: courseId,
      },
    });

    //updating course and other modules index
    if (deleteCourseModule) {
      //updating other moduels indexes
      await db.courseModule.updateMany({
        where: {
          courseId,
          index: {
            gt: actionCourseModule.index,
          },
        },
        data: {
          index: {
            decrement: 1,
          },
        },
      });

      //updating course updatedAt
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          updatedAt: new Date(),
        },
      });
    }
    return NextResponse.json({ deleteCourseModule }, { status: 201 });
  } catch (error) {
    console.error("[DELETE-COURSE-MODULE]", error);
    return new NextResponse("Failed to delete course module", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> },
) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });
    // find user via filter
    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (!user) return new NextResponse("User not found", { status: 404 });
    if (user?.role === "STUDENT")
      return new NextResponse("Permission denied", { status: 403 });

    const courseId = (await params).courseId;
    const moduleId = (await params).moduleId;

    const values = await req.json();

    const actionCourseModule = await db.courseModule.findFirst({
      where: {
        id: moduleId,
        courseId: courseId,
      },
    });
    if (!actionCourseModule)
      return new NextResponse("Course module not found", { status: 404 });

    const updateCourseModule = await db.courseModule.update({
      where: {
        id: moduleId,
        courseId: courseId,
      },
      data: {
        ...values,
        updatedAt: new Date(),
      },
    });

    //updating course and other modules index
    if (updateCourseModule) {
      //updating other moduels indexes

      //updating course updatedAt
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          updatedAt: new Date(),
        },
      });
    }
    return NextResponse.json({ updateCourseModule }, { status: 201 });
  } catch (error) {
    console.error("[UPDATE-COURSE-MODULE]", error);
    return new NextResponse("Failed to update course module", { status: 500 });
  }
}
