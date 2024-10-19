"use client";

import { Icon } from "@iconify-icon/react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CustomTooltip from "../CustomTooltip";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isLight = "light" === theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CustomTooltip
      content={`${isLight ? "Switch to dark theme" : "Switch to light theme"}`}
    >
      <Button
        isIconOnly
        color="default"
        variant="faded"
        aria-label="Switch theme"
        onClick={() => setTheme(isLight ? "dark" : "light")}
      >
        <Icon
          icon={`${isLight ? "mdi:moon-and-stars" : "mdi:white-balance-sunny"}`}
          className="text-2xl"
          data-testid="theme-switcher-icon"
        />
      </Button>
    </CustomTooltip>
  );
}
