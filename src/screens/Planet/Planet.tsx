import { Spinner } from "../../DesignSystem/lib/_icons";
import { Link } from "react-router-dom";
import { colors } from "../../DesignSystem/lib/_theme";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { api } from "../../api";

type PlanetProps = {
  planetId: string;
};

export function Planet({ planetId }: PlanetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [planet, setPlanet] = useState<api.Planets.Get.Result>({
    name: "",
    rotationPeriod: "",
    orbitalPeriod: "",
    diameter: "",
    climate: "",
    gravity: "",
    terrain: "",
    surfaceWater: "",
    population: "",
    residents: [],
    films: [],
    created: "",
    edited: "",
    url: "",
  });

  useEffect(() => {
    api.planets
      .get(planetId)
      .then((res) => {
        setPlanet(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [planetId]);

  return (
    <Grid>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Container>
          <div>{planet.name}</div>
          {planet.residents.map((resident) => (
            <div key={resident}>
              <Link to={`/resident/${resident.split("/").slice(-2, -1)}`}>
                {resident}
              </Link>
            </div>
          ))}
        </Container>
      )}
    </Grid>
  );
}

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: `auto 940px auto`,
  backgroundColor: colors.greyMain,
  paddingTop: "2.4rem",
  minHeight: "100vh",
});

const SpinnerContainer = styled.div({
  color: colors.greyMain,
  right: "50%",
  bottom: "50%",
  transform: "translate(50%, 50%)",
  position: "absolute",
  fontSize: "6.4rem",
});

const Container = styled.div({
  gridColumnStart: 2,
  gridColumnEnd: 3,
  cursor: "default",
});
