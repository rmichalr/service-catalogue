import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWizard } from "../../contexts/WizardContext";
import Step1OwnerDetails from "./Step1OwnerDetails";
import Step2CostDetails from "./Step2CostDetails";
import Step3OrderSummary from "./Step3OrderSummary";
import { services } from "../../data/data";

const ServiceOrderWizard = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { state, dispatch } = useWizard();

	useEffect(() => {
		// Find the service and set it in the wizard state
		const service = services.find((s) => s.id === Number(id));
		if (!service) {
			navigate("/");
			return;
		}

		dispatch({
			type: "SET_SELECTED_SERVICE",
			payload: {
				id: service.id,
				name: service.name,
				price: service.price,
			},
		});
	}, [id, navigate, dispatch]);

	const renderStep = () => {
		switch (state.currentStep) {
			case 1:
				return <Step1OwnerDetails />;
			case 2:
				return <Step2CostDetails />;
			case 3:
				return <Step3OrderSummary />;
			default:
				return null;
		}
	};

	return (
		<div className="mx-auto max-w-3xl px-4 py-8">
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold text-black">
						Order Service
					</h1>
					<p className="text-sm text-gray-500">
						Step {state.currentStep} of 3
					</p>
				</div>
				<div className="mt-4">
					<div className="flex items-center">
						<div
							className={`h-2 w-1/3 rounded-l ${
								state.currentStep >= 1
									? "bg-blue-600"
									: "bg-gray-200"
							}`}
						/>
						<div
							className={`h-2 w-1/3 ${
								state.currentStep >= 2
									? "bg-blue-600"
									: "bg-gray-200"
							}`}
						/>
						<div
							className={`h-2 w-1/3 rounded-r ${
								state.currentStep === 3
									? "bg-blue-600"
									: "bg-gray-200"
							}`}
						/>
					</div>
					<div className="mt-2 grid grid-cols-3 text-center text-sm">
						<div
							className={
								state.currentStep >= 1
									? "text-blue-600"
									: "text-gray-500"
							}
						>
							Owner Details
						</div>
						<div
							className={
								state.currentStep >= 2
									? "text-blue-600"
									: "text-gray-500"
							}
						>
							Cost Details
						</div>
						<div
							className={
								state.currentStep === 3
									? "text-blue-600"
									: "text-gray-500"
							}
						>
							Summary
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-lg bg-white p-6 shadow">{renderStep()}</div>
		</div>
	);
};

export default ServiceOrderWizard;
