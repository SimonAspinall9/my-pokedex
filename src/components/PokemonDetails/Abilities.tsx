import { Typography, Grid, ListItem, Card, CardContent } from "@mui/material";
import { Pokemon } from "pokenode-ts";

const Abilities = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
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
              Abilities
            </Typography>
          </Grid>
          {pokemon?.abilities.map((a, i) => (
            <Grid item md={6} key={i}>
              <ListItem>
                <Typography
                  variant="h5"
                  sx={{ width: "100%", textTransform: "capitalize" }}
                >
                  {a.ability.name.replaceAll("-", " ")}
                </Typography>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
export default Abilities;
