import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  PokemonClient,
  Pokemon,
  NamedAPIResourceList,
  NamedAPIResource,
} from "pokenode-ts";
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

const apiClient = new PokemonClient();

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const PokemonPage = ({ useDreamWorld }: { useDreamWorld: boolean }) => {
  const [pokemonList, setPokemonList] = useState<NamedAPIResourceList>();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const getPokemonList = async (offset: number = 0) => {
    const pokemonList = await apiClient.listPokemons(
      offset,
      config.countPerPage
    );
    setPokemonList(pokemonList);
  };

  const getPokemon = async () => {
    let myPokemon: Pokemon[] = [];
    for (const r of pokemonList?.results || []) {
      const myP = await apiClient.getPokemonByName(
        (r as NamedAPIResource).name
      );
      myPokemon.push(myP);
    }

    setPokemon(myPokemon);
  };

  const getPrevious = async () => {
    if (currentPageNumber > 1) {
      setIsLoading(true);
      getPokemonList((currentPageNumber - 2) * config.countPerPage);
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };
  const getNext = async () => {
    if (currentPageNumber < totalPageNumber) {
      setIsLoading(true);
      getPokemonList(currentPageNumber * config.countPerPage);
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  useMemo(() => {
    getPokemonList();
  }, []);

  useEffect(() => {
    setIsLoading(!pokemon);
  }, [pokemon]);

  useEffect(() => {
    if (pokemonList?.results) {
      setTotalPageNumber(Math.ceil(pokemonList.count / config.countPerPage));
      getPokemon();
    }
    // eslint-disable-next-line
  }, [pokemonList]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleClickOpen = (p: Pokemon) => {
    setOpen(true);
    setSelectedPokemon(p);
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
          <PokemonDetails pokemon={selectedPokemon} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PokemonPage;
