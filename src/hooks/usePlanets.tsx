import { createContext, useContext } from "react";

import { PlanetsStoreType, planetsStore } from "../models/ProductsStore";

const DataStateContext = createContext<PlanetsStoreType | null>(null);

export function PlanetsProvider({ children }: { children: React.ReactNode }) {
  return (
    <DataStateContext.Provider value={planetsStore}>
      {children}
    </DataStateContext.Provider>
  );
}

export const usePlanetsStore = () => {
  const planetsStore = useContext(DataStateContext);
  if (!planetsStore) {
    // this is useful to avoid checking for null planets provider every time
    throw new Error("You need to add a Planets provider");
  }
  return planetsStore;
};
