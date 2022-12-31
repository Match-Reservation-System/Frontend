import { useState, useEffect } from "react";
import ourColors from "../UtilsComponents/ourColors";
import nationalties from "../UtilsComponents/nationalties";
import TicketCard from "../UtilsComponents/TicketCard/TicketCard";
import NavBar from "../UtilsComponents/NavBar";
import { LazyLoading } from "../LazyLoading/LazyLoading";
import ChangePasswordModal from "./ChangePasswordModal";
import { BASE_URL } from "../baseUrl";
const pascalToUnderScore = (str) => {
  const words = str.split(" ");
  const newWords = words.map((word) => word.toLowerCase());
  return newWords.join("_");
};
const fields = [
  ["First Name", "Last Name"],
  ["Password", "Birth Date"],
];
const updateUserData = async (
  user,
  userId,
  token,
  setUser,
  role,
  setServerError
) => {
  console.log("user in updateUser", user);
  setServerError("");
  if (user.birth_date.length < 10) {
    setServerError("Birth date must be in the format YYYY-MM-DD");
    return;
  }
  for (const key in user) {
    if (user[key] === "") {
      setServerError("All fields must be filled");
      return;
    }
  }
  const res = await fetch(`${BASE_URL}/customer/fan/${userId}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  // TODO print if there is an error
  const data = await res.json();
  if (data.error) {
    setServerError(data.error);
    return;
  } else {
    getUserData(userId, token, role).then((data) =>
      setUser({
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: data.birth_date,
        gender: data.gender,
        nationality: data.nationality,
      })
    );
  }
};
const getUserData = async (userId, token, role) => {
  const res = await fetch(`${BASE_URL}/customer/fan/${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = await res.json();
  return userData;
};
const getUserTickets = async (userId, token) => {
  const res = await fetch(`${BASE_URL}/customer/fan/tickets/${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.error) {
    return [];
  } else {
    return data.tickets;
  }
};
//TODO make the layout more responsive
const UserAccount = () => {
  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "",
    nationality: "",
  });
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    getUserData(userId, token, role).then((data) =>
      setUser({
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: data.birth_date,
        gender: data.gender,
        nationality: data.nationality,
      })
    );
    getUserTickets(userId, token).then((data) => setTickets(data));
  }, []);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return loading ? (
    <LazyLoading />
  ) : (
    <div
      className="full-page container-fluid"
      style={{
        backgroundImage: `url("../6.png")`,
        height: `calc(100vh + ${(tickets.length + 2) * 155}px)`,
      }}
    >
      <div className="nav-bar row mb-5">
        <NavBar />
      </div>
      <div
        className=" form-section-with-bg row d-flex flex-column justify-content-center align-items-center"
        style={{
          marginBottom: "100px",
        }}
      >
        <div className="img-and-txt text-center">
          <img
            className="d-block mx-auto mb-4"
            src="/avatar.png"
            width="72"
            height="72"
          />
          <h2 style={{ color: ourColors.background }}>Account Settings</h2>
          <h3 style={{ color: ourColors.background }}>{role}</h3>
          <h4 style={{ color: ourColors.background }}>{serverError}</h4>
        </div>
        <div className="form col-6">
          <form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              updateUserData(
                user,
                userId,
                token,
                setUser,
                role,
                setServerError
              );
            }}
          >
            {fields.map((field) => (
              <div className="row" key={`${field[0]} ${field[1]}`}>
                <div className="col-md-6 mb-3">
                  <label
                    htmlFor={field[0]}
                    style={{ color: ourColors.background, fontSize: "20px" }}
                  >
                    {field[0]}
                  </label>
                  <input
                    type={field[0] === "Password" ? "button" : "text"}
                    className="form-control"
                    id="{field[0]}"
                    value={
                      field[0] !== "Password"
                        ? user[pascalToUnderScore(field[0])]
                        : "Change Password"
                    }
                    onChange={(e) => {
                      setUser({
                        ...user,
                        [pascalToUnderScore(field[0])]: e.target.value,
                      });
                    }}
                    onClick={
                      field[0] === "Password"
                        ? () => {
                            setOpen(true);
                          }
                        : null
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label
                    style={{ color: ourColors.background, fontSize: "20px" }}
                    htmlFor={field[1]}
                  >
                    {field[1]}
                  </label>
                  <input
                    type={field[1] === "Birth Date" ? "date" : "text"}
                    className="form-control"
                    id="{field[1]}"
                    value={user[pascalToUnderScore(field[1])]}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        [pascalToUnderScore(field[1])]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="country"
                  style={{ color: ourColors.background, fontSize: "20px" }}
                >
                  Nationality
                </label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  style={{
                    display: "block !important",
                    marginBottom: "25px",
                    height: "36px",
                  }}
                  onChange={(e) =>
                    setUser({ ...user, Nationality: e.target.value })
                  }
                  value={user.nationality}
                >
                  <option value={user.nationality}>{user.nationality}</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label
                  htmlFor="country"
                  style={{ color: ourColors.background, fontSize: "20px" }}
                >
                  Gender
                </label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  style={{
                    display: "block !important",
                    marginBottom: "25px",
                    height: "36px",
                  }}
                  onChange={(e) => setUser({ ...user, Gender: e.target.value })}
                  value={user.gender}
                >
                  <option value={user.gender}>{user.gender}</option>
                </select>
              </div>
            </div>
            <button
              className="btn btn-lg btn-block"
              type="submit"
              style={{
                width: "50%",
                marginLeft: "25%",
                backgroundColor: ourColors.primary,
                color: "white",
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      {tickets.length > 0 && (
        <div className="matches-section row">
          <div className="img-and-txt text-center">
            <h2 style={{ color: ourColors.background }}>Your Tickets</h2>
            <img
              className="d-block mx-auto mb-4"
              src="/tickets.png"
              width="72"
              height="72"
            />
          </div>
          <div
            className=" matches"
            style={{
              width: "80%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(700px, 1fr))`,
              rowGap: "50px",
              marginBottom: "50px",
            }}
          >
            {tickets.map((ticket) => {
              return (
                <TicketCard
                  ticket={ticket}
                  setTickets={setTickets}
                  getUserTickets={getUserTickets}
                />
              );
            })}
          </div>
        </div>
      )}
      <ChangePasswordModal open={open} setOpen={setOpen} />
    </div>
  );
};
export default UserAccount;
