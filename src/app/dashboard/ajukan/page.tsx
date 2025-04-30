import AjukanForm from "@/components/form/ajukan-form";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllLeaveDates, getUserLeaveSummary } from "@/lib/action";
import { currentUser } from "@clerk/nextjs/server";
import { CalendarDays, CalendarMinus, CalendarPlus } from "lucide-react";

const AjukanPage = async () => {
  const user = await currentUser();
  const takenDates = await getAllLeaveDates();

  const { ...props } = await getUserLeaveSummary(user?.id);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3 w-full">
        <Card className="w-full">
          <CardContent>
            <div className="flex justify-between">
              <CardTitle className="text-sm font-semibold">
                Batas cuti
              </CardTitle>
              <CalendarDays />
            </div>

            <NumberTicker
              value={12}
              className="tracking-tighter font-bold text-3xl"
            />
          </CardContent>
        </Card>
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
