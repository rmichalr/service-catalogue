import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { WizardProvider } from "./contexts/WizardContext";

function App() {
	return (
		<WizardProvider>
			<RouterProvider router={router} />
		</WizardProvider>
	);
}

export default App;
