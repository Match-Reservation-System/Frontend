import { useState, useEffect } from "react";
import MatchCard from "../UtilsComponents/MatchCard/MatchCard";
import NavBar from "../UtilsComponents/NavBar";
import { BASE_URL } from "../baseUrl";
const getMatches = async () => {
  const response = await fetch(`${BASE_URL}/guest/matches`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    }),
  });
  const data = await response.json();
  return data.matches;
};

const Matches = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    getMatches().then((data) => setMatches(data));
  }, []);
  return (
    <div
      className="container-fluid"
      style={{
        background: `url("../1.jpg")`,
        minHeight: "100vh",
      }}
    >
      <div className="row mb-5">
        <NavBar />
      </div>
      <div className="row">
        {matches.map((match) => (
          <div className="col-12 mb-5">
            <MatchCard match={match} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
