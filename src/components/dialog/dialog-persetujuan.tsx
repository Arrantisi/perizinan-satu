"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { getLeaveById } from "@/lib/action";
import { leaveWithUserType } from "@/types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import getInitialName from "@/utils/fullName";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  CalendarCheck2Icon,
  ClipboardType,
  Clock2Icon,
  MessageCircleMore,
} from "lucide-react";
import formattedDate from "@/utils/date-format";
import StatusBadge from "../status-badge";
import { ButtonSetuju, ButtonTolak } from "../buttons";

const DialogPersetujuan = ({ leaveId }: { leaveId: string }) => {
  const [open, setOpen] = useState(false);
  const [leave, setleave] = useState<leaveWithUserType | null>(null);

  useEffect(() => {
    const fetcLeaveById = async () => {
      const leave = await getLeaveById(leaveId);
      setleave(leave);
    };
    fetcLeaveById();
  }, [leaveId]);

  const updateLeaveStatus = (status: "PENDING" | "REJECTED" | "APPROVED") => {
    if (leave) {
      setleave({ ...leave, status });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} onClick={() => setOpen(true)}>
          Persetujuan
        </Button>
      </DialogTrigger>
      <DialogContent className="text-xs">
        <DialogHeader>
          <DialogTitle>Surat perizinan</DialogTitle>
          <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
        </DialogHeader>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center flex-col gap-1">
              <Avatar>
                <AvatarFallback>
                  {getInitialName(leave?.user.name || "A")}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-sm">
                {leave?.user.name || <Skeleton className="h-5 w-30" />}
              </h1>
              <span className="text-xs text-muted-foreground">
                {leave?.user.email || <Skeleton className="h-4 w-55" />}
              </span>
            </div>
          </CardHeader>
          <CardContent>
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

              <div className="flex flex-col gap-4 col-span-2">
                <span>
                  {formattedDate(leave?.startDate || new Date())} -{" "}
                  {formattedDate(leave?.startDate || new Date())}
                </span>
                <span>
                  <StatusBadge
                    status={leave?.status || ""}
                    variant={"default"}
                  />
                </span>
                <span>{leave?.type}</span>
                <span>{leave?.reason}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <ButtonSetuju
            leaveId={leaveId}
            className="w-full sm:w-1/6"
            onSuccess={() => {
              setOpen(false);
              updateLeaveStatus("APPROVED");
            }}
          />
          <ButtonTolak
            leaveId={leaveId}
            className="w-full sm:w-1/6"
            onSuccess={() => {
              setOpen(false);
              updateLeaveStatus("REJECTED");
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPersetujuan;
