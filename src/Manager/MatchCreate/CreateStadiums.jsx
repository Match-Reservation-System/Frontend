import { Button, Grid, MenuItem } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../../baseUrl";
import CenteredItem from "../../UtilsComponents/CenteredItem";
import CustomInput from "../../UtilsComponents/CustomeInput";
import CustomSelect from "../../UtilsComponents/CustomSelect";
import NavBar from "../../UtilsComponents/NavBar";
import ourColors from "../../UtilsComponents/ourColors";
import { cities } from "./QatariCities";

export const CreateStadium = (props) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("null");
  const [rows, setRows] = useState("");
  const [seats, setSeats] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const addStadium = async (e) => {
    try {
      const token = localStorage.getItem("token");
      e.preventDefault();
      if (name === "" || city === "null" || rows === "" || seats === "") {
        setFormErrors("All fields are required");
        return;
      }
      if (rows <= 0 || seats <= 0) {
        setFormErrors("Rows and Seats must be positive numbers");
        return;
      }

      //send to server
      let res = await fetch(`${BASE_URL}/manager/stadium`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          city: city,
          rows: rows,
          seats_per_row: seats,
        }),
      });
      res = await res.json();
      if (res.error) {
        setFormErrors(res.error);
        return;
      }
      setFormErrors("Stadium added successfully");
    } catch (err) {
      console.log(err);
      setFormErrors("Something went wrong");
    }
  };

  return (
    <>
      <NavBar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
      >
        <Grid item xs={12} sm={6}>
          <CenteredItem
            style={{
              width: "100%",
            }}
          >
            <h1>ADD NEW STADIUM</h1>
            <p
              style={{
                color: ourColors.primary10,
                fontWeight: "bold",
              }}
            >
              {formErrors}
            </p>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="../src/assets/stadium.png"
                  alt="stadium"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Stadium Name"
                  value={name}
                  setValue={setName}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="../src/assets/city.png"
                  alt="city"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomSelect value={city} setValue={setCity}>
                  <MenuItem value="null">City</MenuItem>
                  {cities.map((city, index) => {
                    return (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    );
                  })}
                </CustomSelect>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="../src/assets/rows.png"
                  alt="rows"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Rows"
                  value={rows}
                  setValue={setRows}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="../src/assets/seats.png"
                  alt="seats"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Seats Per Row"
                  value={seats}
                  setValue={setSeats}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="../src/assets/add.png"
                  alt="add"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: ourColors.primary10,
                    ":hover": { backgroundColor: ourColors.primary10 },
                    width: "40%",
                  }}
                  onClick={async (e) => await addStadium(e)}
                >
                  Add Stadium
                </Button>
              </Grid>
            </Grid>
          </CenteredItem>
        </Grid>
      </Grid>
    </>
  );
};
