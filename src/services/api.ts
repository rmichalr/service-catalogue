import { services } from "../data/data";
import {
	Service,
	serviceSchema,
	servicesArraySchema,
	searchQuerySchema,
	priceRangeSchema,
	extractPriceValue,
} from "../lib/validations";

// Simulating API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Custom error class for validation errors
export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

export const api = {
	/**
	 * Fetch all available services
	 * @returns Promise<Service[]>
	 */
	getAllServices: async (): Promise<Service[]> => {
		await delay(500);

		// Validate all services against the schema
		const result = servicesArraySchema.safeParse(services);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return result.data;
	},

	/**
	 * Get a specific service by ID
	 * @param id - The ID of the service to fetch
	 * @returns Promise<Service | undefined>
	 */
	getServiceById: async (id: number): Promise<Service | undefined> => {
		await delay(300);

		const service = services.find((service) => service.id === id);
		if (!service) return undefined;

		// Validate the found service
		const result = serviceSchema.safeParse(service);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return result.data;
	},

	/**
	 * Search services by name or description
	 * @param query - Search query string
	 * @returns Promise<Service[]>
	 */
	searchServices: async (query: string): Promise<Service[]> => {
		await delay(400);

		// Validate search query
		const queryResult = searchQuerySchema.safeParse(query);
		if (!queryResult.success) {
			throw new ValidationError(queryResult.error.message);
		}

		const searchTerm = queryResult.data!.toLowerCase();
		const filteredServices = services.filter(
			(service) =>
				service.name.toLowerCase().includes(searchTerm) ||
				service.shortDescription.toLowerCase().includes(searchTerm) ||
				service.detailedDescription.toLowerCase().includes(searchTerm)
		);

		// Validate filtered services
		const result = servicesArraySchema.safeParse(filteredServices);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return result.data;
	},

	/**
	 * Get services by price range
	 * @param priceRange - Object containing min and max price values
	 * @returns Promise<Service[]>
	 */
	getServicesByPriceRange: async ({
		min,
		max,
	}: {
		min: number;
		max: number;
	}): Promise<Service[]> => {
		await delay(300);

		// Validate price range
		const rangeResult = priceRangeSchema.safeParse({ min, max });
		if (!rangeResult.success) {
			throw new ValidationError(rangeResult.error.message);
		}

		const filteredServices = services.filter((service) => {
			const priceValue = extractPriceValue(service.price);
			return priceValue >= min && priceValue <= max;
		});

		// Validate filtered services
		const result = servicesArraySchema.safeParse(filteredServices);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return result.data;
	},

	/**
	 * Add a new service (mock implementation)
	 * @param service - New service data without ID
	 * @returns Promise<Service>
	 */
	addService: async (serviceData: Omit<Service, "id">): Promise<Service> => {
		await delay(600);

		const newService = {
			...serviceData,
			id: Math.max(...services.map((s) => s.id)) + 1,
		};

		// Validate new service
		const result = serviceSchema.safeParse(newService);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return result.data;
	},
};
