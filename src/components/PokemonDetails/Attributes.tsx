import { Grid, Typography, Card, CardContent } from "@mui/material";
import { Pokemon } from "pokenode-ts";

const Attributes = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
      }}
    >
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
export default Attributes;
