import { CheckCircle2Icon, LoaderCircle, OctagonXIcon } from "lucide-react";
import { Badge } from "./ui/badge";

const StatusBadge = ({
  status,
  variant = "secondary",
}: {
  status: string;
  variant?:
    | "outline"
    | "default"
    | "secondary"
    | "destructive"
    | null
    | undefined;
}) => {
  switch (status) {
    case "PENDING": {
      return (
        <Badge variant={variant}>
          <LoaderCircle size={20} />
          Menunggu
        </Badge>
      );
    }
    case "APPROVED": {
      return (
        <Badge variant={variant}>
          <CheckCircle2Icon size={20} className="text-green-500" />
          Disetujui
        </Badge>
      );
    }
    case "REJECTED": {
      return (
        <Badge variant={variant}>
          <OctagonXIcon size={20} className="text-red-500" />
          Ditolak
        </Badge>
      );
    }
    default: {
      return null;
    }
  }
};

export default StatusBadge;
