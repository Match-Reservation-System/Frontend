import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { BASE_URL } from "../../baseUrl";
import CenteredItem from "../../UtilsComponents/CenteredItem";
import CustomInput from "../../UtilsComponents/CustomeInput";
import CustomSelect from "../../UtilsComponents/CustomSelect";
import NavBar from "../../UtilsComponents/NavBar";
import ourColors from "../../UtilsComponents/ourColors";
import { Teams } from "./Teams";

export const CreateMatch = () => {
  const [firstTeam, setFirstTeam] = useState("null");
  const [secondTeam, setSecondTeam] = useState("null");
  const [venue, setVenue] = useState("Stadium");
  const [date, setDate] = useState("");
  const [referee, setReferee] = useState("Referee");
  const [Linesman1, setLinesman1] = useState("Linesman1");
  const [Linesman2, setLinesman2] = useState("Linesman2");
  const [price, setPrice] = useState(0);
  const [formErrors, setFormErrors] = useState("");

  const validateErrors = () => {
    if (firstTeam === "null" || secondTeam === "null") {
      setFormErrors("Please select teams");
      return false;
    }
    if (venue === "Stadium") {
      setFormErrors("Please select venue");
      return false;
    }
    if (referee === "Referee") {
      setFormErrors("Please select referee");
      return false;
    }
    if (Linesman1 === "Linesman1") {
      setFormErrors("Please select Linesman1");
      return false;
    }
    if (Linesman2 === "Linesman2") {
      setFormErrors("Please select Linesman2");
      return false;
    }
    if (price === 0) {
      setFormErrors("Please select price");
      return false;
    }
    if (date === "") {
      setFormErrors("Please select date");
      return false;
    }
    setFormErrors("");

    return true;
  };
  const addMatch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (validateErrors()) {
      try {
        let res = await fetch(`${BASE_URL}/manager/match`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            stadium_id: 1,
            main_referee: referee,
            first_line_referee: Linesman1,
            second_line_referee: Linesman2,
            ticket_price: price,
            home_team: firstTeam,
            away_team: secondTeam,
            date: date,
          }),
        });
        res = await res.json();
        console.log(res);
        if (res.error) {
          setFormErrors(res.error);
          return;
        }
        setFormErrors("Match added successfully");
      } catch (error) {
        console.log(error);
        setFormErrors(error);
      }
      //   window.location.href = "/manager/matches";
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
            <h1>ADD NEW MATCH</h1>
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
                  src="../src/assets/football-badge.png"
                  alt="football"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomSelect
                  defaultValue={firstTeam}
                  value={firstTeam}
                  setValue={setFirstTeam}
                >
                  <MenuItem value="null">First Team</MenuItem>
                  {Teams.map((team, index) => {
                    if (team !== secondTeam) {
                      return (
                        <MenuItem key={index} value={team}>
                          {team}
                        </MenuItem>
                      );
                    }
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
                  src="../src/assets/club.png"
                  alt="football"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomSelect
                  defaultValue={secondTeam}
                  value={secondTeam}
                  setValue={setSecondTeam}
                >
                  <MenuItem value="null">Second Team</MenuItem>
                  {Teams.map((team, index) => {
                    if (team !== firstTeam) {
                      return (
                        <MenuItem key={index} value={team}>
                          {team}
                        </MenuItem>
                      );
                    }
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
                  src="../src/assets/stadium.png"
                  alt="stadium"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Venue"
                  value={venue}
                  setValue={setVenue}
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
                  src="../src/assets/timetable.png"
                  alt="timetable"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput type="date" value={date} setValue={setDate} />
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
                  src="../src/assets/refree.png"
                  alt="refree"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput value={referee} setValue={setReferee} />
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
                  src="../src/assets/lineman.png"
                  alt="lineman"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput value={Linesman1} setValue={setLinesman1} />
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
                  src="../src/assets/lineman.png"
                  alt="lineman"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput value={Linesman2} setValue={setLinesman2} />
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
                  src="../src/assets/price.png"
                  alt="price"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput value={price} setValue={setPrice} />
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
                  onClick={async (e) => await addMatch(e)}
                >
                  Add Match
                </Button>
              </Grid>
            </Grid>
          </CenteredItem>
        </Grid>
      </Grid>
    </>
  );
};
