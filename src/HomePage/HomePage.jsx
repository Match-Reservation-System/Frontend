import { CssBaseline, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { LazyLoading } from "../LazyLoading/LazyLoading";
import NavBar from "../UtilsComponents/NavBar";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return loading ? (
    <LazyLoading />
  ) : (
    <Grid
      container
      spacing={0}
      sx={{
        flexDirection: "column",
        paddingBottom: "50px",
      }}
    >
      <Grid item>
        <NavBar />
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          name="welcome-video"
          src="/welcome-video.mp4"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            height: "auto",
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          height: "700px",
          overflow: "hidden",
          marginTop: "25px",
        }}
      >
        <img
          src="/card1.png"
          alt="card1"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            height: "auto",
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          height: "700px",
          marginTop: "25px",
        }}
      >
        <img
          src="/card2.png"
          alt="card1"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            height: "auto",
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          height: "700px",
          overflow: "hidden",
          marginTop: "25px",
        }}
      >
        <img
          src="/card3.png"
          alt="card1"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            height: "auto",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HomePage;
