import { useNavigate } from "react-router";
import countries from "../countries";
import "./MatchCard.css";
//TODO use stadium id to get the stadium name
const handleClick = (userType, match_id, navigate) => {
  if (userType === "manager") {
    navigate(`/matches/edit/${match_id}`);
  }
  if (userType === "fan") {
    navigate(`/matches/reserveTicket/${match_id}`);
  }
};
const MatchCard = ({ match }) => {
  const navigate = useNavigate();
  const userType =
    localStorage.getItem("role") !== null
      ? localStorage.getItem("role")
      : "guest";
  const {
    match_id,
    home_team,
    away_team,
    date,
    main_referee,
    first_line_referee,
    second_line_referee,
    name,
  } = match;
  console.log(`match_id`, match_id);
  const first_code = countries
    .find((item) => item.name === home_team)
    .code.toLowerCase();
  const second_code = countries
    .find((item) => item.name === away_team)
    .code.toLowerCase();
  const firstImage = `https://flagcdn.com/${first_code}.svg`;
  const secondImage = `https://flagcdn.com/${second_code}.svg`;
  return (
    <div className="container">
      <div className="match">
        <div className="match-header">
          <div className="match-tournament">
            <img src="/world-cup.png" />
            Fifa World Cup 2022
          </div>
          <div className="match-actions"></div>
        </div>
        <div className="match-content">
          <div className="column">
            <div className="team team--home">
              <div className="team-logo">
                <img
                  src={firstImage}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h2 className="team-name">{home_team}</h2>
            </div>
          </div>
          <div className="column">
            <div className="match-details">
              <div className="match-date">{date.slice(0, 10)}</div>
              <div className="match-score">
                <span className="match-score-number match-score-number--leading">
                  -
                </span>
                <span className="match-score-divider">:</span>
                <span className="match-score-number">-</span>
              </div>
              <div className="match-Stadium">
                Stadium: <strong>{name} </strong>
              </div>
              <div className="match-Stadium">
                Main referee: <strong>{main_referee} </strong>
              </div>
              <div className="match-Stadium">
                First lines man: <strong>{first_line_referee} </strong>
              </div>
              <div className="match-Stadium">
                Second lines man: <strong>{second_line_referee} </strong>
              </div>
              {userType !== "guest" ? (
                <button
                  className="match-bet-place"
                  onClick={() => handleClick(userType, match_id, navigate)}
                >
                  {userType === "manager"
                    ? "Edit Match Details"
                    : "Reserve Ticket"}
                </button>
              ) : null}
            </div>
          </div>
          <div className="column">
            <div className="team team--away">
              <div className="team-logo">
                <img
                  src={secondImage}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h2 className="team-name">{away_team}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
