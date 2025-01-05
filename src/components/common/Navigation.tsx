import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
	const location = useLocation();

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link
								to="/"
								className="text-xl font-bold text-gray-800"
							>
								Service catalogue
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link
								to="/"
								className={`${
									isActive("/")
										? "border-primary-500 text-gray-900"
										: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
								} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
							>
								Services
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;