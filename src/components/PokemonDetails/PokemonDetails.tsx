import { Pokemon } from "pokenode-ts";
import { Stack, Grid } from "@mui/material";
import Abilities from "./Abilities";
import Attributes from "./Attributes";
import Sprites from "./Sprites";
import Stats from "./Stats";
import Types from "./Types";

const PokemonDetails = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Sprites pokemon={pokemon} />
        </Grid>
        <Grid item xs={6}>
          <Types pokemon={pokemon} />
        </Grid>
        <Grid item xs={6}>
          <Abilities pokemon={pokemon} />
        </Grid>
        <Grid item xs={12}>
          <Attributes pokemon={pokemon} />
        </Grid>
        <Grid item xs={12}>
          <Stats pokemon={pokemon} />
        </Grid>
      </Grid>
    </Stack>
  );
};
export default PokemonDetails;
