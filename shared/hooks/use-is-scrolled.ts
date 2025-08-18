"use client";

import { useEffect, useState } from "react";

export function useIsScrolled(threshold: number = 10) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > threshold);
		};

		// Vérifier l'état initial
		handleScroll();

		// Ajouter l'event listener
		window.addEventListener("scroll", handleScroll, { passive: true });

		// Nettoyer l'event listener
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [threshold]);

	return isScrolled;
}
