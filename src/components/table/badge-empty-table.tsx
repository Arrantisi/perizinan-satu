import { Badge } from "../ui/badge";
import { TableRow, TableCell } from "../ui/table";

const BadgeEmptyTable = () => {
  return (
    <TableRow className="hover:bg-card">
      <TableCell colSpan={9} className="text-center">
        <Badge variant={"destructive"} className="my-7 dark:bg-red-700 p-1">
          Tidak ada surat perizinan
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default BadgeEmptyTable;
