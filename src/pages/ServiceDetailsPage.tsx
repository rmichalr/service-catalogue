import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/data";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function ServiceDetailsPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const service = services.find((s) => s.id === Number(id));

	if (!service) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold mb-4">Service not found</h1>
				<Button onClick={() => navigate("/")} variant="outline">
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalogue
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<Card className="max-w-2xl mx-auto">
				<CardHeader className="text-black">
					<CardTitle className="text-2xl">{service.name}</CardTitle>
					<p className="text-muted-foreground">
						{service.shortDescription}
					</p>
				</CardHeader>
				<CardContent className="text-black">
					<div className="space-y-4">
						<div>
							<h3 className="font-medium mb-2">
								Detailed Description
							</h3>
							<p className="text-muted-foreground">
								{service.detailedDescription}
							</p>
						</div>
						<div>
							<h3 className="font-medium mb-2">Price</h3>
							<p className="text-2xl font-bold text-blue-600">
								{service.price}
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button onClick={() => navigate("/")} variant="outline">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalogue
					</Button>
					<Button
						onClick={() => navigate(`/service/${id}/order`)}
						className="bg-blue-500 hover:bg-blue-700"
						variant="default"
					>
						<ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
