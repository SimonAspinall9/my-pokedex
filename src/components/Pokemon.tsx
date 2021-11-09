import { forwardRef, useContext, useEffect, useState } from "react";
import { PokemonClient, Pokemon, NamedAPIResource } from "pokenode-ts";
import LoadingScreen from "./LoadingScreen";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
} from "@mui/material";
import Paging from "./Paging";
import PokemonDetails from "./PokemonDetails/PokemonDetails";
import config from "../config.json";
import PokeCard from "./PokeCard";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Context } from "../GlobalState/Store";

const apiClient = new PokemonClient();

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const PokemonPage = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [countPerPage] = useState(config.countPerPage);

  const [state, dispatch] = useContext(Context);

  const getPokemon = async (offset: number = 0) => {
    console.log(state.pokemonList);
    if (state.pokemonList && state.pokemonList.results) {
      const filteredPokemonList = state.pokemonList.results.slice(
        offset,
        offset + countPerPage
      );

      let pokemon: Pokemon[] = [];
      for (const poke of filteredPokemonList) {
        pokemon.push(await apiClient.getPokemonByName(poke.name));
      }

      dispatch({ type: "SET_POKEMON", payload: pokemon });
    }
  };

  const handleClickOpen = (p: Pokemon) => {
    setOpen(true);
    setSelectedPokemon(p);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNext = async () => {
    if (currentPageNumber < totalPageNumber) {
      setIsLoading(true);
      await getPokemon(currentPageNumber * countPerPage);
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const getPrevious = async () => {
    if (currentPageNumber > 1) {
      setIsLoading(true);
      await getPokemon((currentPageNumber - 2) * countPerPage);
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const searchPokemon = async (searchText: string) => {
    setIsLoading(true);
    if (searchText && searchText.trim() && searchText.length >= 3) {
      const filteredResources = state.pokemonList.results.filter(
        (r: NamedAPIResource) =>
          r.name.toLowerCase().startsWith(searchText) ||
          r.name.toLowerCase().includes(searchText)
            ? r.name
            : null
      );
      setTotalPageNumber(1);
      setCurrentPageNumber(1);
      const filteredPokemon: Pokemon[] = [];
      for (const r of filteredResources) {
        const pokemon = await apiClient.getPokemonByName(r.name);
        filteredPokemon.push(pokemon);
      }

      dispatch({ type: "SET_POKEMON", payload: filteredPokemon });
      return;
    }

    setTotalPageNumber(Math.ceil(state.pokemonList.count / countPerPage));
    setCurrentPageNumber(1);
    getPokemon((currentPageNumber - 1) * countPerPage);
  };

  // useEffect(() => {
  //   const typingDelay = setTimeout(() => {
  //     searchPokemon(state.searchText);
  //   }, 750);

  //   return () => clearTimeout(typingDelay);
  //   // eslint-disable-next-line
  // }, [state.searchText]);

  useEffect(() => {
    setIsLoading(!state.pokemon);
  }, [state.pokemon]);

  useEffect(() => {
    getPokemon();
    setTotalPageNumber(Math.ceil(state.pokemonList?.count / countPerPage));
    // eslint-disable-next-line
  }, [state.pokemonList]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        flex: 1,
        marginX: 2,
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={2}>
        {state.pokemon.map((p: Pokemon) => (
          <Grid item md={3} xs={6} key={p.id}>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                flexWrap: "wrap",
              }}
              alignItems="center"
              justifyContent="space-between"
            >
              <PokeCard pokemon={p} onClick={() => handleClickOpen(p)} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} />
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row",
              flexWrap: "wrap",
              marginBottom: 2,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Paging
              totalPageNumber={totalPageNumber}
              countPerPage={countPerPage}
              currentPageNumber={currentPageNumber}
              onPrevious={getPrevious}
              onNext={getNext}
            />
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ textTransform: "capitalize" }}>
          {`${
            (selectedPokemon?.id.toString().length || 0) < 3
              ? selectedPokemon?.id.toString().padStart(3, "0")
              : selectedPokemon?.id.toString()
          } - ${selectedPokemon?.name}`}
        </DialogTitle>
        <DialogContent>
          <PokemonDetails pokemon={selectedPokemon} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PokemonPage;
