"use client";

import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Mail, User2, UserCog2 } from "lucide-react";
import { User } from "@prisma/client";
import { getUserById } from "@/lib/action";

const ViewDialogKaryawan = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async (id: string) => {
      const getUser = await getUserById(id);
      setUser(getUser || null);
    };
    fetchUser(id);
  }, [id]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Kartu Karyawan</DialogTitle>
        <DialogDescription>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo,
          distinctio?
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-[auto_min-content_1fr] my-4 gap-x-4">
        {/* LEFT */}
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-3">
            <User2 size={16} />
            Nama
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} />
            Email
          </div>
          <div className="flex items-center gap-3">
            <UserCog2 size={16} />
            Role
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <span className="w-full text-center">:</span>
          <span>:</span>
          <span>:</span>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-2">
          <span className="capitalize">{user?.name}</span>
          <span>{user?.email}</span>
          <span>{user?.role}</span>
        </div>
      </div>
    </DialogContent>
  );
};

export default ViewDialogKaryawan;
