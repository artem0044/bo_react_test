import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "@helpers/translate";
import axios from "@helpers/axios/private.axios";
import {FUTURES} from "../../../../../constants";
import {debounce, Skeleton, Stack} from "@mui/material";

export const FuturesPairs = () => {
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {__} = useTranslation();
  const {pair} = useSelector((state) => state.futures);

  const getPairs = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('/futures-pairs');
      setData(data.data);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPairs();
  }, []);

  const changeCurrentPair = (pair) => {
    setPopup(false);
    dispatch({type: FUTURES.CHANGE_PAIR, payload: pair});
  };

  const getSearchPairs = useCallback(
    debounce(async (name) => {
      if (name.trim() === "") {
        getPairs();
        return;
      }

      try {
        const resp = await axios.post("/futures-pairs/search", {
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

  return (<div className={`futures-quote__current-pair-wrap${popup ? ' active' : ''}`}>
    <button onClick={() => setPopup(true)} type="button" className="futures-quote__current-pair">
      <img className="futures-quote__current-pair-icon" src={pair.icon} alt="Pair Icon"/>
      <div className="futures-quote__current-pair-info">
        <h3 className="futures-quote__current-pair-title">{pair.name}</h3>
        <p className="futures-quote__current-pair-text">Bitcoin</p>
      </div>
    </button>
    <div onClick={() => setPopup(false)} className="tradingPairs__bg"></div>
    <div className="tradingPairs__content">
      <h3 className="tradingPairs__title">Futures</h3>
      <input
        value={search}
        type="text"
        className="tradingPairs__input"
        placeholder="EURUSDT"
        onChange={(e) => searchPairs(e.target.value)}
      />
      <div className="tradingPairs__btns">
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
              const {name, id, cover_url} = el;
              return (
                <li key={id} className="tradingPairs__item">
                  <button
                    className="tradingPairs__item-btn"
                    type="button"
                    onClick={() => changeCurrentPair({...el, icon: cover_url})}
                  >
                    <div className="tradingPairs__item-left">
                      <img
                        className="tradingPairs__item-icon"
                        src={cover_url}
                        alt="#"
                      />
                      <h4 className="tradingPairs__name">{name}</h4>
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
  </div>)
}