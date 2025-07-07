import React, { useEffect, useState } from "react";
import { Box, MenuItem, Pagination, Select, Skeleton } from "@mui/material";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import { FormattedNumber } from "react-intl";
import { useSelector } from "react-redux";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/es";

import "./index.sass";
import {
  LeftArrowIcon,
  RightArrowIcon,
  SwitchViewButton,
} from "@components/pages/MyProfile/components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { enUS, esES, ruRU } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import {convertToUserTimezone} from "@helpers/timezone";

const TradeHistory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { __ } = useTranslation();
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);
  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState(null);
  const [date, setDate] = useState(null);
  const {
    wallet: { active_wallet },
  } = useSelector((state) => state);
  const { locale } = useSelector((state) => state.localization);

  const getTradeHistory = async (page = "1", date, asset) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `/bid/history/closed?page=${page}&paginate=5${
          date ? "&date=" + date : ""
        }
        ${asset ? "&asset=" + asset : ""}
     `
      );
      setData(resp.data.data);
      setLoading(false);
      setTotalPages(resp.data.pagination.total);
    } catch (e) {
      console.error(e);
    }
  };

  const getAssetOptions = async () => {
    try {
      const resp = await axios.get("bid/assets/closed");
      console.log((await resp).data);

      console.log(resp.data.data.map((el) => el.name));

      setAssets(resp.data.data.map((el) => el.name));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAssetOptions();
  }, []);

  useEffect(() => {
    getTradeHistory(currentPage, date, asset);
  }, [currentPage, date, asset]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getTradeHistory(currentPage);
    }
  }, [active_wallet]);
  const changePage = (event, page) => {
    setCurrentPage(page);
  };

  const localeText = () => {
    if (locale === "ru") {
      return ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
    } else if (locale === "es") {
      return esES.components.MuiLocalizationProvider.defaultProps.localeText;
    } else {
      return enUS.components.MuiLocalizationProvider.defaultProps.localeText;
    }
  };

  const assetChange = (e) => {
    setAsset(e.target.value);
  };

  const dateChange = (val) => {
    setDate(dayjs(val).format("YYYY-MM-DD"));
  };
  return (
    <>
      <div className="tradingHistoryHead">
        <Select
          className={`tradingHistoryHead__select bo-select-mini ${
            openSelect ? "open" : ""
          }`}
          value={asset}
          onChange={assetChange}
          variant="standard"
          onOpen={() => setOpenSelect(true)}
          onClose={() => setOpenSelect(false)}
          MenuProps={{
            className: "bo-select-mini-content",
          }}
          IconComponent={(props) => {
            return (
              <svg
                {...props}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9467 5.45312H7.79341H4.05341C3.41341 5.45312 3.09341 6.22646 3.54674 6.67979L7.00008 10.1331C7.55341 10.6865 8.45341 10.6865 9.00674 10.1331L10.3201 8.81979L12.4601 6.67979C12.9067 6.22646 12.5867 5.45312 11.9467 5.45312Z"
                  fill="#707070"
                />
              </svg>
            );
          }}
        >
          {assets.map((asset) => {
            return <MenuItem value={asset}>{asset}</MenuItem>;
          })}
        </Select>
        <div className="tradingHistoryHead__date">
          <LocalizationProvider
            c
            adapterLocale={locale}
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              dayOfWeekFormatter={(day) => {
                return day.slice(0, 2);
              }}
              locale={locale}
              localeText={localeText()}
              format="DD/MM/YYYY"
              slotProps={{
                popper: {
                  className: "bo-calendar-popper",
                },
                mobilePaper: {
                  className: "bo-calendar-popper",
                },
              }}
              className="bo-calendar"
              components={{
                LeftArrowIcon,
                RightArrowIcon,
                SwitchViewButton,
              }}
              // value={field.value} // Format the date manually
              // defaultValue={field.value}
              onChange={dateChange}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 1008 }} className="table">
          <div className="table__tr table__tr--head">
            <Box
              sx={{
                flex: "0 0 16%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.purchase_time")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 15.8%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.closing_time")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 12%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.asset")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 11.3%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.time")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 18%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.investments")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 13.2%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.total")}</p>
            </Box>
            <Box
              sx={{
                flex: "0 0 13.7%",
              }}
              className="table__td"
            >
              <p className="table__text">{__("history.equity")}</p>
            </Box>
          </div>

          {loading ? (
            <>
              <div className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
              <div className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
              <div className="table__tr">
                <Skeleton
                  className="table__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </div>
            </>
          ) : data.length ? (
            data.map((el) => (
              <div key={el.id} className="table__tr">
                <Box
                  sx={{
                    flex: "0 0 16%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{convertToUserTimezone(el.created_at, "YYYY-MM-DD HH:mm:ss")}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 15.8%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{convertToUserTimezone(el.closing_at, "YYYY-MM-DD HH:mm:ss")}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 12%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{el.pair_name}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 11.3%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">{el.expatriation}</p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 18%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">
                    <FormattedNumber
                      value={el.contribution}
                      style="currency"
                      currency="USD"
                    />
                  </p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 13.2%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">
                    <FormattedNumber
                      value={el.profit}
                      style="currency"
                      currency="USD"
                    />{" "}
                    <span>{el.payout}%</span>
                  </p>
                </Box>
                <Box
                  sx={{
                    flex: "0 0 13.7%",
                  }}
                  className="table__td"
                >
                  <p className="table__text">
                    <FormattedNumber
                      value={el.total_amount}
                      style="currency"
                      currency="USD"
                    />
                  </p>
                </Box>
              </div>
            ))
          ) : (
            <p>{__("common.not_found")}</p>
          )}
        </Box>
      </Box>
      {totalPages !== 1 && (
        <Pagination
          className="pagination"
          count={totalPages}
          page={currentPage}
          onChange={changePage}
          variant="outlined"
          shape="rounded"
        />
      )}
    </>
  );
};

export default TradeHistory;
