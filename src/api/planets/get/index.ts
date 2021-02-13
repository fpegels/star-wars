import { Response, Result } from "./types";
import { fetchMockConfig } from "../../api";

import fetchMock from "fetch-mock";

export default async function get(planetID: string) {
  if (process.env.REACT_APP_MOCK != null) {
    fetchMock.get(
      /\/api\/planets\/[\d\w]+\/$/,
      require("./fixture.json"),
      fetchMockConfig()
    );
  }

  const response = await fetch(`https://swapi.dev/api/planets/${planetID}/`);

  const data = (await response.json()) as Response;

  try {
    return transformResponse(data);
  } catch (error) {
    console.log(error);
    throw new Error(`API GET PLANET did not respond correctly`);
  }
}

function transformResponse(response: Response): Result {
  return {
    name: response.name,
    rotationPeriod: response.rotation_period,
    orbitalPeriod: response.orbital_period,
    diameter: response.diameter,
    climate: response.climate,
    gravity: response.gravity,
    terrain: response.terrain,
    surfaceWater: response.surface_water,
    population: response.population,
    residents: response.residents,
    films: response.films,
    created: response.created,
    edited: response.edited,
    url: response.url,
  };
}
