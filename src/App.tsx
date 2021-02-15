import { Route, Redirect, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { usePlanetsStore } from "./hooks/useFetchPlanets";
import { Planets, Planet, Resident } from "./screens";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { fetchPlanets } = usePlanetsStore();

  useEffect(() => {
    fetchPlanets(
      () => setIsLoading(false),
      (error) => {
        setIsLoading(false);
        setError(error);
        console.error(error);
      }
    );
  }, [fetchPlanets]);

  if (error !== "") {
    return <div>Ups! There was an Error({error})</div>;
  }

  return (
    <div className="App">
      {isLoading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>We are loading all planets...</p>
        </header>
      ) : (
        <Switch>
          <Route path="/planets/" render={() => <Planets />} />
          <Route
            path="/planet/([A-Za-z0-9]+)/"
            render={({ match }) => {
              return <Planet planetId={match.params[0]} />;
            }}
          />
          <Route
            path="/resident/([A-Za-z0-9]+)/"
            render={({ match }) => {
              return <Resident residentId={match.params[0]} />;
            }}
          />
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/planets/" />;
            }}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
