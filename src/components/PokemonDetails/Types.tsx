import { ListItem, Grid, Typography } from "@mui/material";
import { Pokemon } from "classes/PokemonData";

const Types = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{ width: "100%", fontWeight: "bold" }}
          textAlign="center"
        >
          Types
        </Typography>
      </Grid>
      {pokemon?.types.map((t, i) => (
        <Grid item xs={6}>
          <ListItem disablePadding key={i}>
            <Typography
              variant="h5"
              sx={{ textTransform: "capitalize" }}
              textAlign="center"
            >
              {t.name}
            </Typography>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};
export default Types;
