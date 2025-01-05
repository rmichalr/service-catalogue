import { z } from "zod";

// Price string format validation (e.g., "149 PLN/month")
export const priceStringSchema = z
	.string()
	.regex(/^\d+ PLN\/month$/, "Price must be in format: '123 PLN/month'");

// Service schema
export const serviceSchema = z.object({
	id: z.number().positive("ID must be a positive number"),
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(100, "Name must not exceed 100 characters"),
	shortDescription: z
		.string()
		.min(10, "Short description must be at least 10 characters")
		.max(150, "Short description must not exceed 150 characters"),
	detailedDescription: z
		.string()
		.min(50, "Detailed description must be at least 50 characters")
		.max(1000, "Detailed description must not exceed 1000 characters"),
	price: priceStringSchema,
});

// Array of services schema
export const servicesArraySchema = z.array(serviceSchema);

// Search query schema
export const searchQuerySchema = z
	.string()
	.min(2, "Search query must be at least 2 characters")
	.max(50, "Search query must not exceed 50 characters")
	.optional()
	.or(z.literal(""));

// Price range schema
export const priceRangeSchema = z
	.object({
		min: z.number().min(0, "Minimum price cannot be negative"),
		max: z.number().min(0, "Maximum price cannot be negative"),
	})
	.refine((data) => data.max > data.min, {
		message: "Maximum price must be greater than minimum price",
	});

// Utility function to extract numeric price from price string
export const extractPriceValue = (priceString: string): number => {
	const match = priceString.match(/^(\d+)/);
	return match ? parseInt(match[1]) : 0;
};

// Utility function to format price number to price string
export const formatPrice = (price: number): string => {
	return `${price} PLN/month`;
};

// Type inference from schema
export type Service = z.infer<typeof serviceSchema>;
export type PriceRange = z.infer<typeof priceRangeSchema>;
