import { Box, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { BASE_URL } from "../../baseUrl";
import ourColors from "../../UtilsComponents/ourColors";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const reserveTicket = async (
  token,
  match_id,
  row,
  seat,
  setOpen,
  setReservedSeats,
  creditCard,
  pin,
  setServerError
) => {
  setServerError("");
  if (creditCard.length !== 8) {
    setServerError("Credit Card must be 8 digits");
    return;
  } else if (pin.length < 4) {
    setServerError("Pin must be at least 4 digits");
    return;
  }
  const response = await fetch(`${BASE_URL}/customer/fan/tickets/reserve`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      match_id: match_id,
      row: row,
      seat: seat,
    }),
  });
  const data = await response.json();
  if (data.error) {
    setServerError(data.error);
    return;
  } else {
    setServerError("");
    setOpen(false);
    setReservedSeats((prev) => [...prev, { row, seat }]);
  }
};
const PurchaseCard = ({
  match_id,
  open,
  setOpen,
  selectedRowAndSeat,
  setReservedSeats,
}) => {
  const token = localStorage.getItem("token");
  const [creditCard, setCreditCard] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [serverError, setServerError] = React.useState("");
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setServerError("");
        setCreditCard("");
        setPin("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ color: "red" }}>{serverError}</p>
        <TextField
          id="outlined-basic"
          label="Credit Card"
          style={{
            marginBottom: "10px",
            display: "block",
          }}
          value={creditCard}
          onChange={(e) => setCreditCard(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Pin"
          style={{
            marginBottom: "10px",
            display: "block",
          }}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <Button
          variant="text"
          onClick={() =>
            reserveTicket(
              token,
              match_id,
              selectedRowAndSeat.row,
              selectedRowAndSeat.seat,
              setOpen,
              setReservedSeats,
              creditCard,
              pin,
              setServerError
            )
          }
          style={{
            color: "white",
            backgroundColor: ourColors.primary,
          }}
        >
          Purchase
        </Button>
      </Box>
    </Modal>
  );
};

export default PurchaseCard;
