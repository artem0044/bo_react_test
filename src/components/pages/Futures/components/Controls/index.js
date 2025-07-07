import React, {useEffect, useState} from "react";
import Slider from "@mui/material/Slider";
import {Grid} from "@mui/material";
import {AdiustLeveragePopup} from "@components/library";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {PostOrder, PostPosition} from "@actions/futures";
import {formatCost} from "@helpers/formatNumber";
import {useTranslation} from "@helpers/translate";

const marks = [{
  value: 0, label: '0%',
}, {
  value: 25, label: '25%',
}, {
  value: 50, label: '50%',
}, {
  value: 75, label: '75%',
}, {
  value: 100, label: '100%',
},];

export const Controls = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [showControls, setShowControls] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const {price: currentPrice, pair} = useSelector((state) => state.futures);
  const [price, setPrice] = useState(currentPrice);
  const [leverage, setLeverage] = useState(20);
  const [longStats, setLongStats] = useState({max: 0, liqPrice: 0, quantity: 0});
  const [shortStats, setShortStats] = useState({max: 0, liqPrice: 0, quantity: 0});
  const [percentage, setPercentage] = useState(1);
  const [cost, setCost] = useState(0.1);
  const [autoCost, setAutoCost] = useState(true);
  const [isPriceReady, setIsPriceReady] = useState(false);
  const {active_wallet: {balance}} = useSelector((state) => state.wallet);
  const [type, setType] = useState('limit');
  const dispatch = useDispatch();
  const {__} = useTranslation();

  useEffect(() => {
    const quantity = (balance * (percentage / 100)) * leverage / currentPrice;
    const size = quantity * currentPrice;
    const initialMargin = size / leverage;

    const longLiqPrice = currentPrice * (1 - initialMargin / size);
    const shortLiqPrice = currentPrice * (1 + initialMargin / size);
    const max = balance * leverage;

    setLongStats({
      max, liqPrice: longLiqPrice, quantity
    });

    setShortStats({
      max, liqPrice: shortLiqPrice, quantity
    });
  }, [balance, currentPrice, leverage, percentage]);

  useEffect(() => {
    if (!autoCost) return;
    const quantity = (balance * (percentage / 100)) * leverage / currentPrice;
    const cost = quantity * currentPrice / leverage;

    if (!isNaN(cost)) {
      setCost(formatCost(cost));
    }
  }, [percentage, leverage, currentPrice, balance]);

  useEffect(() => {
    setIsPriceReady(false);
  }, [pair?.slug]);

  useEffect(() => {
    if (currentPrice && !isPriceReady) {
      setPrice(currentPrice);
      setIsPriceReady(true);
    }
  }, [currentPrice]);

  const clickDirection = (side) => {
    console.log(pair)
    const baseData = {
      side: side,
      symbol: pair.slug,
      futures_pair_id: pair.id,
      percentage: percentage,
      leverage: leverage,
    };

    if (type === 'limit') {
      const data = {...baseData, price: price, type: type, amount: cost};
      dispatch(PostOrder(data));
    } else if (type === 'market') {
      const data = {...baseData, entry_price: currentPrice, type: type, margin: cost};
      dispatch(PostPosition(data));
    }
  };

  const onCostChange = (e) => {
    let inputValue = e.target.value.replace(',', '.');
    let newCost = parseFloat(inputValue);

    if (isNaN(newCost) || newCost < 0.01) {
      newCost = 0.01;
    }

    setAutoCost(false);

    if (newCost > balance) {
      newCost = balance;
    }

    setCost(formatCost(newCost));

    if (balance > 0) {
      const newPercentage = (newCost / balance) * 100;
      setPercentage(Math.min(Math.max(newPercentage, 0), 100));
    } else {
      setPercentage(0);
    }
  }

  return (<>
    <div className={`futuresControls${showControls ? ' active' : ''}`}>
      <div className="futuresControls__head">
        <p className="futuresControls__head-title">{__("futures.isolated")}</p>
        <div>
          <button onClick={() => setShowPopup(true)} type="button" className="futuresControls__scale">{leverage}x
          </button>
          {!isDesktop &&
            <button onClick={() => setShowControls(false)} type="button" className="futuresControls__close">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.3632 13.6367L12.9087 14.0912C12.6576 14.3423 12.2506 14.3424 11.9995 14.0913L6.77197 8.86375L1.5444 14.0913C1.29341 14.3423 0.88634 14.3423 0.635282 14.0912L0.180758 13.6367C-0.0703005 13.3857 -0.0703013 12.9786 0.180689 12.7276L5.40826 7.50004L0.180716 2.27249C-0.0703357 2.02144 -0.0703221 1.61439 0.180737 1.36333L0.63526 0.908807C0.886319 0.657749 1.29337 0.657735 1.54442 0.908787L6.77197 6.13633L11.9995 0.908774C12.2506 0.657723 12.6576 0.657743 12.9087 0.908802L13.3632 1.36333C13.6143 1.61438 13.6143 2.02143 13.3632 2.27248L8.13567 7.50004L13.3632 12.7276C13.6143 12.9787 13.6142 13.3857 13.3632 13.6367Z"
                  fill="#868686"/>
              </svg>
            </button>}
        </div>
      </div>
      <div className="futuresControls__body">
        <div className="futuresControls__tabs">
          <button onClick={() => setType('limit')} type="button"
                  className={`futuresControls__tab${type === 'limit' ? ' futuresControls__tab--active' : ''}`}>{__("futures.limit")}
          </button>
          <button onClick={() => setType('market')} type="button"
                  className={`futuresControls__tab${type === 'market' ? ' futuresControls__tab--active' : ''}`}>{__("futures.market")}
          </button>
        </div>

        <p className="futuresControls__text">{__("futures.available_balance")}</p>

        {type === "limit" &&
          <label className="futuresControls__inp-wrap futuresControlsInput">
            <div className="futuresControlsInput__left">
              <p className="futuresControlsInput__lalel-text">{__("futures.price")}</p>
              <input
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                type="number"
                className="futuresControlsInput__input"/>
            </div>
            <div className="futuresControlsInput__right">
              <span className="futuresControlsInput__curreny">USDT</span>
            </div>
          </label>
        }

        <label className="futuresControls__inp-wrap futuresControlsInput">
          <div className="futuresControlsInput__left">
            <p className="futuresControlsInput__lalel-text">{__("futures.cost")}</p>
            <input
              value={cost}
              onChange={onCostChange}
              type="number"
              min={0.01}
              className="futuresControlsInput__input"/>
          </div>
          <div className="futuresControlsInput__right">
            <span className="futuresControlsInput__curreny">USDT</span>
          </div>
        </label>

        <Slider
          className="custom-range"
          aria-label="Temperature"
          value={percentage}
          onChange={(e, val) => {
            setAutoCost(true);
            if (val === 0) {
              setPercentage(1)
            } else {
              setPercentage(val)
            }
          }}
          marks={marks}
          step={1}
          min={0}
          max={100}
        />
      </div>
      <div className="futuresControls__footer">
        <div className="futuresControls__btns">
          <button onClick={() => clickDirection(type === 'limit' ? 'buy' : 'long')} type="button"
                  className="futuresControls__btn-buy">
            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" width="162" height="42"
                 viewBox="0 0 162 42" fill="none">
              <path
                d="M0 7C0 3.13401 3.13401 0 7 0H154.944C161.336 0 164.384 7.86239 159.662 12.1708L128.977 40.1708C127.687 41.3476 126.005 42 124.259 42H7C3.13401 42 0 38.866 0 35V7Z"
                fill="#21B45F"/>
            </svg>
            <span>{__("futures.long")}</span>
          </button>
          <button onClick={() => clickDirection(type === 'limit' ? 'sell' : 'short')} type="button"
                  className="futuresControls__btn-sell">
            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" width="162" height="42"
                 viewBox="0 0 162 42" fill="none">
              <path
                d="M33.0229 1.8292C34.3126 0.652401 35.9954 0 37.7413 0H155C158.866 0 162 3.13401 162 7V35C162 38.866 158.866 42 155 42H7.05625C0.664406 42 -2.38366 34.1376 2.33791 29.8292L33.0229 1.8292Z"
                fill="#FF2828"/>
            </svg>
            <span>{__("futures.short")}</span>
          </button>
        </div>

        <Grid container spacing="10px">
          <Grid item xs={6}>
            <ul className="futuresControls__info-list">
              <li className="futuresControls__info-item">
                <p className="futuresControls__info-text">{__("futures.liq_price")}<span>{isNaN(longStats.liqPrice) ? '--' : longStats.liqPrice.toFixed(1)} USDT</span></p>
              </li>
              <li className="futuresControls__info-item">
                <p
                  className="futuresControls__info-text">{__("futures.quantity")}<span>{isNaN(shortStats.quantity) ? '--' : shortStats.quantity.toFixed(2)} BTC</span>
                </p>
              </li>
              <li className="futuresControls__info-item">
                <p className="futuresControls__info-text">{__("futures.max")}<span>{longStats.max.toFixed(2)} USDT</span></p>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6}>
            <ul className="futuresControls__info-list futuresControls__info-list--right">
              <li className="futuresControls__info-item">
                <p className="futuresControls__info-text">{__("futures.liq_price")}<span>{isNaN(shortStats.liqPrice) ? '--' : shortStats.liqPrice.toFixed(1)} USDT</span></p>
              </li>
              <li className="futuresControls__info-item">
                <p
                  className="futuresControls__info-text">{__("futures.quantity")}<span>{isNaN(shortStats.quantity) ? '--' : shortStats.quantity.toFixed(2)} BTC</span>
                </p>
              </li>
              <li className="futuresControls__info-item">
                <p className="futuresControls__info-text">{__("futures.max")}<span>{shortStats.max.toFixed(2)} USDT</span></p>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>

    </div>
    {!isDesktop && <>
      <div className="futuresControlsBg" onClick={() => setShowControls(false)}></div>
      <div className="futuresControlsMob">
        <div className="futuresControls__btns">
          <button onClick={() => setShowControls(true)} type="button" className="futuresControls__btn-buy">
            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" width="162" height="42"
                 viewBox="0 0 162 42" fill="none">
              <path
                d="M0 7C0 3.13401 3.13401 0 7 0H154.944C161.336 0 164.384 7.86239 159.662 12.1708L128.977 40.1708C127.687 41.3476 126.005 42 124.259 42H7C3.13401 42 0 38.866 0 35V7Z"
                fill="#21B45F"/>
            </svg>
            <span>{__("futures.long")}</span>
          </button>
          <button onClick={() => setShowControls(true)} type="button" className="futuresControls__btn-sell">
            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" width="162" height="42"
                 viewBox="0 0 162 42" fill="none">
              <path
                d="M33.0229 1.8292C34.3126 0.652401 35.9954 0 37.7413 0H155C158.866 0 162 3.13401 162 7V35C162 38.866 158.866 42 155 42H7.05625C0.664406 42 -2.38366 34.1376 2.33791 29.8292L33.0229 1.8292Z"
                fill="#FF2828"/>
            </svg>
            <span>{__("futures.short")}</span>
          </button>
        </div>
      </div>
    </>}
    <AdiustLeveragePopup show={showPopup} setShow={setShowPopup} leverage={leverage} setLeverage={setLeverage}/>
  </>)
}