import { Outlet } from "react-router-dom";
import Navigation from "../components/common/Navigation";

export const MainLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navigation />
			<main className="max-w-7xl px-4 mx-auto py-6 sm:px-6 lg:px-8">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
