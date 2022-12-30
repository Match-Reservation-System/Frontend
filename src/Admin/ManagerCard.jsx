import { Button, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../baseUrl";
import ourColors from "../UtilsComponents/ourColors";

export const ManagerCard = (props) => {
  const [serverError, setServerError] = useState("");

  const handleVerify = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      let res = await fetch(`${BASE_URL}/admin/verify/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });
      if (res.error) {
        setServerError(res.error);
        return;
      }

      res = await props.fetchManagers();
      if (res.error) {
        setServerError(res.error);
        return;
      }

      setServerError("");
    } catch (err) {
      setServerError("Something went wrong");
    }
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      let res = await fetch(`${BASE_URL}/admin/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });
      if (res.error) {
        setServerError(res.error);
        return;
      }
      res = await props.fetchManagers();
      if (res.error) {
        setServerError(res.error);
        return;
      }
      setServerError("");
    } catch (err) {
      setServerError("Something went wrong");
    }
  };

  return (
    <Grid container>
      <p
        style={{
          color: ourColors.primary10,
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
        }}
      >
        {serverError}
      </p>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          color: "#b61c4a",
          padding: "2%",
          marginTop: "1%",
        }}
      >
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            margin: "0",
          }}
        >
          <img
            src="..\src\assets\user.png"
            alt="manager"
            width="100px"
            height="100px"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>{props.name}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>{props.email}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>{props.role}</p>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {!props.users && (
            <Button
              variant="contained"
              sx={{
                margin: "1%",
                backgroundColor: "green",
                ":hover": { backgroundColor: "green" },
              }}
              onClick={() => handleVerify(props.id)}
            >
              Verify
            </Button>
          )}

          <Button
            variant="contained"
            sx={{
              margin: "1%",
              backgroundColor: ourColors.primary10,
              ":hover": { backgroundColor: ourColors.primary10 },
            }}
            onClick={() => handleDelete(props.id)}
          >
            Delete
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};
