import { Response, Result } from "./types";
import { fetchMockConfig } from "../../api";

import fetchMock from "fetch-mock";

export default async function getAll(pageID: number = 1) {
  if (process.env.REACT_APP_MOCK != null) {
    fetchMock.get(
      /\/api\/planets\/\?page=[\d\w]+$/,
      require("./fixture.json"),
      fetchMockConfig()
    );
  }

  const response = await fetch(`https://swapi.dev/api/planets/?page=${pageID}`);

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
    ...response,
    results: response.results.map((planet) => ({
      name: planet.name,
      rotationPeriod: planet.rotation_period,
      orbitalPeriod: planet.orbital_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surfaceWater: planet.surface_water,
      population: planet.population,
      residents: planet.residents,
      films: planet.films,
      created: planet.created,
      edited: planet.edited,
      url: planet.url,
    })),
  };
}
