"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid SSR → client mismatch
    return null;
  }

  const isDarkMode = theme === "dark";

  return (
    <Button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      size="icon"
      variant="ghost"
    >
      {isDarkMode ? <Moon /> : <Sun />}
    </Button>
  );
}
