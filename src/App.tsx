import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPage from "components/Pokemon";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const App = () => {
  const [useDreamWorld, setUseDreamWorld] = useState(false);
  const [searchText, setSearchText] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7D78A3",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
