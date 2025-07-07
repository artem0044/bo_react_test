import React, { useEffect, useState, useCallback } from "react";
import { debounce, Grid, Skeleton, Stack } from "@mui/material";
import Coin from "@assets/images/icons/coin-f.svg";
import Bitcoin from "@assets/images/icons/bitcoin.svg";
import axios from "@helpers/axios/private.axios";
import { useDispatch, useSelector } from "react-redux";
import { TRADING } from "../../../../constants";
import { useTranslation } from "@helpers/translate";

const SelectPairs = ({ setShow }) => {
  const [type, setType] = useState("fiat");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { userPairList } = useSelector((state) => state.trading);
  const { __ } = useTranslation();

  const fetchPairs = async (endpoint) => {
    try {
      setLoading(true);
      const { data } = await axios.get(endpoint);
      setData(data.data);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const reqToCurrentPair = () => {
    switch (type) {
      case "fiat":
        fetchPairs("/tradingPairs/fiat");
        break;

      case "crypto":
        fetchPairs("/tradingPairs/crypto");
        break;
    }
  };

  useEffect(() => {
    reqToCurrentPair();
  }, [type]);

  const changePairsType = (newType) => {
    if (type !== newType) {
      setType(newType);
      setSearch("");
    }
  };

  const changeCurrentPair = (pair) => {
    setShow(false);
    dispatch({ type: TRADING.CHANGE_PAIR, payload: pair });

    if (!userPairList.some((el) => el.slug === pair.slug)) {
      dispatch({ type: TRADING.ADD_USER_PAIR_LIST, payload: pair });
    }
  };

  const getSearchPairs = useCallback(
    debounce(async (name) => {
      if (name.trim() === "") {
        reqToCurrentPair();
        return;
      }

      try {
        const resp = await axios.post("/tradingPairs/search", {
          name,
        });
        setData(resp.data.data);
      } catch (e) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const searchPairs = (value) => {
    setSearch(value);
    setLoading(true);
    getSearchPairs(value);
  };

  return (
    <>
      <div onClick={() => setShow(false)} className="tradingPairs__bg"></div>
      <div className="tradingPairs__content">
        <h3 className="tradingPairs__title">{__("common.trading_pairs")}</h3>
        <input
          onChange={(e) => searchPairs(e.target.value)}
          value={search}
          type="text"
          className="tradingPairs__input"
          placeholder="EURUSD"
        />

        <div className="tradingPairs__btns">
          <Grid container spacing="1rem">
            <Grid item xs={6}>
              <button
                onClick={() => changePairsType("fiat")}
                type="button"
                className={`tradingPairs__btn ${
                  type === "fiat" ? "active" : ""
                }`}
              >
                <img src={Coin} alt="coin" className="tradingPairs__btn-icon" />
                {__("common.forex")}
              </button>
            </Grid>
            <Grid item xs={6}>
              <button
                onClick={() => changePairsType("crypto")}
                type="button"
                className={`tradingPairs__btn ${
                  type === "crypto" ? "active" : ""
                }`}
              >
                <img
                  src={Bitcoin}
                  alt="coin"
                  className="tradingPairs__btn-icon"
                />
                {__("common.crypto")}
              </button>
            </Grid>
          </Grid>

          <ul className="tradingPairs__list">
            {loading ? (
              <Stack spacing="14px">
                {[1, 2, 3].map((item) => (
                  <Skeleton
                    key={item}
                    className="tradingPairs__sceleton"
                    variant="rounded"
                    width="100%"
                    height={25}
                  />
                ))}
              </Stack>
            ) : data.length ? (
              data.map((el) => {
                const { name, payout_week, payout_total, id, cover } = el;
                const currentDate = new Date();
                const isWeekend =
                  currentDate.getDay() === 6 || currentDate.getDay() === 0; // 6 - субота, 0 - неділя

                return (
                  <li key={id} className="tradingPairs__item">
                    <button
                      className="tradingPairs__item-btn"
                      type="button"
                      onClick={() => changeCurrentPair(el)}
                    >
                      <div className="tradingPairs__item-left">
                        <img
                          className="tradingPairs__item-icon"
                          src={cover}
                          alt="#"
                        />
                        <h4 className="tradingPairs__name">{name}</h4>
                      </div>
                      <div className="tradingPairs__item-right">
                        <p className="tradingPairs__item-percent">
                          {isWeekend ? `${payout_week}%` : `${payout_total}%`}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })
            ) : (
              <>
                <p>{__("trading.pairs_nf")}</p>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectPairs;
