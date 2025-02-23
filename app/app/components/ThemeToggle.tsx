"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

