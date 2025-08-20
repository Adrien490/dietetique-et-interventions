import {
	FAQ_ITEMS,
	type FAQItem,
} from "@/app/(marketing)/components/faq/faq-items";

describe("FAQ Items", () => {
	describe("FAQ_ITEMS constant", () => {
		it("should be an array", () => {
			expect(Array.isArray(FAQ_ITEMS)).toBe(true);
		});

		it("should not be empty", () => {
			expect(FAQ_ITEMS.length).toBeGreaterThan(0);
		});

		it("should have at least 7 items", () => {
			expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(7);
		});

		it("should have all items with required structure", () => {
			FAQ_ITEMS.forEach((item, index) => {
				expect(item).toHaveProperty("id");
				expect(item).toHaveProperty("question");
				expect(item).toHaveProperty("answer");

				expect(typeof item.id).toBe("string");
				expect(typeof item.question).toBe("string");
				expect(Array.isArray(item.answer)).toBe(true);

				expect(item.id).toBeTruthy();
				expect(item.question).toBeTruthy();
				expect(item.answer.length).toBeGreaterThan(0);

				// Check that all answers are strings
				item.answer.forEach((answer, answerIndex) => {
					expect(typeof answer).toBe("string");
					expect(answer).toBeTruthy();
				});
			});
		});

		it("should have unique IDs", () => {
			const ids = FAQ_ITEMS.map((item) => item.id);
			const uniqueIds = [...new Set(ids)];
			expect(ids.length).toBe(uniqueIds.length);
		});

		it("should have meaningful questions", () => {
			FAQ_ITEMS.forEach((item) => {
				expect(item.question.length).toBeGreaterThan(10);
				// Most questions should end with question mark, but some may have additional text in parentheses
				expect(item.question).toMatch(/\?/); // Should contain a question mark
			});
		});

		it("should have meaningful answers", () => {
			FAQ_ITEMS.forEach((item) => {
				item.answer.forEach((answer) => {
					expect(answer.length).toBeGreaterThan(10);
				});
			});
		});
	});

	describe("Specific FAQ content", () => {
		it("should contain expected questions about dietitian profession", () => {
			const questions = FAQ_ITEMS.map((item) => item.question.toLowerCase());

			// Should have questions about the profession
			expect(
				questions.some(
					(q) => q.includes("diététicien") || q.includes("nutritionniste")
				)
			).toBe(true);

			// Should have questions about consultations
			expect(questions.some((q) => q.includes("consultation"))).toBe(true);

			// Should have questions about reimbursement
			expect(
				questions.some(
					(q) => q.includes("remboursé") || q.includes("remboursement")
				)
			).toBe(true);
		});

		it("should have the first item about dietitian vs nutritionist", () => {
			expect(FAQ_ITEMS[0].id).toBe("item-1");
			expect(FAQ_ITEMS[0].question.toLowerCase()).toContain("diététicien");
			expect(FAQ_ITEMS[0].question.toLowerCase()).toContain("nutritionniste");
		});

		it("should provide comprehensive answers", () => {
			// Each item should have at least one answer
			FAQ_ITEMS.forEach((item) => {
				expect(item.answer.length).toBeGreaterThanOrEqual(1);
			});

			// Some items should have multiple answer points
			const multipleAnswers = FAQ_ITEMS.filter(
				(item) => item.answer.length > 1
			);
			expect(multipleAnswers.length).toBeGreaterThan(0);
		});
	});

	describe("FAQItem interface", () => {
		it("should match the expected structure", () => {
			const mockItem: FAQItem = {
				id: "test-id",
				question: "Test question?",
				answer: ["Test answer"],
			};

			expect(mockItem.id).toBe("test-id");
			expect(mockItem.question).toBe("Test question?");
			expect(mockItem.answer).toEqual(["Test answer"]);
		});
	});

	describe("Data consistency", () => {
		it("should have consistent ID format", () => {
			FAQ_ITEMS.forEach((item) => {
				expect(item.id).toMatch(/^item-\d+$/);
			});
		});

		it("should have sequential IDs", () => {
			FAQ_ITEMS.forEach((item, index) => {
				expect(item.id).toBe(`item-${index + 1}`);
			});
		});

		it("should not have empty strings in answers", () => {
			FAQ_ITEMS.forEach((item) => {
				item.answer.forEach((answer) => {
					expect(answer.trim()).toBeTruthy();
				});
			});
		});

		it("should have proper French content", () => {
			FAQ_ITEMS.forEach((item) => {
				// Should contain French text patterns
				const allText = [item.question, ...item.answer].join(" ");

				// Check for common French words/patterns
				const frenchPatterns = [
					/\b(le|la|les|un|une|des|du|de|et|à|avec|pour|dans|sur)\b/i,
					/\b(est|sont|peut|peuvent|doit|doivent)\b/i,
				];

				const hasFrenchPattern = frenchPatterns.some((pattern) =>
					pattern.test(allText)
				);
				expect(hasFrenchPattern).toBe(true);
			});
		});
	});
});
