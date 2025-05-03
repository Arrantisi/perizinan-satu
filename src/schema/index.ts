import { z } from "zod";

//* */ ================================================= BUAT DAN UNDANG KARAYAWAN SCHEMA ===========================================================
export const createUserAndInviteSchema = z.object({
  firsName: z
    .string()
    .min(3, "harus lebih dari 3 huruf")
    .max(12, "tidak boleh lebih dari 12 huruf"),
  lastName: z
    .string()
    .min(3, "harus lebih dari 3 huruf")
    .max(12, "tidak boleh lebih dari 12 huruf"),
  email: z.string().email(),
});

export type CreateUserAndInviteSchemaType = z.infer<
  typeof createUserAndInviteSchema
>;

//* */ ========================================================== AJUKAN SCHEMA ======================================================================
export const ajukanSchema = z.object({
  dateRange: z.object({
    from: z.date({ required_error: "Tannggal mulai di butuhkan" }),
    to: z.date({ required_error: "tanggal akhir di butuhkan" }),
  }),
  type: z
    .string()
    .min(3, "harus lebih dari 3 huruf")
    .max(12, "tidak boleh lebih dari 12 huruf"),
  reason: z.string().min(10, "harus lebih dari 10 huruf"),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export type AjukanScemaType = z.infer<typeof ajukanSchema>;

//* */ ========================================================== KARYAWAN SCHEMA ======================================================================
export const karyawanSchema = z.object({
  role: z.enum(["BOSS", "EMPLOYEE"], {
    required_error: "silahkan pilih role yang akan di ganti",
  }),
});

export type KaryawanSchemaType = z.infer<typeof karyawanSchema>;

//* */ ========================================================== REJECTED SCHEMA ======================================================================
export const rejectedSchema = z.object({
  reasonRejected: z.string().min(10, "harus lebih dari 10 karakter"),
});

export type RejectedSchemaType = z.infer<typeof rejectedSchema>;
