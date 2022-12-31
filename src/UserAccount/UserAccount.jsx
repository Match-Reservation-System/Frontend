import { useState, useEffect } from "react";
import ourColors from "../UtilsComponents/ourColors";
import nationalties from "../UtilsComponents/nationalties";
import TicketCard from "../UtilsComponents/TicketCard/TicketCard";
import NavBar from "../UtilsComponents/NavBar";
import { BASE_URL } from "../baseUrl";
import { LazyLoading } from "../LazyLoading/LazyLoading";

const pascalToUnderScore = (str) => {
  const words = str.split(" ");
  const newWords = words.map((word) => word.toLowerCase());
  return newWords.join("_");
};

const dummyTicket = {
  home_team: "Egypt",
  away_team: "Qatar",
  date: "29/12/2022",
  stadium_name: "Lusial",
};
const fields = [
  ["First Name", "Last Name"],
  ["Password", "Birth Date"],
];
const updateUserData = async (user, userId, token, setUser, role) => {
  //TODO replace the alert
  if (user.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  } else if (user.birth_date.length < 10) {
    alert("Birth Date must be in the format of dd/mm/yyyy");
    return;
  }
  for (const key in user) {
    if (user[key] === "") {
      alert("All fields are required");
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
    alert(data.error);
    return;
  } else {
    getUserData(userId, token, role).then((data) =>
      setUser({ ...data, password: "" })
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
    console.log("data tickets", data.tickets);
    return data.tickets;
  }
};
//TODO make the layout more responsive
const UserAccount = () => {
  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    password: "",
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
        password: "",
        birth_date: data.birth_date,
        gender: data.gender,
        nationality: data.nationality,
      })
    );
    getUserTickets(userId, token).then((data) => setTickets(data));
    console.log("tickets", tickets);
  }, []);

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
        minHeight: "100vh",
      }}
    >
      <div className="nav-bar row mb-5">
        <NavBar />
      </div>
      <div className=" form-section-with-bg row d-flex flex-column justify-content-center align-items-center">
        <div className="img-and-txt text-center">
          <img
            className="d-block mx-auto mb-4"
            src="/avatar.png"
            width="72"
            height="72"
          />
          <h2 style={{ color: ourColors.background }}>Account Settings</h2>
          <h3 style={{ color: ourColors.background }}>{role}</h3>
        </div>
        <div className="form col-6">
          <form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              updateUserData(user, userId, token, setUser, role);
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
                    //if Password make type password else text
                    type={field[0] === "Password" ? "password" : "text"}
                    className="form-control"
                    id="{field[0]}"
                    value={user[pascalToUnderScore(field[0])]}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        [pascalToUnderScore(field[0])]: e.target.value,
                      });
                    }}
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
                >
                  <option value="Afghan">Afghan</option>
                  {nationalties.map((nationalty) => (
                    <option value={nationalty.nationality}>
                      {nationalty.nationality}
                    </option>
                  ))}
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
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
              width: "70%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
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
    </div>
  );
};

export default UserAccount;
