"use client";

import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@nextui-org/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const handleClick = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Button onClick={handleClick} isIconOnly variant="light">
      {theme === "light" || isSSR ? <LuMoon size={20} /> : <LuSun size={20} />}
    </Button>
  );
}
