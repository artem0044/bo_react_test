import {throttle} from "lodash";
import moment from "moment-timezone";
import {getUserTimezone} from "@helpers/timezone";

const channelToSubscription = new Map();


export const subscribeOnStream = (symbolInfo, resolution, onRealtimeCallback, subscriberUID) => {
  const channelString = `SYMBOL.${symbolInfo.ticker}`;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    subscriptionItem.handlers.push(handler);
    return;
  }

  subscriptionItem = {
    subscriberUID,
    resolution,
    handlers: [handler],
  };

  channelToSubscription.set(channelString, subscriptionItem);

  const throttledCallback = throttle((realTimeData) => {
    handler.callback(realTimeData);
  }, 500);

  window.Echo.channel(channelString).listen(
    "ChartUpdate",
    (e) => {
      const realTimeData = {
        time: moment(e.time).tz(getUserTimezone()).valueOf(),
        open: e.open,
        high: e.high,
        low: e.low,
        close: e.close,
      };
      throttledCallback(realTimeData);
    }
  );
}

export const unsubscribeFromStream = (subscriberUID) => {
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      subscriptionItem.handlers.splice(handlerIndex, 1);
      if (subscriptionItem.handlers.length === 0) {
        window.Echo.leave(channelString);
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}