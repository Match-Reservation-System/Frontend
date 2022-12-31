import { useNavigate } from "react-router";
import countries from "../countries";
import "./ReservePreview.css";
const ReservePreview = ({ match }) => {
  const { home_team, away_team, date, name, ticket_price } = match;
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
              <div className="match-date">{date.slice(11, 16)}</div>
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
                Price: <strong>{ticket_price} </strong>
              </div>
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

export default ReservePreview;
