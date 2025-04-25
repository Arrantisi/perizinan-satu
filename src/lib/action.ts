"use server";

import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { prisma } from "./prisma";
import { AjukanScemaType, KaryawanSchemaType } from "@/schema";

export const deleteUser = async (userId: string) => {
  try {
    await clerkClient.users.deleteUser(userId);
    return { success: true, message: "user berhasil di hapus" };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false, message: "Hapus gagal" };
  }
};

export const getUserRole = async () => {
  const user = await currentUser();

  if (!user) throw new Error("Unathorized");

  const role = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return { role };
};

export const getUser = async () => {
  return await prisma.user.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
};

export const getCurrentUserId = async () => {
  const user = await currentUser();

  return await prisma.user.findUnique({ where: { id: user?.id } });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const updateUserRole = async (id: string, form: KaryawanSchemaType) => {
  const user = await currentUser();

  if (!user) return { success: false, message: "Anda tidak berwenang" };

  try {
    await prisma.user.update({
      where: { id },
      data: {
        role: form.role,
      },
    });

    return { success: true, message: "Role telah di ganti" };
  } catch (error) {
    return { success: false, message: `masalah di server ${error}` };
  }
};

export const ajukanIzin = async (form: AjukanScemaType) => {
  const user = await currentUser();

  if (!user) throw new Error("Unathorized");

  await prisma.leave.create({
    data: {
      startDate: form.dateRange.from,
      endDate: form.dateRange.to,
      reason: form.reason,
      type: form.type,
      status: "PENDING",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
};

export const getLeaveById = async (id: string) => {
  return await prisma.leave.findUnique({
    where: { id: id },
  });
};

export const persetujuan = async (id: string) => {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const reviewer = await prisma.user.findUnique({ where: { id: user.id } });

  if (reviewer?.role !== "BOSS")
    return {
      success: false,
      message: "Kamu tidak memliki otoritas atas persujuan surat ini",
    };

  try {
    const leave = await prisma.leave.update({
      where: { id },
      data: {
        status: "APPROVED",
        reviewedBy: reviewer.name,
        reviewedAt: new Date(),
      },
      include: { user: true },
    });

    return {
      success: true,
      message: `Surat izin ${leave.user.name} telah anda setujui`,
    };
  } catch (error) {
    return { success: false, message: `masalah di server ${error}` };
  }
};

export const getLeave = async () => {
  return await prisma.leave.findMany({
    include: { user: true },
  });
};

export const tolakLeave = async (id: string) => {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const reviewer = await prisma.user.findUnique({ where: { id: user.id } });

  if (reviewer?.role !== "BOSS") {
    throw new Error("Kamu tidak berhak melakukan penolakan");
  }
  try {
    const leave = await prisma.leave.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewedBy: reviewer.name,
        reviewedAt: new Date(),
      },
      include: { user: true },
    });

    return {
      success: true,
      message: `Surat izin ${leave.user.name} telah anda tolak`,
    };
  } catch (error) {
    return { success: false, message: `masalah pada server ${error}` };
  }
};
