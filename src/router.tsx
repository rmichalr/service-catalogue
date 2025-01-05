import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ServiceOrderPage from "./pages/ServiceOrderPage";
import MainLayout from "./layouts/MainLayout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "service/:id",
				element: <ServiceDetailsPage />,
			},
			{
				path: "service/:id/order",
				element: <ServiceOrderPage />,
			},
			{
				path: "*",
				element: <div>404 - Page Not Found</div>,
			},
		],
	},
]);

export default router;
