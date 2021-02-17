import { Spinner } from "../../DesignSystem/lib/_icons";
import { Link } from "react-router-dom";
import { colors, mediaQuery } from "../../DesignSystem/lib/_theme";

import styled from "@emotion/styled";
import { useEffect, useState, Fragment } from "react";
import { api } from "../../api";
import { Breadcrumb } from "../../DesignSystem/lib";

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
      .then((planet) => {
        setPlanet(planet);
      })
      .catch((error) => {
        console.error(error);
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
        <Fragment>
          <BreadcrumbContainer>
            <Breadcrumb
              links={[{ id: "1", name: "Planets", url: "/planets/" }]}
            />
          </BreadcrumbContainer>

          <Container>
            <DataRow style={{ fontWeight: "bold" }}>
              <small>Planet</small>
              <div>{planet.name}</div>
            </DataRow>
            <DataRow>
              <small>Terrain Type</small>
              <div>{planet.terrain}</div>
            </DataRow>
            <DataRow>
              <small>Climate Type</small>
              <div>{planet.climate}</div>
            </DataRow>
            <DataRow>
              <small>Gravity</small>
              <div>{planet.gravity}</div>
            </DataRow>
            <ResidentsContainer>
              <small>List of residents</small>
              {planet.residents.map((resident, index) => (
                <Resident
                  key={resident}
                  to={`/resident/${resident.split("/").slice(-2, -1)}`}
                >
                  Resident {index}
                </Resident>
              ))}
            </ResidentsContainer>
          </Container>
        </Fragment>
      )}
    </Grid>
  );
}

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: `2rem auto 2rem`,
  backgroundColor: colors.blueDark,
  minHeight: "100vh",
  justifyItems: "center",

  [mediaQuery.desktop]: {
    display: "grid",
    gridTemplateColumns: `auto 940px auto`,
  },
});

const Container = styled.div({
  padding: "2rem 0.4rem",
  display: "grid",
  alignSelf: "center",
  justifyItems: "center",
  gridGap: "2rem",
  backgroundColor: colors.greyMain,
  gridColumnStart: 2,
  gridColumnEnd: 3,
  width: "100%",

  [mediaQuery.desktop]: {
    height: "80vh",
    width: "80vh",
    backgroundColor: "#bbb",
    borderRadius: "50%",
    padding: "4rem",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
});

const SpinnerContainer = styled.div({
  color: colors.white,
  right: "50%",
  bottom: "50%",
  transform: "translate(50%, 50%)",
  position: "absolute",
  fontSize: "6.4rem",
});

const BreadcrumbContainer = styled.div({ position: "absolute" });

const DataRow = styled.div({});

const ResidentsContainer = styled.div({});

const Resident = styled(Link)({ display: "block" });
