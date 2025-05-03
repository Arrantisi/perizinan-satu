import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventType = body.type;
    const userData = body.data;

    if (!eventType || !userData) {
      return NextResponse.json(
        { message: "Payload tidak sesuai atau data kosong", body },
        { status: 400 }
      );
    }

    const clerkId = userData.id;

    if (eventType === "user.created") {
      const { email_addresses, first_name, last_name } = userData;
      const email = email_addresses?.[0]?.email_address;
      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();

      if (!email) {
        return NextResponse.json(
          { message: "Email tidak ditemukan" },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: clerkId,
            email,
            name: name || "No name",
            password: "-",
            role: "EMPLOYEE",
          },
        });
      }

      return NextResponse.json({ message: "User berhasil disimpan" });
    }

    if (eventType === "user.updated") {
      const name = `${userData.first_name ?? ""} ${
        userData.last_name ?? ""
      }`.trim();
      const email = userData.email_addresses?.[0]?.email_address;

      await prisma.user.update({
        where: { id: clerkId },
        data: {
          name: name || "no name",
          email,
        },
      });

      return NextResponse.json({ message: "User berhasil diupdate" });
    }

    if (eventType === "user.deleted") {
      await prisma.user.delete({ where: { id: clerkId } });
      return NextResponse.json({ message: "User berhasil dihapus" });
    }

    return NextResponse.json(
      { message: "Event tidak ditangani", type: eventType },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 Clerk webhook error:", error);
    return NextResponse.json(
      { message: `Internal Server Error`, error: String(error) },
      { status: 500 }
    );
  }
}
