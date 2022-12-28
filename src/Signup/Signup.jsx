import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../baseUrl";
import CenteredItem from "../UtilsComponents/CenteredItem";
import CustomInput from "../UtilsComponents/CustomeInput";
import CustomSelect from "../UtilsComponents/CustomSelect";
import nationalties from "./nationalties";
import colors from "../UtilsComponents/colors";
function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [role, setRole] = useState("role");
  const [nationalty, setNationalty] = useState("nationalty");

  const [formErrors, setFormErrors] = useState({
    username: {
      error: false,
      message: "",
    },
    firstName: {
      error: false,
      message: "",
    },
    lastName: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    gender: {
      error: false,
      message: "",
    },
  });

  const [serverError, setServerError] = useState("");

  const validateErrors = () => {
    if (username.length < 3) {
      setFormErrors({
        ...formErrors,
        username: {
          error: true,
          message: "Username must be at least 3 characters",
        },
      });
      return false;
    }

    // check if first name is valid
    if (firstName.length < 3) {
      setFormErrors({
        ...formErrors,
        username: { error: false, message: "" },
        firstName: {
          error: true,
          message: "First name must be at least 3 characters",
        },
      });
      return false;
    }

    // check if last name is valid
    if (lastName.length < 3) {
      setFormErrors({
        ...formErrors,
        firstName: { error: false, message: "" },
        lastName: {
          error: true,
          message: "Last name must be at least 3 characters",
        },
      });
      return false;
    }

    // check if email is valid
    if (!email.includes("@")) {
      setFormErrors({
        ...formErrors,
        lastName: { error: false, message: "" },
        email: { error: true, message: "Invalid email" },
      });
      return false;
    }

    // check if password contains at least 8 characters and at least one number and one letter and one special character
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
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //convert to DD/MM/YYYY
    let date = new Date(dateOfBirth);
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    console.log(date);

    if (validateErrors()) {
      let data = {
        user_name: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        gender: gender,
        birth_date: date,
        role: role,
        nationality: nationalty,
      };
      // send data to server using axios with headers
      fetch(`${BASE_URL}/signup`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
        })
        .catch((err) => console.log(err));
    }

    // check if username is valid
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  return (
    <Grid container sx={{ height: "100vh", overflowY: "hidden", marginTop: 0 }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CenteredItem>
          <h1>SIGNUP</h1>
          <p>{serverError}</p>
          <FormGroup
            sx={{
              alignContent: "center",
              width: "100%",
            }}
          >
            <CustomInput
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={formErrors.username.error}
              helperText={formErrors.username.message}
            />
            <CustomInput
              placeholder="First Name"
              value={firstName}
              setValue={setFirstName}
              error={formErrors.firstName.error}
              helperText={formErrors.firstName.message}
            />
            <CustomInput
              placeholder="Last Name"
              value={lastName}
              setValue={setLastName}
              error={formErrors.lastName.error}
              helperText={formErrors.lastName.message}
            />
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
            <CustomSelect
              defaultValue="male"
              value={gender}
              setValue={setGender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </CustomSelect>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Date of Birth"
                inputFormat="DD/MM/YYYY"
                value={dateOfBirth}
                onChange={(newValue) => {
                  setDateOfBirth(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <CustomSelect
              sx={{
                width: "50%",
                marginTop: "2%",
                marginBottom: "2%",
              }}
              defaultValue="role"
              value={role}
              setValue={setRole}
            >
              <MenuItem value="role">Role</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </CustomSelect>
            <CustomSelect
              sx={{
                width: "50%",
                marginTop: "2%",
                marginBottom: "2%",
              }}
              defaultValue="nationalty"
              value={nationalty}
              setValue={setNationalty}
            >
              <MenuItem value="nationalty">Nationalty</MenuItem>
              {nationalties.map((nationalty) => (
                <MenuItem value={nationalty.nationality}>
                  {nationalty.nationality}
                </MenuItem>
              ))}
            </CustomSelect>
            <Button
              variant="contained"
              sx={{
                width: "60%",
                marginTop: "2%",
                backgroundColor: colors.primary10,
                ":hover": { backgroundColor: colors.primary10 },
              }}
              onClick={(e) => handleSubmit(e)}
            >
              Signup
            </Button>
            <p style={{ marginTop: "2%", marginBottom: "2%" }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </FormGroup>
        </CenteredItem>
      </Grid>
      <Grid item xs={12} sm={6}>
        <img src="src\assets\3.gif" alt="Signupbg" width="100%" height="100%" />
      </Grid>
    </Grid>
  );
}

export default Signup;
