import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPage from "components/Pokemon";
import { useState } from "react";

const App = () => {
  const [useDreamWorld, setUseDreamWorld] = useState(false);

  return (
    <Router>
      <Header
        onDreamWorldChange={() => {
          setUseDreamWorld(!useDreamWorld);
        }}
      />
      <Switch>
        <Route
          path="/"
          component={() => <PokemonPage useDreamWorld={useDreamWorld} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
