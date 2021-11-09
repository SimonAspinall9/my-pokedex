import { styled, alpha } from "@mui/material/styles";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControlLabel,
  Switch,
  Link,
  Typography,
  Toolbar,
  AppBar,
  Box,
  InputBase,
} from "@mui/material";
import { Context } from "../GlobalState/Store";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }} marginBottom={2}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
            <Link href="/" color="#fff" underline="none">
              My Pokedex
            </Link>
          </Typography>
          <FormControlLabel
            control={
              <Switch
                aria-label="Dream World Enabled"
                color="secondary"
                onChange={() => {
                  dispatch({
                    type: "SET_DREAM_WORLD",
                    payload: !state.useDreamWorldSprites,
                  });
                }}
              />
            }
            label="Enable Dream World Sprites"
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value });
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
