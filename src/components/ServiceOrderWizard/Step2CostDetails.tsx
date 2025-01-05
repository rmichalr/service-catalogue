import { useWizard } from "../../contexts/WizardContext";
import { useState } from "react";
import { validateCostDetails } from "../../lib/orderWizardValidations";

const Step2CostDetails = () => {
	const { state, dispatch } = useWizard();
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newCostDetails = {
			...state.costDetails,
			additionalNotes: e.target.value,
		};

		dispatch({
			type: "SET_COST_DETAILS",
			payload: newCostDetails,
		});

		// Clear error if it exists
		if (errors.additionalNotes) {
			setErrors({});
		}
	};

	const handleNext = () => {
		const validationResult = validateCostDetails(state.costDetails);

		if (validationResult.success) {
			setErrors({});
			dispatch({ type: "SET_CURRENT_STEP", payload: 3 });
		} else {
			setErrors(validationResult.errors || {});
		}
	};

	const handleBack = () => {
		dispatch({ type: "SET_CURRENT_STEP", payload: 1 });
	};

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-semibold text-black">Cost Details</h2>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Service Price
					</label>
					<div className="mt-1 block w-full py-2 text-black">
						{state.selectedService?.price || "N/A"}
					</div>
				</div>

				<div>
					<label
						htmlFor="additionalNotes"
						className="block text-sm font-medium text-gray-700"
					>
						Additional Notes
					</label>
					<textarea
						id="additionalNotes"
						rows={4}
						value={state.costDetails.additionalNotes}
						onChange={handleInputChange}
						className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
							errors.additionalNotes ? "border-red-500" : ""
						}`}
						placeholder="Enter any additional requirements or notes..."
					/>
					{errors.additionalNotes && (
						<p className="mt-1 text-sm text-red-600">
							{errors.additionalNotes}
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					onClick={handleBack}
					className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				>
					Previous Step
				</button>
				<button
					type="button"
					onClick={handleNext}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Next Step
				</button>
			</div>
		</div>
	);
};

export default Step2CostDetails;
