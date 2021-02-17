import { cast, flow, Instance, types } from "mobx-state-tree";
import { api } from "../api";
import { PlanetType, Planet } from "./Planet";

export const PlanetsStore = types
  .model("PlanetsStore", {
    planets: types.array(Planet),
  })
  .views((self) => ({
    filteredPlanets(filterStr: string) {
      return self.planets.filter((planet) =>
        planet.name.toUpperCase().includes(filterStr.toUpperCase())
      );
    },
  }))
  .actions((self) => ({
    addPlanet(planet: PlanetType) {
      self.planets.push(planet);
    },
  }))
  .actions((self) => ({
    fetchPlanets: flow(function* fetch(
      successCallback?: () => void,
      callbackError?: (value: string) => void,
      callback?: () => void
    ) {
      self.planets.clear();
      try {
        let pageID = 1;

        let fragment: api.Planets.GetPage.Result = yield api.planets.getPage(
          pageID
        );

        while (fragment != null && fragment.next != null) {
          fragment.results.forEach((planet) => self.addPlanet(cast(planet)));
          pageID += 1;
          fragment = yield api.planets.getPage(pageID);
        }

        fragment.results.forEach((planet) => self.addPlanet(cast(planet)));
        if (successCallback) successCallback();
      } catch (error) {
        if (callbackError != null) callbackError(String(error));
      } finally {
        if (callback != null) callback();
      }
    }),
  }));

//@ts-nocheck
export type PlanetsStoreType = Instance<typeof PlanetsStore>;
export const planetsStore = PlanetsStore.create();
