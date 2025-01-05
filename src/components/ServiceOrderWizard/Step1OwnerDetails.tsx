import { useWizard } from "../../contexts/WizardContext";
import { useState } from "react";
import { validateOwnerDetails } from "../../lib/orderWizardValidations";

const Step1OwnerDetails = () => {
	const { state, dispatch } = useWizard();
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof typeof state.ownerDetails
	) => {
		const newOwnerDetails = {
			...state.ownerDetails,
			[field]: e.target.value,
		};

		dispatch({
			type: "SET_OWNER_DETAILS",
			payload: newOwnerDetails,
		});

		// Clear error for the field being changed
		if (errors[field]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const handleNext = () => {
		const validationResult = validateOwnerDetails(state.ownerDetails);

		if (validationResult.success) {
			setErrors({});
			dispatch({ type: "SET_CURRENT_STEP", payload: 2 });
		} else {
			setErrors(validationResult.errors || {});
		}
	};

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-semibold text-black">Owner Details</h2>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="ownerName"
						className="block text-sm font-medium text-gray-700"
					>
						Owner Name
					</label>
					<input
						type="text"
						id="ownerName"
						value={state.ownerDetails.ownerName}
						onChange={(e) => handleInputChange(e, "ownerName")}
						className={`mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
							errors.ownerName ? "border-red-500" : ""
						}`}
					/>
					{errors.ownerName && (
						<p className="mt-1 text-sm text-red-600">
							{errors.ownerName}
						</p>
					)}
				</div>
				<div className="flex gap-6 flex-col sm:flex-row">
					<div className="w-full sm:w-1/2 flex flex-col">
						<label
							htmlFor="provisioningDate"
							className="block text-sm font-medium text-gray-700"
						>
							Provisioning Date
						</label>
						<input
							type="date"
							id="provisioningDate"
							value={state.ownerDetails.provisioningDate}
							onChange={(e) =>
								handleInputChange(e, "provisioningDate")
							}
							min={new Date().toISOString().split("T")[0]}
							className={`mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
								errors.provisioningDate ? "border-red-500" : ""
							}`}
						/>
						{errors.provisioningDate && (
							<p className="mt-1 text-sm text-red-600">
								{errors.provisioningDate}
							</p>
						)}
					</div>

					<div className="w-full sm:w-1/2 flex flex-col">
						<label
							htmlFor="decommissioningDate"
							className="block text-sm font-medium text-gray-700"
						>
							Decommissioning Date
						</label>
						<input
							type="date"
							id="decommissioningDate"
							value={state.ownerDetails.decommissioningDate}
							onChange={(e) =>
								handleInputChange(e, "decommissioningDate")
							}
							min={
								state.ownerDetails.provisioningDate ||
								new Date().toISOString().split("T")[0]
							}
							className={`mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
								errors.decommissioningDate
									? "border-red-500"
									: ""
							}`}
						/>
						{errors.decommissioningDate && (
							<p className="mt-1 text-sm text-red-600">
								{errors.decommissioningDate}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					onClick={() => window.history.back()}
					className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				>
					Back to Service
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

export default Step1OwnerDetails;
