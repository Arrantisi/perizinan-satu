import NavTheme from "@/components/sidebar/nav-theme";
import { Button } from "@/components/ui/button";
import { Codepen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center gap-4 max-w-2xl">
        <NavTheme />
        <h1 className="text-6xl font-semibold text-balance text-center mt-3">
          Urus Perizinan Jadi Lebih Cepat & Mudah
        </h1>
        <span className="text-xl text-muted-foreground text-center text-balance tracking-wide my-3">
          Tanpa ribet, tanpa antre. Semua izin kini bisa diajukan secara online
          hanya dalam beberapa klik.
        </span>
        <Link href={"/dashboard"}>
          <Button size={"lg"}>
            <Codepen />
            Dashboard Sekarang
          </Button>
        </Link>
        <span className="text-center text-balance text-sm tracking-wider text-muted-foreground mt-1">
          Baru! Sistem Perizinan Digital untuk Semua.
        </span>
      </div>
    </div>
  );
}
