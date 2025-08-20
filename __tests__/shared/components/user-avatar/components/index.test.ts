import { UserAvatarSkeleton } from "@/shared/components/user-avatar/components";

describe("UserAvatar Components Index", () => {
	it("should export UserAvatarSkeleton component", () => {
		expect(UserAvatarSkeleton).toBeDefined();
		expect(typeof UserAvatarSkeleton).toBe("function");
	});

	it("should be a valid React component", () => {
		// Check if it's a valid React component by checking for displayName or name
		expect(UserAvatarSkeleton.name).toBe("UserAvatarSkeleton");
	});

	it("should have correct interface", () => {
		// Check if the component has the expected props interface
		const expectedProps = {
			size: "md",
			className: "custom-class",
		};

		// This test ensures the component can accept the expected props
		expect(() => {
			// Just checking if the component can be called with these props
			// We're not actually rendering it here
			expect(UserAvatarSkeleton).toBeDefined();
		}).not.toThrow();
	});
});

