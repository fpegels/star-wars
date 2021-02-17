import { Spinner } from "../../DesignSystem/lib/_icons";
import { colors, mediaQuery } from "../../DesignSystem/lib/_theme";

import styled from "@emotion/styled";
import { useEffect, useState, Fragment } from "react";
import { api } from "../../api";
import { Breadcrumb } from "../../DesignSystem/lib";

type PlanetProps = {
  residentId: string;
};

export function Resident({ residentId }: PlanetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [resident, setResident] = useState<api.Residents.Result>({
    name: "",
    height: "",
    mass: "",
    hairColor: "",
    skinColor: "",
    eyeColor: "",
    birthYear: "",
    gender: "",
    homeworld: "",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "",
    edited: "",
    url: "",
  });

  const breadcrumbLinks = [
    { id: "1", name: "Planets", url: "/planets/" },
    {
      id: "2",
      name: "Homeworld",
      url: `/planet/${resident.homeworld.split("/").slice(-2, -1)}`,
    },
  ];

  useEffect(() => {
    api.residents
      .get(residentId)
      .then((resident) => {
        setResident(resident);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [residentId]);

  return (
    <Grid>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Fragment>
          <BreadcrumbContainer>
            <Breadcrumb links={breadcrumbLinks} />
          </BreadcrumbContainer>

          <Container>
            <DataRow style={{ fontWeight: "bold" }}>
              <small>Resident</small>
              <div>{resident.name}</div>
            </DataRow>
            <DataRow>
              <small>Mass</small>
              <div>{resident.mass}kg</div>
            </DataRow>
            <DataRow>
              <small>Gender</small>
              <div>{resident.gender}</div>
            </DataRow>
            <DataRow>
              <small>Eye Color</small>
              <div>{resident.eyeColor}</div>
            </DataRow>
            <DataRow>
              <small>Hair Color</small>
              <div>{resident.hairColor}</div>
            </DataRow>
            <DataRow>
              <small>Skin Color</small>
              <div>{resident.skinColor}</div>
            </DataRow>
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
