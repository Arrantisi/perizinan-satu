"use client";

import {
  CalendarCheck2Icon,
  ClipboardType,
  Clock2Icon,
  MessageCircleMore,
} from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { getLeaveById } from "@/lib/action";
import { Leave } from "@prisma/client";
import formattedDate from "@/utils/date-format";
import StatusBadge from "../status-badge";

const ViewDialog = ({ id }: { id: string }) => {
  const [data, setData] = useState<Leave | null>(null);

  useEffect(() => {
    const leave = async (id: string) => {
      if (!id) return;
      const getLeave = await getLeaveById(id);
      setData(getLeave);
    };

    leave(id);
  }, [id]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Kartu Izin Cuti Anda</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-[auto_min-content_1fr] gap-x-3 my-4">
        {/* LEFT */}
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center">
            <CalendarCheck2Icon size={20} className="mr-2" />
            Tanggal
          </div>

          <div className="flex items-center">
            <Clock2Icon size={20} className="mr-2" />
            Status
          </div>
          <div className="flex items-center">
            <ClipboardType size={20} className="mr-2" />
            Jenis Izin
          </div>
          <div className="flex items-center">
            <MessageCircleMore size={20} className="mr-2" />
            Alasan
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <span className="w-full text-center">:</span>
          <span>:</span>
          <span>:</span>
          <span>:</span>
        </div>

        <div className="flex flex-col gap-4">
          <span>
            {formattedDate(data?.startDate || new Date())} -{" "}
            {formattedDate(data?.startDate || new Date())}
          </span>
          <span>
            <StatusBadge status={data?.status || ""} variant={"default"} />
          </span>
          <span>{data?.type}</span>
          <span>{data?.reason}</span>
        </div>
      </div>
    </DialogContent>
  );
};

export default ViewDialog;
