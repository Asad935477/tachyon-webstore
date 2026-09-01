"use client";

import {
	InputGroup,
	InputGroupInput,
} from "@tachyon-webstore/ui/components/input-group";
import { Search } from "lucide-react";

export function SearchBar({
	value,
	onChange,
	onSubmit,
}: {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
}) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit();
			}}
			className="w-full"
		>
			<InputGroup>
				<InputGroupInput
					placeholder="Search products..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
				<button
					type="submit"
					className="flex items-center px-2 text-muted-foreground"
				>
					<Search className="size-4" />
					<span className="sr-only">Search</span>
				</button>
			</InputGroup>
		</form>
	);
}
