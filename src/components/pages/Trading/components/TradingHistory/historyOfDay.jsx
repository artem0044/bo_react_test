import React from "react";
import Collapse from "@mui/material/Collapse";

import Down from "@assets/images/icons/arrow-down.svg";
import HistoryDayItem from "@components/pages/Trading/components/TradingHistory/historyDayItem";

const HistoryOfDay = ({ data, time, isOpened }) => {
  const [open, setOpen] = React.useState(isOpened);

  console.log(data, "Data Item");

  return (
    <div className="historyOfDay">
      <button onClick={() => setOpen(!open)} className="historyOfDay__btn">
        <time className="historyOfDay__day">{time}</time>
        <img
          className={`historyOfDay__icon ${
            open ? "historyOfDay__icon--active" : ""
          }`}
          src={Down}
        />
      </button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ul className="historyOfDay__list">
          {data.map((data) => {
            return (
              <li key={data.id} className="historyOfDay__item">
                <HistoryDayItem data={data} direction="up" />
              </li>
            );
          })}
        </ul>
      </Collapse>
    </div>
  );
};

export default React.memo(HistoryOfDay);
