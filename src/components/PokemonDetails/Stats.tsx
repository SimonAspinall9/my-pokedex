import { Grid, Typography, Card, CardContent } from "@mui/material";
import { Pokemon } from "pokenode-ts";
import { Chart } from "react-google-charts";
import LoadingScreen from "../LoadingScreen";

const Stats = ({ pokemon }: { pokemon: Pokemon | undefined }) => {
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
              Stats
            </Typography>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Chart
                width={"100%"}
                height={250}
                style={{ display: "flex", flex: 1 }}
                chartType="BarChart"
                loader={<LoadingScreen />}
                data={[
                  ["Stat", "Value", { role: "style" }],
                  [
                    "HP",
                    pokemon?.stats.find((s) => s.stat.name === "hp")?.base_stat,
                    "stroke-color: #A60000; stroke-width: 1; fill-color: #FF0000",
                  ],
                  [
                    "Attack",
                    pokemon?.stats.find((s) => s.stat.name === "attack")
                      ?.base_stat,
                    "stroke-color: #9C531F; stroke-width: 1; fill-color: #F08030",
                  ],
                  [
                    "Defense",
                    pokemon?.stats.find((s) => s.stat.name === "defense")
                      ?.base_stat,
                    "stroke-color: #A1871F; stroke-width: 1; fill-color: #F8D030",
                  ],
                  [
                    "Sp. Atk",
                    pokemon?.stats.find((s) => s.stat.name === "special-attack")
                      ?.base_stat,
                    "stroke-color: #445E9C; stroke-width: 1; fill-color: #6890F0",
                  ],
                  [
                    "Sp. Def",
                    pokemon?.stats.find(
                      (s) => s.stat.name === "special-defense"
                    )?.base_stat,
                    "stroke-color: #4E8234; stroke-width: 1; fill-color: #78C850",
                  ],
                  [
                    "Speed",
                    pokemon?.stats.find((s) => s.stat.name === "speed")
                      ?.base_stat,
                    "stroke-color: #A13959; stroke-width: 1; fill-color: #F85888",
                  ],
                ]}
                options={{
                  title: "Base Stats",
                  bar: { groupWidth: "85%" },
                  legend: { position: "none" },
                  hAxis: {
                    minValue: 0,
                    maxValue: 255,
                    viewWindow: { max: 260, min: 0 },
                    ticks: [0, 50, 100, 150, 200, 250],
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default Stats;
