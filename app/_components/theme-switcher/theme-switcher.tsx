"use client";

import { Icon } from "@iconify-icon/react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CustomTooltip from "../custom-tooltip/custom-tooltip";

/**
 * This component represents a button that allows users to toggle between light and dark themes in the application.
 * It utilizes the `useTheme` hook from `next-themes` to access the current resolved theme and set the theme to either
 * 'light' or 'dark' based on the user's preference.
 */
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
      content={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      <Button
        isIconOnly
        color="default"
        variant="flat"
        aria-label="Switch theme"
        onPress={() => setTheme(isLight ? "dark" : "light")} // since onClick is deprecated: https://nextui.org/docs/components/button#button-events (onClick doesn't work when pressing the ENTER key)
      >
        <Icon
          icon={isLight ? "mdi:moon-and-stars" : "mdi:white-balance-sunny"}
          className="text-2xl"
          data-testid="theme-switcher-icon"
        />
      </Button>
    </CustomTooltip>
  );
}
