import { Spinner } from "../../DesignSystem/lib/_icons";
import { colors } from "../../DesignSystem/lib/_theme";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { api } from "../../api";

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

  useEffect(() => {
    api.residents
      .get(residentId)
      .then((res) => {
        setIsLoading(false);
        setResident(res);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [residentId]);

  return (
    <Grid>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Container>
          <div>{resident.name}</div>
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
