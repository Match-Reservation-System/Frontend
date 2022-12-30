import { useState, useEffect } from "react";
import ourColors from "../UtilsComponents/ourColors";
import MatchCard from "../UtilsComponents/MatchCard/MatchCard";
import NavBar from "../UtilsComponents/NavBar";
import { BASE_URL } from "../baseUrl";
const dummyTicket = {
  home_team: "Egypt",
  away_team: "Qatar",
  date: "29/12/2022",
  stadium_name: "Lusial",
  main_referee: "Mohamed Salah",
  first_line_referee: "Mohamed Salah",
  second_line_referee: "Mohamed Salah",
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
          <MatchCard match={dummyTicket} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyTicket} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyTicket} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyTicket} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyTicket} />
        </div>
        <div className="col-12 mb-5">
          <MatchCard match={dummyTicket} />
        </div>
      </div>
    </div>
  );
};

export default Matches;
