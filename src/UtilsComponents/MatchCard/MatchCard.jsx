import "./MatchCard.css";
const MatchCard = () => {
  return (
    <div className="container">
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
                  src="https://flagcdn.com/za.svg"
                  alt="south africa"
                  width="50px"
                  height="50px"
                />
              </div>
              <h2 className="team-name">south africa</h2>
            </div>
          </div>
          <div className="column">
            <div className="match-details">
              <div className="match-date">
                12 Aug at <strong>19:00</strong>
              </div>
              <div className="match-score">
                <span className="match-score-number match-score-number--leading">
                  0
                </span>
                <span className="match-score-divider">:</span>
                <span className="match-score-number">0</span>
              </div>
              <div className="match-Stadium">
                Stadium: <strong>lusail </strong>
              </div>
              <button className="match-bet-place">Cancel Match Ticket</button>
            </div>
          </div>
          <div className="column">
            <div className="team team--away">
              <div className="team-logo">
                <img src="https://flagcdn.com/eg.svg" />
              </div>
              <h2 className="team-name">Egypt</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
