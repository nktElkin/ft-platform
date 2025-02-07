import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
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

    const courseId = params.courseId;

    // getting body values: tagetModule, draggedModule
    const values = await req.json();

    const targetModuleId = values.targetItem.id;
    const draggedModuleId = values.draggedItem.id;
    const targetModuleIndex = values.targetItem.index;
    const draggedModuleIndex = values.draggedItem.index;

    const targetModuleCheck = await db.courseModule.findFirst({
      where: {
        id: targetModuleId,
        courseId: courseId,
      },
    });
    const draggedModuleCheck = await db.courseModule.findFirst({
      where: {
        id: draggedModuleId,
        courseId: courseId,
      },
    });

    if (!targetModuleCheck || !draggedModuleCheck)
      return new NextResponse("Module not found", { status: 404 });

    //updating course and other modules index

    //updating next moduels index
    if (draggedModuleIndex > targetModuleIndex) {
      // Moving up: increment indexes for modules in between
      await db.courseModule.updateMany({
        where: {
          courseId,
          index: {
            gte: targetModuleIndex,
            lt: draggedModuleIndex,
          },
        },
        data: {
          index: { increment: 1 },
        },
      });
    } else {
      // Moving down: decrement indexes for modules in between
      await db.courseModule.updateMany({
        where: {
          courseId,
          index: {
            gt: draggedModuleIndex,
            lte: targetModuleIndex,
          },
        },
        data: {
          index: { decrement: 1 },
        },
      });
    }

    // updating dragged module index
    await db.courseModule.update({
      where: { id: draggedModuleId },
      data: { index: targetModuleIndex },
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
    const response = await db.courseModule.findMany({
      where: {
        courseId,
      },
      orderBy: {
        index: "asc",
      },
    });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("[REORDER-COURSE-MODULE]", error);
    return new NextResponse("Failed to reorder course modules", {
      status: 500,
    });
  }
}
