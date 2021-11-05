import { Stack, Grid, Typography } from "@mui/material";
import { Pokemon } from "classes/PokemonData";

const Sprites = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack>
          <Typography variant="h5" textAlign="center">
            Normal
          </Typography>
          <img
            src={pokemon?.spriteUrl}
            alt={pokemon?.id.toString()}
            style={{ width: "100%" }}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack>
          <Typography variant="h5" textAlign="center">
            Dream World
          </Typography>
          <img
            src={pokemon?.dreamWorldSpriteUrl}
            alt={pokemon?.id.toString()}
            style={{ width: "100%" }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Sprites;
