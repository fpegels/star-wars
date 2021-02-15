import { Spinner } from "../../DesignSystem/lib/_icons";
import { Link } from "react-router-dom";
import { colors, mediaQuery } from "../../DesignSystem/lib/_theme";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
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
          {console.log("plan", planet)}
          <div>
            <Breadcrumb
              links={[{ id: "1", name: "Planets", url: "/planets/" }]}
            />
            <div>{planet.name}</div>
          </div>

          <div style={{ overflow: "auto" }}>
            {planet.residents.map((resident, index) => (
              <div key={resident}>
                <StyledLink
                  to={`/resident/${resident.split("/").slice(-2, -1)}`}
                >
                  Resident {index}
                </StyledLink>
              </div>
            ))}
          </div>
        </Container>
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

const StyledLink = styled(Link)({
  color: colors.greyDark,
  backgroundColor: colors.white,
  marginBottom: "0.4rem",
  padding: "0.4rem",
  textAlign: "center",
  borderRadius: "0.4rem",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.28)",
  display: "grid",
  textDecoration: "none",

  [mediaQuery.desktop]: {
    minWidth: "10rem",
  },

  "&:hover": {
    fontWeight: "bold",
    color: colors.black,
  },
});
