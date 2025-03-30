
import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;
    
    // Check system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem("theme", theme);
    
    // Update document class for tailwind dark mode
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Add a data attribute for additional styling hooks
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
