import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../baseUrl";
import { LazyLoading } from "../LazyLoading/LazyLoading";
import NavBar from "../UtilsComponents/NavBar";
import { ManagerCard } from "./ManagerCard";

export const Admin = ({ fetchUrl }) => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      fetch(`${BASE_URL}${fetchUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setLoading(false);
            setServerError(data.error);
            return;
          }
          setServerError("");
          setManagers(data.users);
          setLoading(false);
          resolve(data);
        })
        .catch((err) => {
          setLoading(false);
          setServerError("Something went wrong");

          reject(err);
        });
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  return loading ? (
    <LazyLoading loadingPath={"../football.svg"} />
  ) : (
    <>
      <NavBar />
      <Grid
        container
        justifyContent="center"
        sx={{
          height: `calc(100vh + ${(managers.length + 2) * 80}px)`,
          backgroundImage: "url('../1.jpg')",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            marginTop: "1%",
            flexDirection: "column",
          }}
        >
          {managers.map((manager) => (
            <ManagerCard
              name={manager.user_name}
              email={manager.email}
              role={manager.role || "manager"}
              id={manager.id}
              fetchManagers={fetchData}
              users={fetchUrl?.includes("all") ? true : false}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};
