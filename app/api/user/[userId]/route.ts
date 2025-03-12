import { db } from "@/lib/db";
import { getSession, hasPermissionToEdit } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,
    { params }: { params: Promise<{ userId: string }>},
) {
    try {
        const userId = (await params).userId;
        const values = await req.json();
        if (!values || !userId) return new NextResponse('No request', { status: 401 });
        const { session, currentUser } = await getSession();
        if (!session) return new NextResponse("Unauthorized", { status: 403 });
        const hasPermissin = hasPermissionToEdit(userId)
        if (!hasPermissin)
            return new NextResponse("Permission denied", { status: 403 });

        // Find user
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user) return new NextResponse("User not found", { status: 404 });

        // Update user
        const response = await db.user.update({where: { id: userId }, data: { ...values } }); 
        if (!response) return new NextResponse("Failed to update user", { status: 500 });

        return NextResponse.json({response}, { status: 200 });
    } catch (error) {
        console.error('[USER-PATCH]', error);
        return new NextResponse("Internal server error", { status: 500 });
    }
} 