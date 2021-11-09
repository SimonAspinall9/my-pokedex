import { ListItem, Grid, Typography, Card, CardContent } from "@mui/material";
import { Pokemon } from "pokenode-ts";

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
            <Grid item md={6} key={i}>
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
                  {t.type.name}
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
