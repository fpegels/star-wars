import { Response, Result } from "./types";
import { fetchMockConfig } from "../api";

import fetchMock from "fetch-mock";

export async function get(residentID: string) {
  if (process.env.REACT_APP_MOCK != null) {
    fetchMock.get(
      /\/api\/people\/[\d\w]+\/$/,
      require("./fixture.json"),
      fetchMockConfig()
    );
  }

  const response = await fetch(`https://swapi.dev/api/people/${residentID}/`);

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
    height: response.height,
    mass: response.mass,
    hairColor: response.hair_color,
    skinColor: response.skin_color,
    eyeColor: response.eye_color,
    birthYear: response.birth_year,
    gender: response.gender,
    homeworld: response.homeworld,
    films: response.films,
    species: response.species,
    vehicles: response.vehicles,
    starships: response.starships,
    created: response.created,
    edited: response.edited,
    url: response.url,
  };
}
