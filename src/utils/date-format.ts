import { format } from "date-fns";
import { id } from "date-fns/locale";

const formattedDate = (tanggal: Date) => {
  const date = new Date(tanggal);
  return format(date, "dd MMM yyy", { locale: id });
};

export default formattedDate;
