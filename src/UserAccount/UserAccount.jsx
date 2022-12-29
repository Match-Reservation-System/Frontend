import { useState } from "react";
import ourColors from "../UtilsComponents/ourColors";
import nationalties from "../UtilsComponents/nationalties";
import MatchCard from "../UtilsComponents/MatchCard/MatchCard";
import NavBar from "../UtilsComponents/NavBar";
const fields = [
  ["FName", "LName"],
  ["Username", "Email"],
  ["Password", "BDate"],
];
const checkSubmit = (user) => {
  if (user.Username.length < 3) {
    alert("Username must be at least 3 characters");
    return;
  }
  if (user.Password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  for (const key in user) {
    if (user[key] === "") {
      alert("All fields are required");
      return;
    }
  }
};
const UserAccount = () => {
  const [user, setUser] = useState({
    Username: "ahmedkhalil",
    Email: "hogumif@zanoal.fm",
    Password: "123456",
    FName: "Ahmed",
    LName: "Khalil",
    BDate: "25/12/1998",
    Gender: "Male",
    Role: "Manager",
    Nationality: "Egyptian",
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100vh",
        width: "100vw",
        gap: "50px",
      }}
    >
      <NavBar />
      <div
        className="container d-flex flex-column justify-content-center"
        style={{
          backgroundImage: `url("../src/assets/1.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="py-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src="/src/assets/avatar.png"
            width="72"
            height="72"
          />
          <h2 style={{ color: ourColors.background }}>Account Settings</h2>
        </div>
        <div className="col-md-10">
          <form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              checkSubmit(user);
            }}
          >
            {fields.map((field) => (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label for={field[0]} style={{ color: ourColors.background }}>
                    {field[0]}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="{field[0]}"
                    value={user[field[0]]}
                    onChange={(e) =>
                      setUser({ ...user, [field[0]]: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={{ color: ourColors.background }} for={field[1]}>
                    {field[1]}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="{field[1]}"
                    value={user[field[1]]}
                    onChange={(e) =>
                      setUser({ ...user, [field[1]]: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label style={{ color: ourColors.background }} for="Role">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="{field[1]}"
                  value={user.Role}
                  onChange={(e) =>
                    setUser({ ...user, [field[1]]: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="country" style={{ color: ourColors.background }}>
                  Nationality
                </label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required=""
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
                <label for="country" style={{ color: ourColors.background }}>
                  Gender
                </label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required=""
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
      <div
        className=" matches"
        style={{
          width: "70%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 0.5fr)",
          gap: "40px",
        }}
      >
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </div>
    </div>
  );
};

export default UserAccount;
