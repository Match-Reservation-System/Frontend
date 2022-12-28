import { Button, FormGroup, Grid, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import CenteredItem from "../UtilsComponents/CenteredItem";
import CustomInput from "../UtilsComponents/CustomeInput";
import CustomSelect from "../UtilsComponents/CustomSelect";
import nationalties from "./nationalties";

function Signup() {
  const [dateOfBirth, setDateOfBirth] = useState(null);

  return (
    // Container with full page size
    <Grid container sx={{ height: "100vh", overflowY: "hidden", marginTop: 0 }}>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CenteredItem>
          <h1>Signup</h1>
          <FormGroup
            sx={{
              alignContent: "center",
            }}
          >
            <CustomInput placeholder="Username" />
            <CustomInput placeholder="First Name" />
            <CustomInput placeholder="Last Name" />
            <CustomInput placeholder="Email" type="email" />
            <CustomInput placeholder="Password" type="password" />
            <CustomSelect defaultValue="male">
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
            >
              <MenuItem value="nationalty">Nationalty</MenuItem>
              {nationalties.map((nationalty) => (
                <MenuItem value={nationalty}>{nationalty}</MenuItem>
              ))}
            </CustomSelect>
            <Button
              variant="contained"
              sx={{
                width: "50%",
                marginTop: "2%",
                backgroundColor: "#b61c4a",
                ":hover": { backgroundColor: "#b61c4a" },
              }}
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
