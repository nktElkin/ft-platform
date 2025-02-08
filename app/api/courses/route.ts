import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { debug } from "console";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });

    // find user via filter
    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    const category = await db.category.findUnique({
      where: {
        categoryName: "Uncategorized",
      },
    });
    if (!user) return new NextResponse("User not found", { status: 404 });
    if (user?.role === "STUDENT")
      return new NextResponse("Permission denied", { status: 403 });

    const { title } = await req.json();
    const course = await db.course.create({
      data: {
        title,
        author: {
          connect: {
            id: user?.id,
          },
        },
        category: {
          connect: {
            id: category?.id,
          },
        },
      },
    });
    return NextResponse.json({ course }, { status: 201 });
    // return NextResponse.json({course}, { status: 201 });
  } catch (error) {
    console.error("[CREATE-COURSE]", error);
    return new NextResponse("Failed to create course", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!req) return new NextResponse("Bad request", { status: 400 });
  try {
    const session = await getSession();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const categoryId = searchParams.get("category") || "";

    if (session.currentUser?.role === "ROOT" || "TUTOR") {
      const courses =
        (await db.course.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        })) || [];
      return NextResponse.json({ courses }, { status: 200 });
    }
    if (session.currentUser?.role === "STUDENT") {
      const courses =
        (await db.course.findMany({
          where: {
            AND: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                isPublished: true,
              },
            ],
          },
        })) || [];
      return NextResponse.json({ courses }, { status: 200 });
    }
    // return NextResponse.json({query, count, category});
  } catch (error) {
    return new NextResponse("Failed to get courses", { status: 500 });
  }
}
