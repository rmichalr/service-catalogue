import React from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../../data/data";
import { Button } from "../ui/button";
import { Info, ShoppingCart } from "lucide-react";

interface ServiceCardProps {
	service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
	const navigate = useNavigate();

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full">
			<div className="p-6 flex flex-col h-full">
				<h3 className="text-xl font-semibold text-gray-900 mb-2">
					{service.name}
				</h3>
				<p className="text-gray-600 mb-4 flex-grow">
					{service.shortDescription}
				</p>
				<div className="mt-auto">
					<p className="text-lg font-bold text-blue-600 mb-4">
						{service.price}
					</p>
					<div className="flex justify-end gap-2">
						<Button
							variant="outline"
							className="hover:bg-gray-600"
							onClick={() => navigate(`/service/${service.id}`)}
						>
							<Info className="mr-2 h-4 w-4" />
							Details
						</Button>
						<Button
							className="bg-blue-500 hover:bg-blue-700"
							onClick={() =>
								navigate(`/service/${service.id}/order`)
							}
						>
							<ShoppingCart className="mr-2 h-4 w-4" />
							Buy Now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
