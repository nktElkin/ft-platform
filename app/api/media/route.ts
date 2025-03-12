import { db } from "@/lib/db";
import { getSession, hasPermissionToEdit } from "@/lib/utils";
import { NextResponse } from "next/server";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string, moduleId: string } }
// ) {
//   try {
//     const moduleId =  params.moduleId;
//     const courseId =  params.courseId;
//     // protection
//     if (courseId || moduleId) return new NextResponse("Bad request", { status: 400 });
//     const { session, currentUser } = await getSession();
//     if (!session) return new NextResponse("Unauthorized", { status: 403 });
//     const courseCreator = await db.course.findUnique({ where: { id: params.courseId } });
//     const hasPermissin = hasPersmissionToEdit(courseCreator?.authorId || null);
//     if (!hasPermissin) return new NextResponse("Permission denied", { status: 403 });

//     // getting body values: tagetModule, draggedModule
//     const {values} = await req.json();
//     if (!values.url || !values.altText || !values.description) return new NextResponse("Bad request", { status: 400 });

//     const response = await db.attachment.create({
//       data: {
//         ...values,
//         courseModuleId: moduleId,
//       }
//     });

//       return NextResponse.json({response}, { status: 201 });
//   } catch (error) {
//     console.error('[MEDIA-UPLOAD]', error);
//     return new NextResponse("Failed to upload media", { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return new NextResponse("Invalid request body", { status: 400 });
    }
    // Validate request body
    const { payload, courseId } = body;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return new NextResponse("Invalid payload", { status: 400 });
    }
    if (!courseId)
      return NextResponse.json(
        { message: "[MEDIA-UPLOAD] -courseId Invalid request body" },
        { status: 400 },
      );

    if (!courseId || !payload.courseModuleId)
      return new NextResponse("Bad request", { status: 400 });
    const { session, currentUser } = await getSession();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });
    const targetCourse = await db.course.findUnique({
      where: { id: courseId },
    });
    const hasPermissin = hasPermissionToEdit(targetCourse?.authorId || null);
    if (!hasPermissin)
      return new NextResponse("Permission denied", { status: 403 });

    const response = await db.attachment.create({
      data: {
        id: payload.id + 1,
        url: payload.url,
        altText: payload.altText,
        description: payload.description,
        courseModule: {
          connect: { id: payload.courseModuleId },
        },
      },
    });

    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.error("[MEDIA-UPLOAD] - catched error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
