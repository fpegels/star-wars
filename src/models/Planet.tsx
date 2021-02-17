import { Instance, types } from "mobx-state-tree";

export const Planet = types.model("Planet", {
  name: types.optional(types.string, ""),
  rotationPeriod: types.optional(types.string, ""),
  orbitalPeriod: types.optional(types.string, ""),
  diameter: types.optional(types.string, ""),
  climate: types.optional(types.string, ""),
  gravity: types.optional(types.string, ""),
  terrain: types.optional(types.string, ""),
  surfaceWater: types.optional(types.string, ""),
  population: types.optional(types.string, ""),
  residents: types.array(types.optional(types.string, "")),
  films: types.array(types.optional(types.string, "")),
  created: types.optional(types.string, ""),
  edited: types.optional(types.string, ""),
  url: types.optional(types.string, ""),
});

export type PlanetType = Instance<typeof Planet>;
