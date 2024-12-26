import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req: Request, res: Response) {
    try{
        const session = await auth();
        if (!session) return new NextResponse("Unauthorized", { status: 401 });


        // find user via filter
        const user = await db.user.findUnique({
            where: {
                email: session?.user?.email || "",
            }
        });
        console.log("user: ", user);
        const category = await db.category.findUnique({
            where: {
                categoryName: "Uncategorized"
            }
        });
        console.log("category: ", category);
        if (!user) return new NextResponse("User not found", { status: 401 });
        if (user?.role === "STUDENT") return new NextResponse("Permission denied", { status: 401 });


       const {title} = await req.json(); 
       const course = await db.course.create({
              data: {
                title,
                author:{
                    connect: {
                        id: user?.id
                    }
                },
                category:{
                    connect: {
                        id: category?.id
                    }
                },
              }
       });
       return NextResponse.json({course});
    } catch (error) {
        console.error('[CREATE-COURSE]',error);
        return new NextResponse("Failed to create course", { status: 500 });
    }
}

// export async function GET (req: Request, res: Response) {
//     try{
//         const courses = await db.course.findMany();
//         return new NextResponse({courses});
//     } catch (error) {
//         console.error(error);
//         return new NextResponse("Failed to get courses", { status: 500 });
//     }
// }