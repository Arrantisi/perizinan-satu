"use server";

import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { prisma } from "./prisma";
import {
  AjukanScemaType,
  KaryawanSchemaType,
  RejectedSchemaType,
} from "@/schema";
import { endOfYear, startOfYear } from "date-fns";
import { countWorkingDays } from "@/utils/countWorkingDays";

const CurrentUser = async () => {
  const user = await currentUser();
  return user;
};

//!!! =========================================================== USER ======================================================================
//** */ ================================================ deleteUser ================================================
export const deleteUser = async (userId: string) => {
  try {
    await clerkClient.users.deleteUser(userId);
    return { success: true, message: "user berhasil di hapus" };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false, message: "Hapus gagal" };
  }
};

//** */ ================================================ getUserLeaveSummary ================================================
export const getUserLeaveSummary = async (userId?: string) => {
  const now = new Date();

  const leave = await prisma.leave.findMany({
    where: {
      userId,
      startDate: {
        gte: startOfYear(now),
        lte: endOfYear(now),
      },
    },
  });

  const totalDays = leave.reduce((acc, leave) => {
    const days = countWorkingDays(leave.startDate, leave.endDate);
    return acc + days;
  }, 0);

  const remainingDays = Math.max(12 - totalDays, 0);

  return { totalDays, remainingDays, isLimitedDays: totalDays > 12 };
};

//** */ ================================================ getUserRole ================================================
export const getUserRole = async () => {
  const user = await CurrentUser();

  if (!user) throw new Error("Unathorized");

  const role = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return { role };
};

//** */ ================================================ getUser ================================================
export const getUser = async () => {
  return await prisma.user.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
};

//** */ ================================================ getCurrentUserId ================================================
export const getCurrentUserId = async () => {
  const user = await CurrentUser();

  return await prisma.user.findUnique({ where: { id: user?.id } });
};

//** */ ================================================ getUserById ================================================
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

//** */ ================================================ updateUserRole ================================================
export const updateUserRole = async (id: string, form: KaryawanSchemaType) => {
  const user = await CurrentUser();

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

//!!! ========================================================== LEAVE ======================================================================
//** */ ================================================ ajukanIzin ================================================
export const ajukanIzin = async (form: AjukanScemaType) => {
  const user = await CurrentUser();

  if (!user) throw new Error("Unathorized");

  const { remainingDays } = await getUserLeaveSummary(user.id);

  const requestDays = countWorkingDays(form.dateRange.from, form.dateRange.to);

  if (requestDays > 12)
    return {
      success: false,
      message: "jumlah hari cuti tidak boleh lebih dari 12 hari",
    };

  if (requestDays > remainingDays)
    return {
      success: false,
      message: "jumlah hari cuti telah melebihi batas cuti anda",
    };

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
  return { success: true, message: "Pengajuan sudah berhasil terkirim" };
};

//** */ ================================================ getLeaveById ================================================
export const getLeaveById = async (id: string) => {
  return await prisma.leave.findUnique({
    where: { id: id },
    include: { user: true },
  });
};

//** */ ================================================ getLeaveStatus ================================================
export const getLeaveByUserId = async () => {
  const user = await CurrentUser();
  return await prisma.leave.findMany({
    where: {
      userId: user?.id,
    },
  });
};

export const getLeaveApproved = async () => {
  const user = await CurrentUser();
  return prisma.leave.findFirst({
    where: {
      userId: user?.id,
      status: "APPROVED",
    },
  });
};

//** */ ================================================ GET LEAVE ================================================
export const getLeave = async () => {
  const user = await CurrentUser();

  return await prisma.leave.findMany({
    where: { userId: user?.id },
    include: { user: true },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllLeave = async () => {
  return await prisma.leave.findMany({
    include: { user: true },
    orderBy: {
      createdAt: "desc",
    },
  });
};

//** */ ================================================ deleteLeave ================================================
export const deleteLeave = async (leaveId: string) => {
  try {
    await prisma.leave.delete({
      where: { id: leaveId },
    });
    return { success: true, message: "surat berhasil di hapus" };
  } catch (error) {
    return { success: false, message: "masalah di server" + error };
  }
};

//??? ======================================================== LEAVE CALENDER ===============================================================

export const getAllLeaveDates = async () => {
  const user = await CurrentUser();

  const leaves = await prisma.leave.findMany({
    where: {
      userId: user?.id,
      status: "APPROVED",
    },
    select: {
      startDate: true,
      endDate: true,
    },
  });

  const dates: Date[] = [];
  for (const leave of leaves) {
    const current = new Date(leave.startDate);
    const end = new Date(leave.endDate);

    current.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }

  return dates;
};

//??? ========================================================== LEAVE BOSS =================================================================
//** */ ================================================ persetujuan ================================================
export const persetujuan = async (id: string) => {
  const user = await CurrentUser();

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

//** */ ================================================ tolakLeave ================================================
export const tolakLeave = async (leaveId: string, form: RejectedSchemaType) => {
  const user = await CurrentUser();

  if (!user) throw new Error("Unauthorized");

  const reviewer = await prisma.user.findUnique({ where: { id: user.id } });

  if (reviewer?.role !== "BOSS") {
    throw new Error("Kamu tidak berhak melakukan penolakan");
  }

  try {
    const leave = await prisma.leave.update({
      where: { id: leaveId },
      data: {
        status: "REJECTED",
        reasonRejected: form.reasonRejected,
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
