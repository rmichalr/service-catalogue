import React, { useState, useEffect } from "react";
import { Service, searchQuerySchema } from "../../lib/validations";
import { api, ValidationError } from "../../services/api";
import ServiceCard from "./ServiceCard";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceGridProps {
	searchQuery?: string;
}

const ITEMS_PER_PAGE = 6;

const ServiceGrid: React.FC<ServiceGridProps> = ({ searchQuery = "" }) => {
	const [page, setPage] = useState(1);
	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				setLoading(true);
				setError(null);

				// Validate search query
				const queryResult = searchQuerySchema.safeParse(searchQuery);
				if (!queryResult.success) {
					setError(queryResult.error.issues.map((issue) => issue.message).join(', '));
					return;
				}

				const results = queryResult.data
					? await api.searchServices(queryResult.data)
					: await api.getAllServices();

				setServices(results);
			} catch (err) {
				if (err instanceof ValidationError) {
					setError(err.message);
				} else {
					setError('Failed to fetch services');
					console.error('Error fetching services:', err);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchServices();
	}, [searchQuery]);

	useEffect(() => {
		setPage(1);
	}, [searchQuery]);

	if (loading) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-600">Loading services...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-600">{error}</p>
			</div>
		);
	}

	if (services.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-600">No services found.</p>
			</div>
		);
	}

	const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
	const startIndex = (page - 1) * ITEMS_PER_PAGE;
	const paginatedServices = services.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	);

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{paginatedServices.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2">
					<Button
						variant="outline"
						className="hover:bg-gray-600"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous page</span>
					</Button>
					<span className="text-sm text-gray-600">
						Page {page} of {totalPages}
					</span>
					<Button
						variant="outline"
						className="hover:bg-gray-600"
						onClick={() =>
							setPage((p) => Math.min(totalPages, p + 1))
						}
						disabled={page === totalPages}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Next page</span>
					</Button>
				</div>
			)}
		</div>
	);
};

export default ServiceGrid;