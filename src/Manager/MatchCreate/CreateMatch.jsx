import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../baseUrl";
import CenteredItem from "../../UtilsComponents/CenteredItem";
import CustomInput from "../../UtilsComponents/CustomeInput";
import CustomSelect from "../../UtilsComponents/CustomSelect";
import NavBar from "../../UtilsComponents/NavBar";
import ourColors from "../../UtilsComponents/ourColors";
import { Teams } from "./Teams";

export const CreateMatch = (props) => {
  const [firstTeam, setFirstTeam] = useState("null");
  const [secondTeam, setSecondTeam] = useState("null");
  const [venue, setVenue] = useState("null");
  const [venues, setVenues] = useState([]);
  const [date, setDate] = useState("");
  const [referee, setReferee] = useState("");
  const [Linesman1, setLinesman1] = useState("");
  const [Linesman2, setLinesman2] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState("");

  // get url params
  const { id: matchId } = useParams();

  const validateErrors = () => {
    if (firstTeam === "null" || secondTeam === "null") {
      setFormErrors("Please select teams");
      return false;
    }
    if (venue === "null") {
      setFormErrors("Please select venue");
      return false;
    }
    if (referee === "") {
      setFormErrors("Please select referee");
      return false;
    }
    if (Linesman1 === "") {
      setFormErrors("Please select Linesman1");
      return false;
    }
    if (Linesman2 === "") {
      setFormErrors("Please select Linesman2");
      return false;
    }
    if (price === "") {
      setFormErrors("Please select price");
      return false;
    }

    if (price <= 0) {
      setFormErrors("Please select valid price");
      return false;
    }

    if (date === "") {
      setFormErrors("Please select date");
      return false;
    }

    let isoDate = new Date(date).toISOString();
    let todayDate = new Date().toISOString();
    // get difference between dates in days
    let diff = (new Date(isoDate) - new Date(todayDate)) / (1000 * 3600 * 24);
    if (diff < 1) {
      setFormErrors("Please select a valid [future] date");
      return false;
    }
    let hour = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();

    if (hour < 8 || hour > 20 || (hour === 20 && minutes > 0)) {
      setFormErrors("Please select a valid time [8:00AM - 08:00PM] ");
      return false;
    }
    setDate(date.replace("T", " "));

    setFormErrors("");

    return true;
  };
  const addMatch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (validateErrors()) {
      try {
        let res = await fetch(`${BASE_URL}/manager/match`, {
          method: matchId ? "PUT" : "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            stadium_id: venue,
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

        if (res.error) {
          setFormErrors(res.error);
          return;
        }
        setFormErrors("Match added successfully");
      } catch (error) {
        setFormErrors(error);
      }
      //   window.location.href = "/manager/matches";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getStadiums = async () => {
      try {
        let res = await fetch(`${BASE_URL}/manager/stadiums`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        res = await res.json();
        console.log(res);
        if (res.error) {
          setFormErrors(res.error);
          return;
        }
        setVenues(res.stadiums);
      } catch (error) {
        console.log(error);
        setFormErrors(error);
      }
    };
    getStadiums();
  }, []);

  useEffect(() => {
    if (matchId != "" || matchId != null || matchId != undefined) {
      const token = localStorage.getItem("token");
      const getMatch = async () => {
        try {
          let res = await fetch(`${BASE_URL}/guest/matches/${matchId}`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          res = await res.json();

          if (res.error) {
            setFormErrors(res.error);
            return;
          }
          let match = res.match;
          setFirstTeam(match.home_team);
          setSecondTeam(match.away_team);
          setVenue(match.stadium_id);
          setDate(match.date);
          setReferee(match.main_referee);
          setLinesman1(match.first_line_referee);
          setLinesman2(match.second_line_referee);
          setPrice(match.ticket_price);
        } catch (error) {
          // setFormErrors(error);
        }
      };
      getMatch();
    }
  }, [matchId]);

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
            <h1>{matchId ? "EDIT" : "ADD"} NEW MATCH</h1>
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
                  src={
                    matchId
                      ? "../../src/assets/football-badge.png"
                      : "../src/assets/football-badge.png"
                  }
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
                  src={
                    matchId
                      ? "../../src/assets/club.png"
                      : "../src/assets/club.png"
                  }
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
                  src={
                    matchId
                      ? "../../src/assets/stadium.png"
                      : "../src/assets/stadium.png"
                  }
                  alt="stadium"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomSelect value={venue} setValue={setVenue}>
                  <MenuItem value="null">Stadium</MenuItem>
                  {venues.map((stadium, index) => {
                    return (
                      <MenuItem key={index} value={stadium.id}>
                        {stadium.name} - {stadium.city}
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
                  src={
                    matchId
                      ? "../../src/assets/timetable.png"
                      : "../src/assets/timetable.png"
                  }
                  alt="timetable"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  type="datetime-local"
                  value={date}
                  setValue={setDate}
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
                  src={
                    matchId
                      ? "../../src/assets/refree.png"
                      : "../src/assets/refree.png"
                  }
                  alt="refree"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Refree"
                  value={referee}
                  setValue={setReferee}
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
                  src={
                    matchId
                      ? "../../src/assets/lineman.png"
                      : "../src/assets/lineman.png"
                  }
                  alt="lineman"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Linesman1"
                  value={Linesman1}
                  setValue={setLinesman1}
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
                  src={
                    matchId
                      ? "../../src/assets/lineman.png"
                      : "../src/assets/lineman.png"
                  }
                  alt="lineman"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Linesman2"
                  value={Linesman2}
                  setValue={setLinesman2}
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
                  src={
                    matchId
                      ? "../../src/assets/price.png"
                      : "../src/assets/price.png"
                  }
                  alt="price"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <CustomInput
                  placeholder="Price"
                  value={price}
                  setValue={setPrice}
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
                  src={
                    matchId
                      ? "../../src/assets/add.png"
                      : "../src/assets/add.png"
                  }
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
                  {matchId ? "Edit " : "Add "} Match
                </Button>
              </Grid>
            </Grid>
          </CenteredItem>
        </Grid>
      </Grid>
    </>
  );
};
