import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'vibe' | 'classical' | 'none';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * 
 * Provides global state for:
 * 1. Current theme ('vibe', 'classical', 'none')
 * 2. Mute status for audio
 * 
 * Also handles applying the 'data-theme' attribute to the document root
 * for CSS styling purposes.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('vibe');
  const [isMuted, setIsMuted] = useState(true);

  // Update the document's data-theme attribute whenever theme changes
  useEffect(() => {
    const themeMap: Record<ThemeType, string> = {
      vibe: 'vibe',
      classical: 'classical',
      none: 'none',
    };
    document.documentElement.setAttribute('data-theme', themeMap[theme]);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isMuted, setIsMuted }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
