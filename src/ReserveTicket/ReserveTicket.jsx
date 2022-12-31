import { useState, useEffect } from "react";
import { BASE_URL } from "../baseUrl";
import ReservePreview from "../UtilsComponents/ReservePreview/ReservePreview";
import NavBar from "../UtilsComponents/NavBar";
const getMatchById = async (id) => {
  const response = await fetch(`${BASE_URL}/guest/matches/${id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.match;
};
const ReserveTicket = () => {
  const [match, setMatch] = useState(null);
  useEffect(() => {
    getMatchById(4).then((data) => setMatch(data));
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
        <div className="col-2 "></div>
        <div className="col-8 text-center">
          {match && <ReservePreview match={match} />}
        </div>
        <div className="col-2 "></div>
      </div>
    </div>
  );
};

export default ReserveTicket;
