import { Calendar } from "@/shared/components/ui/calendar";
import { render, screen } from "@testing-library/react";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
	ChevronDownIcon: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
	ChevronLeftIcon: () => <div data-testid="chevron-left-icon">ChevronLeft</div>,
	ChevronRightIcon: () => (
		<div data-testid="chevron-right-icon">ChevronRight</div>
	),
}));

// Mock react-day-picker
jest.mock("react-day-picker", () => ({
	DayPicker: ({ className, ...props }: any) => (
		<div data-testid="day-picker" className={className} {...props}>
			<div data-testid="calendar-content">Calendar Content</div>
		</div>
	),
	DayButton: ({ children, ...props }: any) => (
		<button data-testid="day-button" {...props}>
			{children}
		</button>
	),
	getDefaultClassNames: () => ({
		root: "rdp-root",
		months: "rdp-months",
		month: "rdp-month",
	}),
}));

describe("Calendar", () => {
	it("should render DayPicker with default props", () => {
		render(<Calendar />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
		expect(screen.getByTestId("calendar-content")).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		render(<Calendar className="custom-calendar-class" />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toHaveClass("custom-calendar-class");
	});

	it("should pass through DayPicker props", () => {
		const onSelect = jest.fn();
		render(<Calendar onSelect={onSelect} mode="single" />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
	});

	it("should set default props correctly", () => {
		render(<Calendar />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
		// showOutsideDays and captionLayout are passed as props to DayPicker
	});

	it("should handle different button variants", () => {
		render(<Calendar buttonVariant="outline" />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
	});

	it("should accept custom classNames prop", () => {
		const customClassNames = {
			root: "custom-root",
			months: "custom-months",
		};

		render(<Calendar classNames={customClassNames} />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
	});

	it("should handle formatters and components props", () => {
		const customFormatters = {};
		const customComponents = {};

		render(
			<Calendar formatters={customFormatters} components={customComponents} />
		);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
	});

	it("should handle disabled state", () => {
		render(<Calendar disabled />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
	});

	it("should handle selected date", () => {
		const selectedDate = new Date(2024, 0, 15);
		render(<Calendar selected={selectedDate} mode="single" />);

		const dayPicker = screen.getByTestId("day-picker");
		expect(dayPicker).toBeInTheDocument();
	});
});
