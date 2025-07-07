import axios from "axios";
import {getUserTimezone} from "@helpers/timezone";
import {subscribeOnStream, unsubscribeFromStream} from "./streaming";
import store from "../../../../../redux/store";

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
      let from = Math.floor(periodParams.from);
      let to = Math.floor(periodParams.to);

      const intervalMap = {
        '1': '1m',
        '5': '5m',
        '15': '15m',
        '30': '30m',
        '60': '1h',
        '240': '4h',
        'D': '1d',
        'W': '1w',
        'M': '1M'
      };

      const interval = intervalMap[resolution] || '1m';

      const resp = await axios.get(
        `https://fapi.binance.com/fapi/v1/klines`,
        {
          params: {
            symbol: symbolInfo.ticker.toLowerCase(),
            interval: interval,
            startTime: from * 1000,
            endTime: to * 1000,
            limit: 1000
          }
        }
      );

      const data = resp.data.map((obj) => ({
        time: obj[0],
        open: parseFloat(obj[1]),
        high: parseFloat(obj[2]),
        low: parseFloat(obj[3]),
        close: parseFloat(obj[4]),
        volume: parseFloat(obj[5])
      }));

      if (data.length < 1) {
        numberOfEmptyRequests += 1;
        if (numberOfEmptyRequests > 3) {
          onHistoryCallback([], {noData: true});
        } else {
          onHistoryCallback([], {
            nextTime: periodParams.from - 86400
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

    const pricescale  = Number(state.futures.pair.pricescale) ?? 1;

    console.log('chart pricescale', pricescale);
    
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
