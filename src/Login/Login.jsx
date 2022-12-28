import {
  Button,
  FormGroup,
  Grid,
  Input,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import CenteredItem from "../UtilsComponents/CenteredItem";
import CustomInput from "../UtilsComponents/CustomeInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if email is valid
    if (!email.includes("@")) {
      setFormErrors({
        ...formErrors,
        email: {
          error: true,
          message: "Email is not valid",
        },
      });
      return;
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setFormErrors({
        ...formErrors,
        email: { error: false, message: "" },
        password: {
          error: true,
          message:
            "Password must contain at least 8 characters and at least one number and one letter and one special character",
        },
      });
      return;
    }
  };
  return (
    // Container with full page size
    <Grid container sx={{ height: "100vh", overflowY: "hidden", marginTop: 0 }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CenteredItem
          height="
        40%"
        >
          <h1>LOGIN</h1>
          <FormGroup
            sx={{
              alignContent: "center",
              width: "100%",
            }}
          >
            <CustomInput
              placeholder="Email"
              type="email"
              value={email}
              setValue={setEmail}
              error={formErrors.email.error}
              helperText={formErrors.email.message}
            />
            <CustomInput
              placeholder="Password"
              type="password"
              value={password}
              setValue={setPassword}
              error={formErrors.password.error}
              helperText={formErrors.password.message}
            />
            <Button
              variant="contained"
              sx={{
                width: "60%",
                marginTop: "2%",
                backgroundColor: "#b61c4a",
                ":hover": { backgroundColor: "#b61c4a" },
              }}
              onClick={handleSubmit}
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
