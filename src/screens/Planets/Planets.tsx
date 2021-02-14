import { Link } from "react-router-dom";

import styled from "@emotion/styled";
import { usePlanetsStore } from "../../hooks/useFetchPlanets";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Paginator } from "../../DesignSystem/lib/Paginator";
import { PlanetType } from "../../models/Planet";

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
    <Container>
      <input
        onChange={onChangeHandler}
        value={filterStr}
        placeholder="...start typing to filter"
      ></input>
      <div>
        {_planets?.map((planet) => (
          <div key={planet.url}>
            <Link to={`/planet/${planet.url.split("/").slice(-2, -1)}`}>
              {planet.name}
            </Link>
          </div>
        ))}
      </div>
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(nbr) => {
          setCurrentPage(nbr);
        }}
      />
    </Container>
  );

  function onChangeHandler(e: import("react").ChangeEvent<HTMLInputElement>) {
    setFilterStr(e.target.value.replace(/[0-9]+/, ""));
  }
});

const Container = styled.div({
  display: "grid",
  gridRowGap: "2rem",
  justifyItems: "center",
});
