import { createContext, useEffect, useState } from "react";
type ThemeContextType = {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme-1") || "theme-2" || "theme-3";
	});

	useEffect(() => {
		return localStorage.setItem("theme-1", theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
