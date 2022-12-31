import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CenteredItem from "../UtilsComponents/CenteredItem";
import "./error.css";

export const Error = ({ message }) => {
  return (
    <Grid container justifyContent="center" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CenteredItem
          style={{
            backgroundColor: "transparent",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <img
            src="../warning.png"
            alt="Signupbg"
            width="100px"
            height="100px"
          />

          <h1>{message}</h1>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b61c4a",

              ":hover": {
                backgroundColor: "#b61c4a",
              },
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Home This Way
            </Link>
          </Button>
          <img
            src="../next.svg"
            alt="next"
            width="40px"
            height="40px"
            style={{ marginLeft: "5px", marginTop: "2%" }}
            className="next"
          />
        </CenteredItem>
      </Grid>
    </Grid>
  );
};
