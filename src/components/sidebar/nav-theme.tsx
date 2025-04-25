"use client";

import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { MonitorDot, MoonStarIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const NavTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMunted] = useState(false);

  useEffect(() => {
    setMunted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme} className="mr-1">
      <TabsList>
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonStarIcon />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <MonitorDot />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default NavTheme;
