export default function Calculator() {
	return (
		<main className="w-full max-w-[33.9375rem]">
			<header className="w-full flex items-end justify-between text-secondary-color font-bold mb-8">
				<h3 className="text-[2rem]">calc</h3>
				<div className="flex items-end gap-6">
					<h2 className="text-sm">THEME</h2>
					<div className="flex flex-col items-center gap-1">
						<div className="flex gap-4 ">
							<span>1</span>
							<span>2</span>
							<span>3</span>
						</div>
						<div className="bg-toggle-bg w-18 h-6 rounded-full relative">
							<span className="block absolute top-1/2 left-1 -translate-y-1/2 bg-toggle-btn w-4 h-4 rounded-full"></span>
						</div>
					</div>
				</div>
			</header>
			<section className="w-full bg-screen-bg text-secondary-color h-32 rounded-[10px] flex flex-col items-end justify-center px-8 mb-10">
				<h1 className="text-[4rem] font-bold">399,981</h1>
			</section>
			<section className="w-full p-10 bg-keypad-bg rounded-[0.625rem] grid grid-cols-4 gap-7">
				<Key value={7} />
				<Key value={8} />
				<Key value={9} />
				<Key value="DEL" del />
				<Key value={4} />
				<Key value={5} />
				<Key value={6} />
				<Key value="+" />
				<Key value={1} />
				<Key value={2} />
				<Key value={3} />
				<Key value="-" />
				<Key value="." />
				<Key value={0} />
				<Key value="/" />
				<Key value="x" />
				<Key value="RESET" reset className="col-span-2" />
				<Key value="=" equal className="col-span-2" />
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
};

const Key = ({ value, reset = false, equal = false, del = false, className = "" }: ValueProps) => {
	const dynamicColor = reset
		? "bg-delete-bg text-secondary-color text-[2rem]"
		: del
		? "bg-delete-bg text-secondary-color text-[2rem]"
		: equal
		? "bg-equal-bg text-secondary-color text-[2rem]"
		: "bg-key-bg text-primary-color text-[2.5rem]";
	return (
		<button
			type="button"
			className={`${dynamicColor} ${className} px-4 flex items-center justify-center font-bold h-[3.75rem] rounded-[0.75rem]`}
			style={{
				boxShadow:
					reset || del
						? "0px 0.25rem 0px var(--delete-shadow)"
						: equal
						? "0px 0.25rem 0px var(--equal-shadow)"
						: "0px 0.25rem 0px var(--key-shadow)",
			}}
		>
			{value}
		</button>
	);
};
