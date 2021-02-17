import { Link } from "react-router-dom";

import styled from "@emotion/styled";
import { usePlanetsStore } from "../../hooks/useFetchPlanets";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Paginator } from "../../DesignSystem/lib";
import { PlanetType } from "../../models/Planet";
import { colors, mediaQuery } from "../../DesignSystem/lib/_theme";

export const Planets = observer(function Planets() {
  const [filterStr, setFilterStr] = useState("");
  const { filteredPlanets } = usePlanetsStore();

  const [_planets, _setPlanets] = useState<PlanetType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MAX_PER_PAGE = 10;

  useEffect(() => {
    const filteredAll = filteredPlanets(filterStr);

    setTotalPages(Math.ceil(filteredAll.length / MAX_PER_PAGE));

    const filteredAllperPage = filteredAll.slice(
      (currentPage - 1) * MAX_PER_PAGE,
      MAX_PER_PAGE * currentPage
    );

    _setPlanets(filteredAllperPage);
  }, [filteredPlanets, filterStr, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStr]);

  return (
    <Grid>
      <Container>
        <div>
          <Title>Planets</Title>
          <input
            onChange={onChangeHandler}
            value={filterStr}
            placeholder="Find a Planet..."
          ></input>
        </div>
        <div>
          {_planets?.map((planet) => (
            <div key={planet.url}>
              <StyledLink to={`/planet/${planet.url.split("/").slice(-2, -1)}`}>
                {planet.name}
              </StyledLink>
            </div>
          ))}
        </div>
        <PaginatorContainer>
          {totalPages > 1 && (
            <Paginator
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(nbr) => {
                setCurrentPage(nbr);
              }}
            />
          )}
        </PaginatorContainer>
      </Container>
    </Grid>
  );

  function onChangeHandler(e: import("react").ChangeEvent<HTMLInputElement>) {
    setFilterStr(e.target.value.replace(/[0-9]+/, ""));
  }
});

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
  gridGap: "1.2rem",
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
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const Title = styled.h1({
  marginTop: 0,
  color: colors.blueDark,
});

const PaginatorContainer = styled.div({
  alignSelf: "center",
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
  minWidth: "10rem",

  "&:hover": {
    fontWeight: "bold",
    color: colors.black,
  },
});
