import { z } from "zod";
import { priceStringSchema } from "./validations";

// Selected Service schema
export const selectedServiceSchema = z.object({
	id: z.number().positive("Service ID must be a positive number"),
	name: z.string().min(1, "Service name is required"),
	price: priceStringSchema,
});

// Owner Details schema
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

export const ownerDetailsSchema = z
	.object({
		ownerName: z
			.string()
			.min(2, "Owner name must be at least 2 characters")
			.max(100, "Owner name must not exceed 100 characters")
			.regex(
				/^[a-zA-Z\s'-]+$/,
				"Owner name can only contain letters, spaces, hyphens and apostrophes"
			),

		provisioningDate: z.string().refine((date) => {
			const inputDate = new Date(date);
			inputDate.setHours(0, 0, 0, 0);
			return inputDate >= currentDate;
		}, "Provisioning date must be today or in the future"),

		decommissioningDate: z.string().refine((date) => {
			const inputDate = new Date(date);
			inputDate.setHours(0, 0, 0, 0);
			return inputDate >= currentDate;
		}, "Decommissioning date must be today or in the future"),
	})
	.refine(
		(data) => {
			const provisioningDate = new Date(data.provisioningDate);
			const decommissioningDate = new Date(data.decommissioningDate);
			return decommissioningDate > provisioningDate;
		},
		{
			message: "Decommissioning date must be after provisioning date",
			path: ["decommissioningDate"], // This will show the error on the decommissioning date field
		}
	);

// Cost Details schema
export const costDetailsSchema = z.object({
	additionalNotes: z
		.string()
		.max(500, "Additional notes must not exceed 500 characters")
		.optional()
		.default(""),
});

// Complete Order schema
export const orderSchema = z.object({
	selectedService: selectedServiceSchema,
	ownerDetails: ownerDetailsSchema,
	costDetails: costDetailsSchema,
});

// Helper function to validate owner details
export const validateOwnerDetails = (data: unknown) => {
	try {
		ownerDetailsSchema.parse(data);
		return { success: true, errors: null };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.errors.reduce(
				(acc: Record<string, string>, curr) => {
					// Get the last part of the path array as the field name
					const field = curr.path[curr.path.length - 1] as string;
					acc[field] = curr.message;
					return acc;
				},
				{}
			);
			return { success: false, errors };
		}
		return { success: false, errors: { form: "Validation failed" } };
	}
};

// Helper function to validate cost details
export const validateCostDetails = (data: unknown) => {
	try {
		costDetailsSchema.parse(data);
		return { success: true, errors: null };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.errors.reduce(
				(acc: Record<string, string>, curr) => {
					const field = curr.path[curr.path.length - 1] as string;
					acc[field] = curr.message;
					return acc;
				},
				{}
			);
			return { success: false, errors };
		}
		return { success: false, errors: { form: "Validation failed" } };
	}
};

// Helper function to validate complete order
export const validateOrder = (data: unknown) => {
	try {
		orderSchema.parse(data);
		return { success: true, errors: null };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.errors.reduce(
				(acc: Record<string, string>, curr) => {
					const field = curr.path.join("."); // Creates dot notation for nested fields
					acc[field] = curr.message;
					return acc;
				},
				{}
			);
			return { success: false, errors };
		}
		return { success: false, errors: { form: "Order validation failed" } };
	}
};

// Type inference from schemas
export type SelectedService = z.infer<typeof selectedServiceSchema>;
export type OwnerDetails = z.infer<typeof ownerDetailsSchema>;
export type CostDetails = z.infer<typeof costDetailsSchema>;
export type Order = z.infer<typeof orderSchema>;
