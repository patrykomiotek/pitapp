import { useState } from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { getMode, useThemeContext, Theme } from "./ThemeContext";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme | null>(getMode());
  const context = useThemeContext();
  const handleClick = () => {
    context.toggle();
    setTheme((theme) => (theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const Icon = theme === Theme.LIGHT ? MoonIcon : SunIcon;

  return (
    <div className="ml-4 w-[40px]">
      <Icon
        onClick={handleClick}
        className="h-5 w-5 cursor-pointer dark:text-white"
        aria-hidden="true"
      />
    </div>
  );
};
