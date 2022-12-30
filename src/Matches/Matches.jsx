import { useState, useEffect } from "react";
import ourColors from "../UtilsComponents/ourColors";
import MatchCard from "../UtilsComponents/MatchCard/MatchCard";
import NavBar from "../UtilsComponents/NavBar";
import { BASE_URL } from "../baseUrl";
//TODO fetch matches from the backend
const dummyMatch = {
  match_id: 1,
  home_team: "Egypt",
  away_team: "Qatar",
  date: "29/12/2022",
  stadium_name: "Lusial",
  main_referee: "Mohamed Salah",
  first_line_referee: "Mohamed Salah",
  second_line_referee: "Mohamed Salah",
  free_seats: 1000,
};
const Matches = () => {
  return (
    <div
      className="container-fluid"
      style={{
        background: `url("../src/assets/1.jpg")`,
      }}
    >
      <div className="row mb-5">
        <NavBar />
      </div>
      <div className="row">
        <div className="col-12 mb-5">
          <MatchCard match={dummyMatch} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyMatch} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyMatch} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyMatch} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyMatch} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyMatch} />
        </div>
      </div>
    </div>
  );
};

export default Matches;
