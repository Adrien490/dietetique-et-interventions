"use client";

import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/utils";
import { useForm } from "@tanstack/react-form";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { MiniDotsLoader } from "./loaders";

interface SearchFormProps {
	paramName: string; // Le nom du paramètre de recherche à gérer
	className?: string;
	placeholder?: string;
}

export function SearchForm({
	paramName,
	className,
	placeholder,
}: SearchFormProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	// Récupérer la valeur initiale du paramètre de recherche
	const initialSearchValue = searchParams.get(paramName) || "";

	// Configuration du formulaire avec TanStack Form
	const form = useForm({
		defaultValues: {
			searchTerm: initialSearchValue,
		},
	});

	// Mettre à jour les paramètres d'URL lorsque la recherche change
	const updateSearchParams = (searchTerm: string) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		if (searchTerm) {
			newSearchParams.set(paramName, searchTerm);
		} else {
			newSearchParams.delete(paramName);
		}

		startTransition(() => {
			router.replace(`?${newSearchParams.toString()}`, { scroll: false });
		});
	};

	return (
		<form
			role="search"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className={cn(
				"relative flex w-full items-center",
				"group rounded-md overflow-hidden",
				"bg-background border border-input",
				"hover:border-muted-foreground/25",
				"focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20",
				"transition-all duration-200 ease-in-out",
				isPending && "opacity-90",
				className
			)}
			data-pending={isPending ? "" : undefined}
		>
			<div className="absolute left-3 flex items-center text-muted-foreground">
				{isPending ? (
					<MiniDotsLoader size="sm" color="primary" />
				) : (
					<Search className="h-4 w-4 group-hover:text-foreground/70 group-focus-within:text-primary transition-colors duration-150" />
				)}
			</div>

			<form.Field
				name="searchTerm"
				validators={{
					onChangeAsyncDebounceMs: 300, // Debounce de 300ms
					onChangeAsync: async ({ value }) => {
						updateSearchParams(value);
						return undefined;
					},
				}}
			>
				{(field) => (
					<Input
						autoComplete="off"
						type="search"
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						className={cn(
							"pl-10",
							"border-none shadow-none focus-visible:ring-0",
							"bg-transparent",
							"placeholder:text-muted-foreground/50",
							"transition-all duration-150"
						)}
						placeholder={placeholder || "Rechercher..."}
						aria-label="Champ de recherche"
					/>
				)}
			</form.Field>
		</form>
	);
}
