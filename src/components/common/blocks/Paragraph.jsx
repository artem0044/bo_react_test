import React from "react";

export const Paragraph = ({ myData }) => {
  const { data } = myData;
  return (
    <p
      className="info-sec__text"
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
};

export default Paragraph;
