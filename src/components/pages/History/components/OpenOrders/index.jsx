import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Box, Skeleton } from "@mui/material";
import "./index.sass";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import { FormattedNumber } from "react-intl";
import { useSelector } from "react-redux";
import "moment/locale/ru";
import {convertToUserTimezone, getUserTimezone} from "@helpers/timezone";

const openOrders = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { __ } = useTranslation();
  const {
    wallet: { active_wallet },
    localization: { locale },
  } = useSelector((state) => state);

  const getOpenOrders = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/bid/history/active");
      setData(resp.data.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getOpenOrders();
  }, [active_wallet]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box sx={{ minWidth: 780 }} className="table">
        <div className="table__tr table__tr--head">
          <Box
            sx={{
              flex: "0 0 29.5%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("history.asset")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 22.2%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("history.total")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 19.5%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("history.investments")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 18%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("history.expiration_time")}</p>
          </Box>
          <Box
            sx={{
              flex: "0 0 10.8%",
            }}
            className="table__td"
          >
            <p className="table__text">{__("history.countdown_time")}</p>
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
                  flex: "0 0 29.5%",
                }}
                className="table__td"
              >
                <p className="table__text">{el.pair_name}</p>
              </Box>
              <Box
                sx={{
                  flex: "0 0 22.2%",
                }}
                className="table__td"
              >
                <p className="table__text">
                  +{el.total_amount - el.contribution}${" "}
                  <span>({el.payout}%)</span>
                </p>
              </Box>
              <Box
                sx={{
                  flex: "0 0 19.5%",
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
                  flex: "0 0 18%",
                }}
                className="table__td"
              >
                <p className="table__text">{convertToUserTimezone(el.closing_at, "YYYY-MM-DD HH:mm:ss")}</p>
              </Box>
              <Box
                sx={{
                  flex: "0 0 10.8%",
                }}
                className="table__td"
              >
                <p className="table__text">
                  {moment.utc(el.closing_at).tz(getUserTimezone()).lang(locale).fromNow(true)}
                </p>
              </Box>
            </div>
          ))
        ) : (
          <p>{__("common.not_found")}</p>
        )}
      </Box>
    </Box>
  );
};

export default openOrders;
