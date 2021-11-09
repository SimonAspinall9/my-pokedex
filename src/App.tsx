import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPage from "components/Pokemon";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { useContext, useMemo } from "react";
import { PokemonClient } from "pokenode-ts";
import { Context } from "./GlobalState/Store";

const apiClient = new PokemonClient();

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7D78A3",
      },
      secondary: {
        main: "#F1B2AC",
      },
      warning: {
        main: "#A29CBB",
      },
      background: {
        default: "#A29CBB",
      },
    },
  });

  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context);

  const getPokemonList = async () => {
    const pokemonList = await apiClient.listPokemons(0, 3000);
    dispatch({ type: "SET_POKEMON_LIST", payload: pokemonList });
  };

  useMemo(() => {
    getPokemonList();
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={PokemonPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
