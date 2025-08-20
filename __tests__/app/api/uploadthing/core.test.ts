import { createUploadthing } from "uploadthing/next";

// Mock uploadthing
jest.mock("uploadthing/next", () => ({
	createUploadthing: jest.fn(() => ({
		f: jest.fn(),
	})),
}));

describe("UploadThing Core", () => {
	it("should create uploadthing instance", () => {
		const uploadThing = createUploadthing();

		expect(uploadThing).toBeDefined();
		expect(typeof uploadThing.f).toBe("function");
	});

	it("should have file router configuration", () => {
		const uploadThing = createUploadthing();

		expect(uploadThing.f).toBeDefined();
	});
});
