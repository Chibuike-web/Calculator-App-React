import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContextProvider";

export default function Calculator() {
	const [activeToggle, setActiveToggle] = useState(
		localStorage.getItem("activeToggle") || "firstToggle"
	);
	const context = useContext(ThemeContext);
	const { theme, setTheme } = context;
	const [display, setDisplay] = useState<(string | number)[]>([]);

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { id } = e.currentTarget;
		setActiveToggle(id);
		localStorage.setItem("activeToggle", id);

		if (id === "firstToggle") setTheme("theme-1");
		if (id === "secondToggle") setTheme("theme-2");
		if (id === "thirdToggle") setTheme("theme-3");
	};

	function calc(array: (string | number)[]): number {
		if (array.length === 0) throw new Error("Empty array not allowed");

		// First pass: Consolidate numbers
		const consolidatedTokens: (string | number)[] = [];
		let currentNumber = "";

		for (const item of array) {
			const token = String(item).trim();

			if (token === "" || token === " ") continue;

			// If it's a digit or decimal point, add to current number
			if (/^[0-9.]$/.test(token)) {
				currentNumber += token;
			} else if (["+", "-", "*", "/", "x"].includes(token)) {
				// If we have a current number being built, push it first
				if (currentNumber !== "") {
					consolidatedTokens.push(parseFloat(currentNumber));
					currentNumber = "";
				}
				consolidatedTokens.push(token);
			} else {
				throw new Error(`Invalid token: ${token}`);
			}
		}

		// Don't forget the last number if there is one
		if (currentNumber !== "") {
			consolidatedTokens.push(parseFloat(currentNumber));
		}

		// Second pass: Calculate the result
		let result: number | null = null;
		let operator: string | null = null;

		for (const token of consolidatedTokens) {
			if (typeof token === "number") {
				if (result === null) {
					result = token;
				} else if (operator === "+") {
					result += token;
				} else if (operator === "-") {
					result -= token;
				} else if (operator === "*" || operator === "x") {
					result *= token;
				} else if (operator === "/") {
					result /= token;
				}
				operator = null;
			} else if (["+", "-", "*", "/", "x"].includes(token)) {
				if (result === null) throw new Error("Expression cannot start with an operator");
				operator = token;
			}
		}

		if (operator !== null) throw new Error("Expression cannot end with an operator");
		if (result === null) throw new Error("No valid numbers found");

		return result;
	}

	const handleClick = (value: string | number) => {
		switch (true) {
			case [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(Number(value)):
				setDisplay((prev) => [...prev, value]);
				break;

			case ["+", "-", "/", "x"].includes(String(value)):
				setDisplay((prev) => [...prev, String(value)]);
				break;
			case value === ".":
				setDisplay((prev) => [...prev, "."]);
				break;
			case value === "RESET":
				setDisplay([]);
				break;
			case value === "=":
				setDisplay((prev) => [calc(prev)]);
				break;
			case value === "DEL":
				setDisplay((prev) => prev?.slice(0, -1));
				break;
		}
	};

	const togglePosition =
		activeToggle === "secondToggle"
			? "left-1/2 -translate-x-1/2"
			: activeToggle === "thirdToggle"
			? "right-1"
			: "left-1";

	return (
		<main className="w-full max-w-[33.9375rem] max-md:px-6">
			<header className="w-full flex items-end justify-between text-[var(--text-secondary)] font-bold mb-8">
				<h3 className="text-[2rem]">calc</h3>
				<div className="flex items-end gap-6">
					<h2 className="text-sm">THEME</h2>
					<div className="flex flex-col items-center gap-1">
						<div className="flex gap-4 ">
							<span>1</span>
							<span>2</span>
							<span>3</span>
						</div>
						<div className="bg-[var(--toggle-background)] w-18 h-6 rounded-full relative overflow-hidden">
							<button
								type="button"
								className={`block absolute bg-[var(--toggle-btn)] w-4 h-4 rounded-full z-10 top-1/2 -translate-y-1/2 ${togglePosition} cursor-pointer transition-all duration-200 ease-in-out`}
								onClick={(e) => handleToggle(e)}
							></button>
							<button
								id="firstToggle"
								type="button"
								className="block absolute bg-transparent w-4 h-4 rounded-full top-1/2 left-1 -translate-y-1/2 cursor-pointer"
								onClick={(e) => handleToggle(e)}
							></button>
							<button
								id="secondToggle"
								type="button"
								className="block absolute bg-transparent w-4 h-4 rounded-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
								onClick={(e) => handleToggle(e)}
							></button>
							<button
								id="thirdToggle"
								type="button"
								className="block absolute bg-transparent w-4 h-4 rounded-full top-1/2 right-1 -translate-y-1/2 cursor-pointer"
								onClick={(e) => handleToggle(e)}
							></button>
						</div>
					</div>
				</div>
			</header>
			<section className="w-full overflow-x-hidden bg-[var(--screen-background)] text-[var(--text-secondary)] rounded-[10px] flex flex-col items-end justify-center px-8 min-h-[128px] max-md:px-6 max-md:min-h-[88px] mb-10 max-md:mb-6">
				<h1 className="text-[4rem] max-md:text-[2.5rem] font-bold text-right text-nowrap">
					{display}
				</h1>
			</section>
			<section className="w-full max-md:p-6 p-10 bg-[var(--keypad-background)] rounded-[0.625rem] grid grid-cols-4 gap-7 max-md:gap-4">
				<Key value={7} handleClick={handleClick} />
				<Key value={8} handleClick={handleClick} />
				<Key value={9} handleClick={handleClick} />
				<Key value="DEL" del handleClick={handleClick} />
				<Key value={4} handleClick={handleClick} />
				<Key value={5} handleClick={handleClick} />
				<Key value={6} handleClick={handleClick} />
				<Key value="+" handleClick={handleClick} />
				<Key value={1} handleClick={handleClick} />
				<Key value={2} handleClick={handleClick} />
				<Key value={3} handleClick={handleClick} />
				<Key value="-" handleClick={handleClick} />
				<Key value="." handleClick={handleClick} />
				<Key value={0} handleClick={handleClick} />
				<Key value="/" handleClick={handleClick} />
				<Key value="x" handleClick={handleClick} />
				<Key value="RESET" reset className="col-span-2" handleClick={handleClick} />
				<Key value="=" equal className="col-span-2" handleClick={handleClick} />
			</section>
		</main>
	);
}

type ValueProps = {
	value: number | string;
	reset?: boolean;
	equal?: boolean;
	del?: boolean;
	className?: string;
	handleClick: (value: string | number) => void;
};

const Key = ({
	value,
	reset = false,
	equal = false,
	del = false,
	className = "",
	handleClick,
}: ValueProps) => {
	const dynamicColor = reset
		? "bg-[var(--delete-background)] text-[var(--text-quad)] text-[2rem] max-md:text-[1.2rem]"
		: del
		? "bg-[var(--delete-background)] text-[var(--text-quad)] text-[2rem] max-md:text-[1.2rem]"
		: equal
		? "bg-[var(--equal-background)] text-[var(--text-quad)] text-[2rem] max-md:text-[1.2rem]"
		: "bg-[var(--key-background)] text-[var(--text-tertiary)] text-[2.5rem] max-md:text-[1.8rem]";
	return (
		<button
			type="button"
			className={`${dynamicColor} ${className} px-4 flex items-center justify-center font-bold h-[3.75rem] rounded-[0.75rem] max-md:rounded-[0.25rem] cursor-pointer`}
			style={{
				boxShadow:
					reset || del
						? "0px 0.25rem 0px var(--delete-shadow)"
						: equal
						? "0px 0.25rem 0px var(--equal-shadow)"
						: "0px 0.25rem 0px var(--key-shadow)",
			}}
			onClick={() => handleClick(value)}
		>
			{value}
		</button>
	);
};
