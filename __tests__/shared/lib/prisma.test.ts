import { prisma } from "@/shared/lib/prisma";

// Mock Prisma
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

describe("Prisma Client", () => {
  it("should export prisma client", () => {
    expect(prisma).toBeDefined();
  });

  it("should have prisma client methods", () => {
    expect(typeof prisma.$connect).toBe("function");
    expect(typeof prisma.$disconnect).toBe("function");
  });
});

