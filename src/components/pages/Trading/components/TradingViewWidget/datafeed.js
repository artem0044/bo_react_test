import axios from "axios";
import store from "../../../../../redux/store";
import moment from "moment-timezone";
import {formatUTC, getAdjustedTime, getUserTimezone} from "@helpers/timezone";
import config from "../../../../../config";
import {
  subscribeOnStream,
  unsubscribeFromStream
} from "./streaming";

const configurationData = {
  supported_resolutions: ["1", "5", "10", "15", "30"],
};

let numberOfEmptyRequests = 0;

export default {
  onReady: (callback) => {
    setTimeout(() => callback(configurationData));
  },
  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback
  ) => {
    try {
      let from, to;

      const currentDay = moment().utc().day();
      const {from: periodFrom, to: periodTo, firstDataRequest} = periodParams;

      if (currentDay === 6 || currentDay === 0) {
        const dayOffset = currentDay === 6 ? 1 : 2;

        from = getAdjustedTime(periodFrom, dayOffset, "days");
        to = getAdjustedTime(periodTo, dayOffset, "days");

      } else {
        from = getAdjustedTime(periodTo, 2, "days");
        to = formatUTC(periodTo);

        if (firstDataRequest) {
          to = getAdjustedTime(periodTo, 1, "minute");
        }
      }

      const resp = await axios.get(
        `https://marketdata.tradermade.com/api/v1/timeseries?currency=${symbolInfo.ticker}&api_key=${config.tradermade_key}&start_date=${from}&end_date=${to}&format=records&period=${resolution}&interval=minute`
      );

      const data = resp.data.quotes.map((obj) => {
        return {
          time: moment(obj.date).utc(obj.date).tz(getUserTimezone()).valueOf(),
          ...obj,
        };
      });

      if (data.length < 1) {
        numberOfEmptyRequests += 1;

        if (numberOfEmptyRequests > 3) {
          onHistoryCallback([], {noData: true});
        } else {
          onHistoryCallback([], {
            nextTime: moment(periodParams.from * 1000)
              .utc()
              .tz(getUserTimezone())
              .subtract(1, "days")
              .unix()
          });
        }
      } else {
        numberOfEmptyRequests = 0;
        onHistoryCallback(data, {noData: false});
      }
    } catch (e) {
      onHistoryCallback([], {noData: true});
    }
  },
  resolveSymbol: async (symbolName, onSymbolResolvedCallback) => {
    const state = store.getState();

    const pricescale = Number(state.trading.pair.pricescale)
      ? Number(state.trading.pair.pricescale)
      : 1;

    const symbol = {
      ticker: symbolName,
      session: "24x7",
      timezone: getUserTimezone(),
      minmov: 1,
      pricescale,
      has_intraday: true,
      has_weekly_and_monthly: false,
      volume_precision: 1,
      data_status: "streaming",
    };

    setTimeout(() => {
      onSymbolResolvedCallback(symbol);
    })
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    // onResetCacheNeededCallback,
  ) => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      // onResetCacheNeededCallback,
      // lastBarsCache.get(symbolInfo.full_name),
    );
  },
  unsubscribeBars: (subscriberUID) => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    unsubscribeFromStream(subscriberUID);
  },
};
