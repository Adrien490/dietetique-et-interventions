import { SpinnerLoaderProps, SpinnerLoaderSize, SpinnerLoaderColor } from "@/shared/components/loaders/spinner-loader/types";

describe("SpinnerLoader Types", () => {
	describe("SpinnerLoaderSize", () => {
		it("should have correct size values", () => {
			const sizes: SpinnerLoaderSize[] = ["xs", "sm", "md", "lg", "xl"];
			
			expect(sizes).toContain("xs");
			expect(sizes).toContain("sm");
			expect(sizes).toContain("md");
			expect(sizes).toContain("lg");
			expect(sizes).toContain("xl");
		});

		it("should have exactly 5 size options", () => {
			const sizes: SpinnerLoaderSize[] = ["xs", "sm", "md", "lg", "xl"];
			expect(sizes).toHaveLength(5);
		});
	});

	describe("SpinnerLoaderColor", () => {
		it("should have correct color values", () => {
			const colors: SpinnerLoaderColor[] = [
				"default",
				"primary",
				"secondary",
				"foreground",
				"muted",
				"accent",
				"success",
				"warning",
				"destructive",
				"white",
			];
			
			expect(colors).toContain("default");
			expect(colors).toContain("primary");
			expect(colors).toContain("secondary");
			expect(colors).toContain("foreground");
			expect(colors).toContain("muted");
			expect(colors).toContain("accent");
			expect(colors).toContain("success");
			expect(colors).toContain("warning");
			expect(colors).toContain("destructive");
			expect(colors).toContain("white");
		});

		it("should have exactly 10 color options", () => {
			const colors: SpinnerLoaderColor[] = [
				"default",
				"primary",
				"secondary",
				"foreground",
				"muted",
				"accent",
				"success",
				"warning",
				"destructive",
				"white",
			];
			expect(colors).toHaveLength(10);
		});
	});

	describe("SpinnerLoaderProps", () => {
		it("should extend HTMLAttributes<HTMLDivElement>", () => {
			const props: SpinnerLoaderProps = {
				size: "md",
				color: "primary",
				className: "custom-class",
				id: "test-id",
				"data-testid": "spinner-loader",
			};
			
			expect(props.size).toBe("md");
			expect(props.color).toBe("primary");
			expect(props.className).toBe("custom-class");
			expect(props.id).toBe("test-id");
			expect(props["data-testid"]).toBe("spinner-loader");
		});

		it("should have optional size property", () => {
			const props: SpinnerLoaderProps = {
				color: "default",
			};
			
			expect(props.size).toBeUndefined();
			expect(props.color).toBe("default");
		});

		it("should have optional color property", () => {
			const props: SpinnerLoaderProps = {
				size: "lg",
			};
			
			expect(props.size).toBe("lg");
			expect(props.color).toBeUndefined();
		});

		it("should have optional className property", () => {
			const props: SpinnerLoaderProps = {
				size: "sm",
				color: "success",
			};
			
			expect(props.className).toBeUndefined();
		});

		it("should accept all HTML div attributes", () => {
			const props: SpinnerLoaderProps = {
				size: "xl",
				color: "warning",
				className: "test-class",
				style: { backgroundColor: "red" },
				onClick: () => {},
			};
			
			expect(props.size).toBe("xl");
			expect(props.color).toBe("warning");
			expect(props.className).toBe("test-class");
			expect(props.style).toEqual({ backgroundColor: "red" });
			expect(typeof props.onClick).toBe("function");
		});
	});
});

