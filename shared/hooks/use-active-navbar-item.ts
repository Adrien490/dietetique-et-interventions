"use client";

import { useEffect, useState } from "react";

// Constants
const SECTIONS = {
	HOME: "home",
	ABOUT: "about",
	SERVICES: "services",
	FAQ: "faq",
	CONTACT: "contact",
} as const;

const VIEWPORT_THRESHOLD = 0.4;

type Section = (typeof SECTIONS)[keyof typeof SECTIONS];

export function useActiveNavbarItem() {
	const [activeSection, setActiveSection] = useState<Section>(SECTIONS.HOME);

	useEffect(() => {
		const updateActiveSection = () => {
			const aboutElement = document.getElementById(SECTIONS.ABOUT);
			const servicesElement = document.getElementById(SECTIONS.SERVICES);
			const faqElement = document.getElementById(SECTIONS.FAQ);
			const contactElement = document.getElementById(SECTIONS.CONTACT);

			if (!aboutElement || !servicesElement || !faqElement || !contactElement)
				return;

			const viewport = window.innerHeight;
			const threshold = viewport * VIEWPORT_THRESHOLD;

			const aboutRect = aboutElement.getBoundingClientRect();
			const servicesRect = servicesElement.getBoundingClientRect();
			const faqRect = faqElement.getBoundingClientRect();
			const contactRect = contactElement.getBoundingClientRect();

			// Check if currently in contact section
			const isInContact =
				contactRect.top <= threshold && contactRect.bottom >= threshold;

			// Check if currently in FAQ section
			const isInFAQ = faqRect.top <= threshold && faqRect.bottom >= threshold;

			// Check if currently in services section
			const isInServices =
				servicesRect.top <= threshold && servicesRect.bottom >= threshold;

			// Check if currently in about section
			const isInAbout =
				aboutRect.top <= threshold && aboutRect.bottom >= threshold;

			// Determine active section (order matters - from bottom to top)
			if (isInFAQ) {
				setActiveSection(SECTIONS.FAQ);
			} else if (isInContact) {
				setActiveSection(SECTIONS.CONTACT);
			} else if (isInServices) {
				setActiveSection(SECTIONS.SERVICES);
			} else if (isInAbout) {
				setActiveSection(SECTIONS.ABOUT);
			} else if (aboutRect.top > threshold) {
				setActiveSection(SECTIONS.HOME);
			}
		};

		// Throttled scroll handler
		let isScrolling = false;
		const handleScroll = () => {
			if (!isScrolling) {
				requestAnimationFrame(() => {
					updateActiveSection();
					isScrolling = false;
				});
				isScrolling = true;
			}
		};

		// Setup scroll listener
		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initial check
		updateActiveSection();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Check if menu item is active
	const isMenuItemActive = (href: string): boolean => {
		if (href === "/") {
			return activeSection === SECTIONS.HOME;
		}

		if (href.startsWith("/#")) {
			const sectionId = href.substring(2);
			return activeSection === sectionId;
		}

		return false;
	};

	return {
		isMenuItemActive,
		activeSection,
	};
}
