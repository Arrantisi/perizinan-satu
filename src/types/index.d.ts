import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";

type TableColumnType = {
  children: React.ReactNode;
  columns: {
    accesor: string;
    className?: string;
    type: string;
  }[];
};

export interface ButtonPesetujuanInter
  extends React.ComponentPropsWithRef<typeof Button> {
  leaveId: string;
  onSuccess: () => void;
  isOpen?: () => void;
}

const leaveWithUser = Prisma.validator<Prisma.LeaveInclude>()({
  user: true,
});

export type leaveWithUserType = Prisma.LeaveGetPayload<{
  include: typeof leaveWithUser;
}>;
