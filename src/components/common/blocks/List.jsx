import React from "react";

export const List = ({ myData }) => {
  const { data } = myData;
  return (
    <ul className="info-sec__list">
      {data.items.map((item, index) => (
        <li key={index} className="info-sec__item">
          <p
            className="info-sec__text"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
