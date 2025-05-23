import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   const secret = request.nextUrl.searchParams.get("secret");

   if (secret !== process.env.SECRET_TOKEN) {
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
         status: 401,
         statusText: "Unauthorized",
         headers: {
            "Content-Type": "application/json",
         },
      });
   }

   const path = request.nextUrl.searchParams.get("path") || "/";

   revalidatePath(path);

   return NextResponse.json({ revalidate: true });
}
