import { useState, useEffect } from "react";
import MatchCard from "../UtilsComponents/MatchCard/MatchCard";
import NavBar from "../UtilsComponents/NavBar";
import { BASE_URL } from "../baseUrl";

import { Button } from "@mui/material";
import ourColors from "../UtilsComponents/ourColors";
import { useNavigate } from "react-router";
import { LazyLoading } from "../LazyLoading/LazyLoading";

Button;
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMatches().then((data) => setMatches(data));
  }, []);
  let userRole = localStorage.getItem("role");
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <LazyLoading />
  ) : (
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
      {userRole == "manager" && (
        <div className="row">
          <div className="col-12 text-center mb-3">
            <Button
              variant="contained"
              style={{
                background: "#623ce6",
              }}
              onClick={() => {
                navigate("/matches/create");
              }}
            >
              Add New Match
            </Button>
          </div>
        </div>
      )}

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
