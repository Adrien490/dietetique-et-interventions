import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	// Add more setup options before each test is run
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		"^@/(.*)$": "<rootDir>/$1",
		"^@/app/(.*)$": "<rootDir>/app/$1",
		"^@/shared/(.*)$": "<rootDir>/shared/$1",
		"^@/domains/(.*)$": "<rootDir>/domains/$1",
	},
	testPathIgnorePatterns: [
		"<rootDir>/node_modules/",
		"<rootDir>/.next/",
		"<rootDir>/app/generated/",
	],
	modulePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/app/generated/"],
	transformIgnorePatterns: [
		"node_modules/(?!(.*\\.mjs$))",
	],
	collectCoverageFrom: [
		"app/**/*.{js,jsx,ts,tsx}",
		"shared/**/*.{js,jsx,ts,tsx}",
		"domains/**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/.next/**",
		"!**/generated/**",
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
