import { BASE_URL } from "../../baseUrl";
import countries from "../countries";
import "./TicketCard.css"; //TODO use stadium id to get the stadium name

const cancelTicket = async (
  ticket_id,
  token,
  setTickets,
  userId,
  getUserTickets
) => {
  const res = await fetch(`${BASE_URL}/customer/fan/tickets/${ticket_id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (data.error) {
    alert(data.error);
  } else {
    getUserTickets(userId, token).then((data) => setTickets(data));
  }
};

const TicketCard = ({ ticket, setTickets, getUserTickets }) => {
  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const { home_team, away_team, date, ticket_price, ticket_id } = ticket;
  const first_code = countries
    .find((item) => item.name === home_team)
    .code.toLowerCase();
  const second_code = countries
    .find((item) => item.name === away_team)
    .code.toLowerCase();
  const firstImage = `https://flagcdn.com/${first_code}.svg`;
  const secondImage = `https://flagcdn.com/${second_code}.svg`;
  return (
    <div
      className="container"
      style={{
        width: "90%",
      }}
    >
      <div className="match">
        <div className="match-header">
          <div className="match-tournament">
            <img src="/src/assets/world-cup.png" />
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
                price: <strong>{ticket_price} </strong>
              </div>
              <button
                className="match-bet-place"
                onClick={() =>
                  cancelTicket(
                    ticket_id,
                    token,
                    setTickets,
                    userId,
                    getUserTickets
                  )
                }
              >
                Cancel Match Ticket
              </button>
            </div>
          </div>
          <div className="column">
            <div className="team team--away">
              <div className="team-logo">
                <img
                  src={secondImage}
                  style={{
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

export default TicketCard;
