import { db } from "@/lib/db";
import { connect } from "http2";
import { NextResponse } from "next/server";

// export async function POST (req: Request, res: Response) {
//     try{
//         const isTutor = true; 
//         // if (!accountId) {
//         //     return new NextResponse("Unauthorized", { status: 401 });
//         // }
//         if (!isTutor) return new NextResponse("no right for creation", { status: 401 });
//        const {title} = await req.json(); 
//        const course = await db.course.create({
//               data: {
//                 title,
//                 author:{
//                     connect: {
//                         id: "676bd9998d0990b31b0e70ca"
//                     }
//                 },
//                 category:{
//                     connect:{
//                         id: "676bdcfb8d0990b31b0e70cf"
//                     }
//                 }
//               }
//        });
//        return NextResponse.json({course});
//     } catch (error) {
//         console.error(error);
//         return new NextResponse("Failed to create course", { status: 500 });
//     }
// }

// export async function GET (req: Request, res: Response) {
//     try{
//         const courses = await db.course.findMany();
//         return new NextResponse({courses});
//     } catch (error) {
//         console.error(error);
//         return new NextResponse("Failed to get courses", { status: 500 });
//     }
// }