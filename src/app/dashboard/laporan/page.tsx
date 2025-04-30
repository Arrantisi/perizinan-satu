import { getUserLeaveSummary } from "@/lib/action";

const LaporanPage = async () => {
  const { ...props } = await getUserLeaveSummary(
    "user_2w7ZndrdvbernQd9fEFZHxOr9qs"
  );

  return (
    <div>
      <h2>Rekap Cuti Tahun ini</h2>
      <p>total cuti tahun ini: {props.totalDays} </p>
      <p>sisa cuti: {props.remainingDays}</p>

      {props.isLimitedDays && <p>Batas cuti 12 hari telah habis</p>}
    </div>
  );
};

export default LaporanPage;
