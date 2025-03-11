import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ThemeContextProvider from "./components/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeContextProvider>
			<App />
		</ThemeContextProvider>
	</StrictMode>
);
