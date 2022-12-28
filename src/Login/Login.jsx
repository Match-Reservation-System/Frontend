import {
  Button,
  FormGroup,
  Grid,
  Input,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CenteredItem from "../UtilsComponents/CenteredItem";
import CustomInput from "../UtilsComponents/CustomeInput";

function Login() {
  return (
    // Container with full page size
    <Grid container sx={{ height: "100vh", overflowY: "hidden", marginTop: 0 }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CenteredItem height="50%">
          <h1>LOGIN</h1>
          <FormGroup
            sx={{
              alignContent: "center",
            }}
          >
            <CustomInput placeholder="Email" type="email" />
            <CustomInput placeholder="Password" type="password" />
            <Button
              variant="contained"
              sx={{
                width: "50%",
                marginTop: "2%",
                backgroundColor: "#b61c4a",
                ":hover": { backgroundColor: "#b61c4a" },
              }}
            >
              Login
            </Button>

            <p style={{ marginTop: "2%" }}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </FormGroup>
        </CenteredItem>
      </Grid>
      <Grid item xs={12} sm={6}>
        <img src="src\assets\3.gif" alt="loginbg" width="100%" height="100%" />
      </Grid>
    </Grid>
  );
}

export default Login;
