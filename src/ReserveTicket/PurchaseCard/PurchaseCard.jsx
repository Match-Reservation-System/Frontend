import { Box, Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { BASE_URL } from "../../baseUrl";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const reserveTicket = async (token, match_id, row, seat) => {
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
    alert(data.error);
    return;
  } else {
    setOpen(false);
  }
};
const PurchaseCard = ({
  match_id,
  open,
  setOpen,
  setCreditCard,
  setPin,
  rowAndSeat,
}) => {
  const token = localStorage.getItem("token");
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
        <TextField
          id="outlined-basic"
          label="Credit Card"
          onChange={(e) => setCreditCard(e.target.value)}
          style={{
            marginBottom: "10px",
            display: "block",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Pin"
          onChange={(e) => setPin(e.target.value)}
          style={{
            marginBottom: "10px",
            display: "block",
          }}
        />
        <Button
          variant="text"
          onClick={() =>
            reserveTicket(token, match_id, rowAndSeat.row, rowAndSeat.seat)
          }
          style={{
            color: "white",
            backgroundColor: "green",
          }}
        >
          Purchase
        </Button>
      </Box>
    </Modal>
  );
};

export default PurchaseCard;
