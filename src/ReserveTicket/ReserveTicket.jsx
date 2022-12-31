import React, { useState, useEffect } from "react";
import { BASE_URL } from "../baseUrl";
import ReservePreview from "../UtilsComponents/ReservePreview/ReservePreview";
import NavBar from "../UtilsComponents/NavBar";
import SeatsPicker from "./SeatsPicker/SeatsPicker";
import PurchaseCard from "./PurchaseCard/PurchaseCard";
import { useParams } from "react-router";
import { LazyLoading } from "../LazyLoading/LazyLoading";
const getMatchById = async (match_id) => {
  const response = await fetch(`${BASE_URL}/guest/matches/${match_id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.match;
};
const getReservedSeats = async (match_id) => {
  const response = await fetch(`${BASE_URL}/customer/match/${match_id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.reserved_seats;
};
const updateSeatsByReservedSeats = (
  rows,
  seatsPerRow,
  setSeats,
  reservedSeats
) => {
  let seats = Array.from({ length: rows }, () =>
    Array.from({ length: seatsPerRow > 10 ? 10 : seatsPerRow }, () => false)
  );
  if (reservedSeats) {
    reservedSeats?.forEach((seat) => {
      seats[seat?.row][seat?.seat] = true;
    });
    setSeats(seats);
  }
};
const ReserveTicket = () => {
  const { match_id } = useParams();
  const [match, setMatch] = useState(null);
  const [open, setOpen] = useState(false);
  const [seats, setSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedRowAndSeat, setSelectedRowAndSeat] = React.useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMatchById(match_id).then((match) => setMatch(match));
    getReservedSeats(match_id).then((reservedSeats) => {
      setReservedSeats(reservedSeats);
    });
  }, []);
  useEffect(() => {
    updateSeatsByReservedSeats(
      match?.rows,
      match?.seats_per_row,
      setSeats,
      reservedSeats
    );
  }, [reservedSeats]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <LazyLoading loadingPath="../../football.svg" />
  ) : (
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
          {match && (
            <SeatsPicker
              seats={seats}
              stadium_name={match.name}
              setOpen={setOpen}
              setSelectedRowAndSeat={setSelectedRowAndSeat}
            />
          )}
        </div>
        <div className="col-2 "></div>
      </div>
      <PurchaseCard
        match_id={match_id}
        open={open}
        setOpen={setOpen}
        selectedRowAndSeat={selectedRowAndSeat}
        setReservedSeats={setReservedSeats}
      />
    </div>
  );
};

export default ReserveTicket;
