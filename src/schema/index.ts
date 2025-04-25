import { z } from "zod";

export const ajukanSchema = z.object({
  dateRange: z.object({
    from: z.date({ required_error: "Tannggal mulai di butuhkan" }),
    to: z.date({ required_error: "tanggal akhir di butuhkan" }),
  }),
  type: z.string().min(3, "harus lebih dari 3 huruf"),
  reason: z.string().min(10, "harus lebih dari 10 huruf"),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export type AjukanScemaType = z.infer<typeof ajukanSchema>;

export const karyawanSchema = z.object({
  role: z.enum(["BOSS", "EMPLOYEE"], {
    required_error: "silahkan pilih role yang akan di ganti",
  }),
});

export type KaryawanSchemaType = z.infer<typeof karyawanSchema>;
