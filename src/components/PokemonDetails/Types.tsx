import { ListItem, Grid, Typography, Card, CardContent } from "@mui/material";
import { Pokemon } from "classes/PokemonData";

const Types = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Card variant="outlined">
      <CardContent>
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
              <ListItem
                disablePadding
                key={i}
                alignItems="center"
                sx={{ display: "flex", justifyContent: "center", flex: 1 }}
              >
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
      </CardContent>
    </Card>
  );
};
export default Types;
