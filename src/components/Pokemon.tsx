import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  getPokemonByName,
  getPokemonData,
  getPokemonNextPrevious,
  PokeApiResults,
  Pokemon,
} from "classes/PokemonData";
import LoadingScreen from "./LoadingScreen";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Stack,
} from "@mui/material";
import Paging from "./Paging";
import config from "../config.json";
import PokeCard from "./PokeCard";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Sprites from "./PokemonDetails/Sprites";
import Types from "./PokemonDetails/Types";
import Abilities from "./PokemonDetails/Abilities";
import Attributes from "./PokemonDetails/Attributes";
import Stats from "./PokemonDetails/Stats";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const PokemonPage = ({ useDreamWorld }: { useDreamWorld: boolean }) => {
  const [pokemonData, setPokemonData] = useState<PokeApiResults>();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const getData = async () => {
    const data = await getPokemonData();
    setPokemonData(data);
    setTotalPageNumber(Math.ceil(data.count / config.countPerPage));
  };

  const getPrevious = async () => {
    if (currentPageNumber > 1 && pokemonData && pokemonData.previous) {
      setIsLoading(true);
      const newData = await getPokemonNextPrevious(pokemonData.previous);
      setPokemonData(newData);
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  const getNext = async () => {
    if (
      currentPageNumber < totalPageNumber &&
      pokemonData &&
      pokemonData.next
    ) {
      setIsLoading(true);
      const newData = await getPokemonNextPrevious(pokemonData.next);
      setPokemonData(newData);
      setCurrentPageNumber(currentPageNumber + 1);
      console.log("going to next");
    }
  };

  const getPokemon = async () => {
    let pokemon: Pokemon[] = [];
    if (pokemonData) {
      for (const item of pokemonData.results) {
        const data = await getPokemonByName(item.name);
        pokemon.push(data);
      }

      setPokemon(pokemon);
    }
  };

  useMemo(() => {
    getData();
  }, []);

  useEffect(() => {
    getPokemon();
    // eslint-disable-next-line
  }, [pokemonData]);

  useEffect(() => {
    setIsLoading(!pokemon || pokemon.length === 0);
  }, [pokemon]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleClickOpen = (p: Pokemon) => {
    setOpen(true);
    setSelectedPokemon(p);
    console.log(p.types);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        {pokemon.map((p) => (
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
              <PokeCard
                pokemon={p}
                useDreamWorld={useDreamWorld}
                onClick={() => handleClickOpen(p)}
              />
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
              countPerPage={config.countPerPage}
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
          <Sprites pokemon={selectedPokemon} />
          <Stack alignItems="center" justifyContent="center">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Types pokemon={selectedPokemon} />
              </Grid>
              <Grid item xs={6}>
                <Abilities pokemon={selectedPokemon} />
              </Grid>
              <Grid item xs={6}></Grid>
              <Attributes pokemon={selectedPokemon} />
              <Stats pokemon={selectedPokemon} />
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PokemonPage;
