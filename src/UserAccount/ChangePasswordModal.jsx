import { Box, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { BASE_URL } from "../baseUrl";
import ourColors from "../UtilsComponents/ourColors";
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
const updateUserPassword = async (
  password,
  confirmPassword,
  userId,
  token,
  setOpen,
  setServerError
) => {
  setServerError("");
  if (password.length < 8) {
    setServerError("Password must be at least 8 characters");
    return;
  } else if (password !== confirmPassword) {
    setServerError("Passwords do not match");
    return;
  }
  const res = await fetch(`${BASE_URL}/customer/fan/${userId}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  console.log("change password res", res);
  const data = await res.json();
  if (data.error) {
    setServerError(data.error);
    return;
  } else {
    setOpen(false);
  }
};
const ChangePasswordModal = ({ open, setOpen }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [serverError, setServerError] = React.useState("");
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
        <p style={{ color: "red" }}>{serverError}</p>
        <TextField
          id="outlined-basic"
          label="New Password"
          style={{
            marginBottom: "10px",
            display: "block",
          }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Confirm Password"
          style={{
            marginBottom: "10px",
            display: "block",
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="text"
          onClick={() =>
            updateUserPassword(
              newPassword,
              confirmPassword,
              userId,
              token,
              setOpen,
              setServerError
            )
          }
          style={{
            color: "white",
            backgroundColor: ourColors.primary,
          }}
        >
          Change Password
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
