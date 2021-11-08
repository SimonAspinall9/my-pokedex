import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPage from "components/Pokemon";
import { useState } from "react";

const App = () => {
  const [useDreamWorld, setUseDreamWorld] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <Router>
      <Header
        onDreamWorldChange={() => {
          setUseDreamWorld(!useDreamWorld);
        }}
        onSearch={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <Switch>
        <Route
          path="/"
          component={() => (
            <PokemonPage
              searchText={searchText}
              useDreamWorld={useDreamWorld}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
