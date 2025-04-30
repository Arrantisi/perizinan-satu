import { Button } from "@/components/ui/button";

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
  id: string;
}
