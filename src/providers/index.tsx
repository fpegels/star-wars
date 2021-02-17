import { BrowserRouter } from "react-router-dom";
import { PlanetsProvider } from "../hooks/usePlanets";

export const Provider: import("react").FunctionComponent = ({ children }) => {
  return (
    <PlanetsProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </PlanetsProvider>
  );
};
