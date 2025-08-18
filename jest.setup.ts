import "@testing-library/jest-dom";
import { ImageProps } from "next/image";
import { createElement } from "react";

// Polyfill for TextDecoder/TextEncoder
import { TextDecoder, TextEncoder } from "util";
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.TextEncoder = TextEncoder as typeof global.TextEncoder;

// Polyfill for ResizeObserver (required by Radix UI components)
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

// Polyfill React.act for compatibility with @testing-library/react
import React from "react";
import { act as reactDomAct } from "react-dom/test-utils";

if (!React.act) {
	// @ts-ignore
	React.act = reactDomAct;
}

// Mock next/navigation
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
	usePathname() {
		return "";
	},
}));

// Mock next/image
jest.mock("next/image", () => ({
	__esModule: true,
	default: function Image(props: ImageProps) {
		return createElement("img", {
			src: props.src,
			alt: props.alt,
			width: props.width,
			height: props.height,
			className: props.className,
		});
	},
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
process.env.EMAIL = "test@example.com";
process.env.RESEND_API_KEY = "test_resend_api_key";

// Mock better-auth to avoid ESM issues
jest.mock("better-auth", () => ({
	betterAuth: jest.fn(() => ({
		api: {
			getSession: jest.fn(),
			signOut: jest.fn(),
		},
		$Infer: {
			Session: {},
			User: {},
		},
	})),
}));

jest.mock("@better-auth/utils", () => ({
	generateId: jest.fn(() => "mock-id"),
}));

jest.mock("better-auth/adapters/prisma", () => ({
	prismaAdapter: jest.fn(() => ({})),
}));

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
	console.error = (...args: unknown[]) => {
		if (
			typeof args[0] === "string" &&
			(args[0].includes("Warning: ReactDOM.render") ||
				args[0].includes("ReactDOMTestUtils.act") ||
				args[0].includes("React.act"))
		) {
			return;
		}
		originalError.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
});
