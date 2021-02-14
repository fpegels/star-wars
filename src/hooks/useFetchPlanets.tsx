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
  const productsStore = useContext(DataStateContext);
  if (!productsStore) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("You have forgot to use StoreProvider, shame on you.");
  }
  return productsStore;
};
