import AjukanForm from "@/components/form/ajukan-form";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAllLeaveDates,
  getLeaveByUserId,
  getUserLeaveSummary,
} from "@/lib/action";
import { currentUser } from "@clerk/nextjs/server";
import {
  CalendarCheck2,
  CalendarMinus,
  CalendarPlus,
  CalendarX2,
} from "lucide-react";

const AjukanPage = async () => {
  const user = await currentUser();
  const takenDates = await getAllLeaveDates();

  const leaves = await getLeaveByUserId();

  console.log({ leaves });

  const leaveRejected = leaves.filter((leave) => leave.status === "REJECTED");
  const leaveApproved = leaves.filter((leave) => leave.status === "APPROVED");

  const { ...props } = await getUserLeaveSummary(user?.id);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        <Card className="w-full">
          <CardContent>
            <div className="flex justify-between">
              <CardTitle className="text-sm font-semibold">
                Total cuti
              </CardTitle>
              <CalendarPlus />
            </div>
            <NumberTicker
              value={props.totalDays}
              className="tracking-tighter font-bold text-3xl"
            />
            <span className="mx-1.5 font-bold text-2xl tracking-tight">
              Hari
            </span>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent>
            <div className="flex justify-between">
              <CardTitle className="text-sm font-semibold">Sisa cuti</CardTitle>
              <CalendarMinus />
            </div>
            <NumberTicker
              value={props.remainingDays}
              className="tracking-tighter font-bold text-3xl"
            />
            <span className="mx-1.5 font-bold text-2xl tracking-tight">
              Hari
            </span>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent>
            <div className="flex justify-between">
              <CardTitle className="text-sm font-semibold">Ditolak</CardTitle>
              <CalendarX2 />
            </div>
            <NumberTicker
              value={leaveRejected.length}
              className="tracking-tighter font-bold text-3xl"
            />
            <span className="mx-1.5 font-bold text-2xl tracking-tight">
              Surat
            </span>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent>
            <div className="flex justify-between">
              <CardTitle className="text-sm font-semibold">Diterima</CardTitle>
              <CalendarCheck2 />
            </div>
            <NumberTicker
              value={leaveApproved.length}
              className="tracking-tighter font-bold text-3xl"
            />
            <span className="mx-1.5 font-bold text-2xl tracking-tight">
              Surat
            </span>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Form Pegajuan izin</CardTitle>
          <CardDescription>
            lebih dikit anda mengajukan cuti lebih baik untuk perusahaan😊
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <AjukanForm takenDate={takenDates} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AjukanPage;
