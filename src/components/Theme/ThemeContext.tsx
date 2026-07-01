// * - try to base on css classes first
import {
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeContextType = {
  theme: RefObject<Theme | null>; // 'light' | 'dark' | null === 'system'
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const getMode = () => {
  if (window.matchMedia) {
    const matchesDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return matchesDarkMode ? Theme.DARK : Theme.LIGHT;
  }
  // there may not be window.matchMedia object - eg. in tests
  return null; // 'system'
};

const addDarkCssClass = () => document.body.classList.add("dark");
const removeDarkCssClass = () => document.body.classList.remove("dark");

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context) {
    return context;
  }
  throw new Error("Oh no! Component should be placed inside ThemeProvider");
};

const useTheme = () => {
  // const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const theme = useRef<Theme | null>(getMode()); // Map, Set
  // const theme = useRef(new Set()); // Map, Set

  useEffect(() => {
    // on the mount of component set additional class
    const themeMode = getMode();

    if (themeMode === Theme.LIGHT) {
      removeDarkCssClass();
    } else if (themeMode === Theme.DARK) {
      addDarkCssClass();
    }

    // add listener for change preferences
    const handleSchemeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        // is light?
        removeDarkCssClass();
      } else {
        addDarkCssClass();
      }
    };

    let query: MediaQueryList;
    if (themeMode !== null) {
      query = window.matchMedia("(prefers-color-scheme: light)");
      query.addEventListener("change", handleSchemeChange);
    }

    return () => {
      query?.removeEventListener("change", handleSchemeChange);
    };
  }, []);

  const toggle = () => {
    // if (theme === Theme.DARK) {
    //   setTheme(Theme.LIGHT);
    //   document.body.classList.add("light");
    // } else {
    //   setTheme(Theme.DARK);
    //   document.body.classList.remove("light");
    // }
    if (theme.current === Theme.DARK) {
      theme.current = Theme.LIGHT;
      removeDarkCssClass();
    } else {
      theme.current = Theme.DARK;
      addDarkCssClass();
    }
  };
  return { theme, toggle };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={useTheme()}>{children}</ThemeContext.Provider>
  );
};
