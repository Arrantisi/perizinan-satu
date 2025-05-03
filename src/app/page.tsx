import { BlurFade } from "@/components/magicui/blur-fade";
import NavTheme from "@/components/sidebar/nav-theme";
import { Button } from "@/components/ui/button";
import { Codepen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <div className="flex flex-col items-center gap-4 max-w-xs lg:max-w-2xl">
        <BlurFade delay={0.25} inView>
          <NavTheme />
        </BlurFade>
        <BlurFade
          delay={0.25 * 2}
          className="text-6xl font-semibold text-balance text-center mt-3"
          inView
        >
          Urus Perizinan Jadi Lebih Cepat & Mudah
        </BlurFade>
        <BlurFade
          delay={0.25 * 3}
          inView
          className="text-xl text-muted-foreground text-center text-balance tracking-wide my-3"
        >
          Tanpa ribet, tanpa antre. Semua izin kini bisa diajukan secara online
          hanya dalam beberapa klik.
        </BlurFade>
        <BlurFade delay={0.25 * 4} inView>
          <Link href={"/dashboard"}>
            <Button
              size={"lg"}
              className="dark:bg-rose-600/70 text-white bg-rose-600 dark:hover:bg-rose-600/65 hover:bg-rose-600/90"
            >
              <Codepen />
              Dashboard Sekarang
            </Button>
          </Link>
        </BlurFade>
        <BlurFade
          delay={0.25 * 5}
          className="text-center text-balance text-sm tracking-wider text-muted-foreground mt-2"
          inView
        >
          Baru! Sistem Perizinan Digital untuk Semua.
        </BlurFade>
      </div>
    </div>
  );
}
