import { Grid, Typography } from "@mui/material";
import { Pokemon } from "classes/PokemonData";

const Attributes = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography
          variant="h5"
          sx={{ width: "100%", fontWeight: "bold" }}
          textAlign="center"
        >
          Height
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="h5"
          sx={{ width: "100%", fontWeight: "bold" }}
          textAlign="center"
        >
          Weight
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" sx={{ width: "100%" }} textAlign="center">
          {pokemon?.height}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" sx={{ width: "100%" }} textAlign="center">
          {pokemon?.weight}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Attributes;
