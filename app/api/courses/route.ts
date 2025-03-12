import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { session, currentUser } = await getSession();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });
    if (!currentUser) return new NextResponse("User not found", { status: 404 });
    if (currentUser?.role === "STUDENT")
      return new NextResponse("Permission denied", { status: 403 });

    const category = await db.category.findUnique({
      where: {
        categoryName: "Uncategorized",
      },
    });

    const { title } = await req.json(); // title z těla požadavku, request body
    if (!title && title.trim() !== '') return new NextResponse("Invalid request", { status: 400 }); // pokud nejsou data, vrácení chyby
    const course = await db.course.create({ // požadavek do db na vytvoření nového objektu kurzu
      data: {
        title, // zadany uzivatelem nazev
        author: {
          connect: {
            id: currentUser?.id, // propojeni attributu authorId s id uzivatele
          },
        }, 
        category: {
          connect: {
            id: category?.id, // propojeni attributu courseId s id kategorii
          },
        },
      },
    });
    return NextResponse.json({ course }, { status: 201 }); // vráceni objektu vytvořeneho kurzu
  } catch (error) {
    console.error("[CREATE-COURSE]", error);
    return new NextResponse("Failed to create course", { status: 500 }); // ve pripade jine chyby vraceni kodu 500
  }
}

export async function GET(req: NextRequest) {
  if (!req) return new NextResponse("Bad request", { status: 400 });
  try {
    const {session, currentUser} = await getSession();
    if (!session) return new NextResponse("Unauthorized", { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query") || "";

    let courses =
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
         courses = currentUser?.role === "ROOT"
        ?courses
          :currentUser?.role === "TUTOR"
            ?courses.filter((course) => course.authorId === currentUser?.id)
            :courses.filter((course) => course.isPublished === true);
      
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to get courses", { status: 500 });
  }
}