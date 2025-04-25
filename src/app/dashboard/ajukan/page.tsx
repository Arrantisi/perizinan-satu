import AjukanForm from "@/components/form/ajukan-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AjukanPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Form Pegajuan izin</CardTitle>
        <CardDescription>
          lebih dikit anda mengajukan cuti lebih baik untuk perusahaan😊
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AjukanForm />
      </CardContent>
    </Card>
  );
};

export default AjukanPage;
