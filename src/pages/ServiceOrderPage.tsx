import { ServiceOrderWizard } from "../components/ServiceOrderWizard";
import { WizardProvider } from "../contexts/WizardContext";

const ServiceOrderPage = () => {
	return (
		<WizardProvider>
			<ServiceOrderWizard />
		</WizardProvider>
	);
};

export default ServiceOrderPage;
