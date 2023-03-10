import { Button, FormGroup, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import { LazyLoading } from "../LazyLoading/LazyLoading";
import CenteredItem from "../UtilsComponents/CenteredItem";
import CustomInput from "../UtilsComponents/CustomeInput";
import NavBar from "../UtilsComponents/NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

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

  const validateErrors = () => {
    if (!email.includes("@")) {
      setFormErrors({
        ...formErrors,
        email: {
          error: true,
          message: "Email is not valid",
        },
      });
      return false;
    }

    if (password.length < 8) {
      setFormErrors({
        ...formErrors,
        email: { error: false, message: "" },
        password: {
          error: true,
          message: "Password must contain at least 8 characters.",
        },
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErrors()) {
      fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setServerError(data.error);
            return;
          }
          setServerError("");
          let token = data.token;
          let userid = data.user.id;
          let role = data.user.role;

          localStorage.setItem("token", token);
          localStorage.setItem("userid", userid);
          localStorage.setItem("role", role);
          navigate("/");
        })
        .catch((err) => {
          setServerError("Email or password is incorrect");
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token != "undefined") {
      navigate("/");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <LazyLoading />
  ) : (
    <>
      <NavBar />
      <Grid
        container
        sx={{ height: "90vh", overflowY: "hidden", marginTop: 0 }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CenteredItem
            height="
        40%"
          >
            <h1>LOGIN</h1>
            <p>{serverError}</p>
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
          <img src="./3.gif" alt="loginbg" width="100%" height="100%" />
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
