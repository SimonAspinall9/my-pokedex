import { Typography, Grid, ListItem } from "@mui/material";
import { Pokemon } from "classes/PokemonData";

const Abilities = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{ width: "100%", fontWeight: "bold" }}
          textAlign="center"
        >
          Abilities
        </Typography>
      </Grid>
      {pokemon?.abilities.map((a, i) => (
        <Grid item xs={6} key={i}>
          <ListItem>
            <Typography variant="h5" sx={{ width: "100%" }} textAlign="center">
              {a.name}
            </Typography>
          </ListItem>
        </Grid>
      ))}
    </Grid>
  );
};
export default Abilities;
