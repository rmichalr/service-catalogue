import { createContext, useContext, useReducer, ReactNode } from "react";

interface WizardState {
	ownerDetails: {
		ownerName: string;
		provisioningDate: string;
		decommissioningDate: string;
	};
	costDetails: {
		price: string;
		additionalNotes: string;
	};
	selectedService: {
		id: number;
		name: string;
		price: string;
	} | null;
	currentStep: number;
}

type WizardAction =
	| { type: "SET_OWNER_DETAILS"; payload: WizardState["ownerDetails"] }
	| { type: "SET_COST_DETAILS"; payload: WizardState["costDetails"] }
	| { type: "SET_SELECTED_SERVICE"; payload: WizardState["selectedService"] }
	| { type: "SET_CURRENT_STEP"; payload: number }
	| { type: "RESET_WIZARD" };

const initialState: WizardState = {
	ownerDetails: {
		ownerName: "",
		provisioningDate: "",
		decommissioningDate: "",
	},
	costDetails: {
		price: "",
		additionalNotes: "",
	},
	selectedService: null,
	currentStep: 1,
};

const wizardReducer = (
	state: WizardState,
	action: WizardAction
): WizardState => {
	switch (action.type) {
		case "SET_OWNER_DETAILS":
			return { ...state, ownerDetails: action.payload };
		case "SET_COST_DETAILS":
			return { ...state, costDetails: action.payload };
		case "SET_SELECTED_SERVICE":
			return { ...state, selectedService: action.payload };
		case "SET_CURRENT_STEP":
			return { ...state, currentStep: action.payload };
		case "RESET_WIZARD":
			return initialState;
		default:
			return state;
	}
};

const WizardContext = createContext<{
	state: WizardState;
	dispatch: React.Dispatch<WizardAction>;
} | null>(null);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(wizardReducer, initialState);

	return (
		<WizardContext.Provider value={{ state, dispatch }}>
			{children}
		</WizardContext.Provider>
	);
};

export const useWizard = () => {
	const context = useContext(WizardContext);
	if (!context) {
		throw new Error("useWizard must be used within a WizardProvider");
	}
	return context;
};
