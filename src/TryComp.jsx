import { CssBaseline, Typography, Container, Grid } from "@mui/material";

const TryComp = () => {
  return (
    <>
      <CssBaseline>
        <Container>
          <Grid
            container
            sx={{ backgroundColor: "blue" }}
            justifyContent={"center"}
            spacing={10}
            alignItems={"center"}
          >
            <Grid item>
              <Typography variant="h1" color="initial" align="center">
                hello
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h1" color="initial" align="center">
                hello
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </>
  );
};

export default TryComp;
