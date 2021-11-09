import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPage from "components/Pokemon";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import Store from "./GlobalState/Store";

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

  return (
    <ThemeProvider theme={theme}>
      <Store>
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={PokemonPage} />
          </Switch>
        </Router>
      </Store>
    </ThemeProvider>
  );
};

export default App;
