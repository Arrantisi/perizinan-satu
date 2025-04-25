import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const clerkId = body.data.id;
    console.log("Webhook received:", body);

    console.log("Received Clerk webhook:", body.type);

    if (body.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = body.data;

      const email = email_addresses?.[0]?.email_address;
      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();

      if (!email) {
        return NextResponse.json(
          { message: "Email tidak di temmukan" },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id,
            email,
            name: name || "No name",
            password: "-",
            role: "BOSS",
          },
        });
      }
      return NextResponse.json({ message: "User berhasil di simpan" });
    }

    if (body.type === "user.updated") {
      const name = `${body.first_name} ${body.last_name}`.trim();
      const email = body.email_address[0]?.email_address;

      await prisma.user.update({
        where: { id: clerkId },
        data: {
          name: name || "no name",
          email,
        },
      });

      return NextResponse.json(
        { message: "berhasil di update" },
        { status: 200 }
      );
    }

    if (body.type === "user.deleted") {
      await prisma.user.delete({ where: { id: clerkId } });
      return NextResponse.json(
        { message: "User berhasil di hapus" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "event bukan user.created" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
