import { BrowserRouter } from "react-router-dom";
import { PlanetsProvider } from "../hooks/useFetchPlanets";

export const Provider: import("react").FunctionComponent = ({ children }) => {
  return (
    <PlanetsProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </PlanetsProvider>
  );
};
