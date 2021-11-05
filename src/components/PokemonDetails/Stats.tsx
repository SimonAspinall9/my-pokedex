import { Grid, Typography } from "@mui/material";
import { Pokemon } from "../../classes/PokemonData";
const Stats = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{ width: "100%", fontWeight: "bold" }}
          textAlign="center"
        >
          Stats
        </Typography>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ width: "100%" }} textAlign="center">
            Stats graph goes here
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Stats;
