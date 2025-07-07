import React, { useState, useEffect } from "react";
import CryptoIcon from "@assets/images/icons/Ethereum (ETH).svg";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTranslation } from "@helpers/translate";

const Cryptocurrencies = () => {
  const [currency, setCurrency] = useState([]);
  const { __ } = useTranslation();

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      arr.push({ img: CryptoIcon, name: "ETH", fullName: "Ethereum" });
    }
    setCurrency(arr);
  }, []);

  return (
    <div className="crypto-deposit">
      <h3 className="crypto-deposit__title">{__("common.cryptocurrency")}:</h3>

      <Grid container spacing="1rem">
        {currency &&
          currency.map((el, i) => {
            return (
              <Grid key={i} item xl={3} md={4} b680={6} xs={12}>
                <Link to={`/wallet/deposit/1`} className="crypto-deposit-btn">
                  <div className="crypto-deposit-btn__l-wrap">
                    <img
                      className="crypto-deposit-btn__icon"
                      src={el.img}
                      alt="#"
                    />
                    <p className="crypto-deposit-btn__text">{el.name}</p>
                  </div>
                  <div>
                    <p className="crypto-deposit-btn__full-name">
                      {el.fullName}
                    </p>
                  </div>
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Cryptocurrencies;
