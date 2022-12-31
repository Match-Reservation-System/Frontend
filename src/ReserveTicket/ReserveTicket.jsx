import React, { useState, useEffect } from "react";
import { BASE_URL } from "../baseUrl";
import ReservePreview from "../UtilsComponents/ReservePreview/ReservePreview";
import NavBar from "../UtilsComponents/NavBar";
import SeatsPicker from "./SeatsPicker/SeatsPicker";
import PurchaseCard from "./PurchaseCard/PurchaseCard";
import { useParams } from "react-router";
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
  //get id from url
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [open, setOpen] = useState(false);
  const [creditCard, setCreditCard] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [rowAndSeat, setRowAndSeat] = React.useState({ row: 0, seat: 0 });
  useEffect(() => {
    getMatchById(id).then((data) => setMatch(data));
  }, []);
  return (
    <div
      className="container-fluid"
      style={{
        background: `url("../../1.jpg")`,
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
      <div className="row">
        <div className="col-2 "></div>
        <div className="col-8">
          <SeatsPicker
            stadium_name={match?.stadium_name || "Cairo International Stadium"}
            rows={10}
            seatsPerRow={5}
            setOpen={setOpen}
            setRowAndSeat={setRowAndSeat}
          />
        </div>
        <div className="col-2 "></div>
      </div>
      <PurchaseCard
        match_id={id}
        open={open}
        setOpen={setOpen}
        rowAndSeat={rowAndSeat}
      />
    </div>
  );
};

export default ReserveTicket;
