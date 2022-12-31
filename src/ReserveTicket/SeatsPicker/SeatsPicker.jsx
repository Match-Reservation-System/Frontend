import React from "react";
import "./SeatsPicker.css";

const SeatsPicker = ({
  stadium_name,
  rows,
  seatsPerRow,
  setOpen,
  setRowAndSeat,
}) => {
  const [seats, setSeats] = React.useState(
    Array.from({ length: rows }, () =>
      Array.from({ length: seatsPerRow }, () => false)
    )
  );
  const onClick = (row, seat) => {
    setRowAndSeat({ row, seat });
    setOpen(true);
  };
  return (
    <div className="col-8 stadium">
      <div className="screen-side">
        <div className="screen">{stadium_name}</div>
        <h3 className="select-text">Please select a seat</h3>
      </div>
      <div className="exit exit--front"></div>
      <ol className="cabin">
        {seats.map((row, rowIndex) => (
          <li className={`row row--${rowIndex + 1}`}>
            <ol className="seats">
              {row.map((seat, seatIndex) => (
                <li
                  className="seat"
                  onClick={() => onClick(rowIndex, seatIndex)}
                >
                  <label
                    forHtml={`${rowIndex}${seatIndex}`}
                    className={!seat ? "not-selected" : "selected"}
                  >
                    {rowIndex + 1}
                    {String.fromCharCode(65 + seatIndex)}
                  </label>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <div className="exit exit--back"></div>
    </div>
  );
};
export default SeatsPicker;
