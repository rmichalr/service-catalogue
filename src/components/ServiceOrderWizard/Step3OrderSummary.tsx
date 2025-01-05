import { useWizard } from "../../contexts/WizardContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateOrder } from "../../lib/orderWizardValidations";

const Step3OrderSummary = () => {
	const { state, dispatch } = useWizard();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleBack = () => {
		dispatch({ type: "SET_CURRENT_STEP", payload: 2 });
	};

	const handleSubmit = async () => {
		// Validate the entire order before submission
		const validationResult = validateOrder({
			selectedService: state.selectedService,
			ownerDetails: state.ownerDetails,
			costDetails: state.costDetails,
		});

		if (!validationResult.success) {
			console.error("Validation errors:", validationResult.errors);
			setError(
				Object.values(validationResult.errors || {}).join(", ") ||
					"Please check your order details and try again."
			);
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setShowSuccess(true);

			// Reset form after 3 seconds and redirect
			setTimeout(() => {
				dispatch({ type: "RESET_WIZARD" });
				navigate("/");
			}, 3000);
		} catch (error) {
			console.error("Error submitting order:", error);
			setError("Failed to submit order. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (showSuccess) {
		return (
			<div className="rounded-md bg-green-50 p-4">
				<div className="flex">
					<div className="ml-3">
						<h3 className="text-sm font-medium text-green-800">
							Order submitted successfully!
						</h3>
						<div className="mt-2 text-sm text-green-700">
							Redirecting to the service catalogue...
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-semibold text-black">Order Summary</h2>
			{error && (
				<div className="rounded-md bg-red-50 p-4">
					<div className="flex">
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800">
								{error}
							</h3>
						</div>
					</div>
				</div>
			)}
			<div className="rounded-lg bg-gray-50 p-6 shadow">
				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-medium text-gray-900">
							Service Details
						</h3>
						<dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
							<div>
								<dt className="text-sm font-medium text-gray-500">
									Service Name
								</dt>
								<dd className="mt-1 text-sm text-gray-900">
									{state.selectedService?.name || "N/A"}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-gray-500">
									Price
								</dt>
								<dd className="mt-1 text-sm text-gray-900">
									{state.selectedService?.price || "N/A"}
								</dd>
							</div>
						</dl>
					</div>

					<div>
						<h3 className="text-lg font-medium text-gray-900">
							Owner Details
						</h3>
						<dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
							<div>
								<dt className="text-sm font-medium text-gray-500">
									Owner Name
								</dt>
								<dd className="mt-1 text-sm text-gray-900">
									{state.ownerDetails.ownerName}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-gray-500">
									Provisioning Date
								</dt>
								<dd className="mt-1 text-sm text-gray-900">
									{new Date(
										state.ownerDetails.provisioningDate
									).toLocaleDateString()}
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-gray-500">
									Decommissioning Date
								</dt>
								<dd className="mt-1 text-sm text-gray-900">
									{new Date(
										state.ownerDetails.decommissioningDate
									).toLocaleDateString()}
								</dd>
							</div>
						</dl>
					</div>

					{state.costDetails.additionalNotes && (
						<div>
							<h3 className="text-lg font-medium text-gray-900">
								Additional Notes
							</h3>
							<p className="mt-2 text-sm text-gray-600">
								{state.costDetails.additionalNotes}
							</p>
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					onClick={handleBack}
					className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					disabled={isSubmitting}
				>
					Previous Step
				</button>
				<button
					type="button"
					onClick={handleSubmit}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit Order"}
				</button>
			</div>
		</div>
	);
};

export default Step3OrderSummary;
