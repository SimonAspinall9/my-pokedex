import {
  FormControlLabel,
  Switch,
  Link,
  Typography,
  Toolbar,
  AppBar,
  Box,
} from "@mui/material";

const Header = ({ onDreamWorldChange }: { onDreamWorldChange: () => void }) => {
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }} marginBottom={2}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
            <Link href="/" color="#fff" underline="none">
              My Pokedex
            </Link>
          </Typography>
          <FormControlLabel
            control={
              <Switch
                aria-label="Dream World Enabled"
                color="default"
                onChange={onDreamWorldChange}
              />
            }
            label="Enable Dream World Sprites"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
