import { createContext, useEffect, useState } from "react";
type ThemeContextType = {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
	theme: "theme-1",
	setTheme: () => {},
});

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-1");

	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
