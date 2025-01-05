import { useState } from "react";
import { ServiceGrid } from "../components/ServiceList";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

export const HomePage = () => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="space-y-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					Our Services
				</h1>
				<p className="mt-2 text-lg text-gray-600">
					Browse through our catalog of professional IT services
				</p>
			</div>

			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
				<Input
					type="text"
					placeholder="Search services..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pl-8 text-black border border-black"
				/>
			</div>

			<ServiceGrid searchQuery={searchQuery} />
		</div>
	);
};

export default HomePage;
