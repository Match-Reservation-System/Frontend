import React from "react";
import "./SeatsPicker.css";

const SeatsPicker = ({
  seats,
  stadium_name,
  setOpen,
  setSelectedRowAndSeat,
}) => {
  const onClick = (row, seat) => {
    console.log(row, seat);
    setSelectedRowAndSeat({ row, seat });
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
        {seats &&
          seats.map((row, rowIndex) => (
            <li className={`row row--${rowIndex + 1}`}>
              <ol className="seats">
                {row &&
                  row.map((seat, seatIndex) => (
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
