import { Stack, Grid, Typography } from "@mui/material";
import { Pokemon } from "pokenode-ts";

const Sprites = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h5" textAlign="center">
            Normal
          </Typography>
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.id.toString()}
            style={{ height: 200, width: "fit-content" }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h5" textAlign="center">
            Dream World
          </Typography>
          <img
            src={pokemon?.sprites.other.dream_world.front_default}
            alt={pokemon?.id.toString()}
            style={{ height: 200, width: "fit-content" }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Sprites;
