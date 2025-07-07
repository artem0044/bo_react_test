import React from "react";

export const Header = ({ myData }) => {
  const { data } = myData;
  return (
    <h1
      className="info-sec__title"
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
};

export default Header;
