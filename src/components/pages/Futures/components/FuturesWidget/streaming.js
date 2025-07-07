import {throttle} from "lodash";

const channelToSubscription = new Map();

export const subscribeOnStream = (symbolInfo, resolution, onRealtimeCallback, subscriberUID) => {
  const symbol = symbolInfo.ticker.toLowerCase(); 
  const interval = resolution.toString();
  const streamUrl = `wss://fstream.binance.com/ws/${symbol}@kline_${interval}m`;
  const channelString = `${symbol}@kline_${interval}m`;

  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    subscriptionItem.handlers.push(handler);
    return;
  }

  const ws = new WebSocket(streamUrl);

  const throttledCallback = throttle((realTimeData) => {
    for (const h of subscriptionItem.handlers) {
      h.callback(realTimeData);
    }
  }, 500);

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (data?.ping) {
      ws.send(JSON.stringify({pong: data.ping}));
      return;
    }
    
    const k = data.k;

    const realTimeData = {
      time: k.t, // start time of this candle
      open: parseFloat(k.o),
      high: parseFloat(k.h),
      low: parseFloat(k.l),
      close: parseFloat(k.c),
    };

    throttledCallback(realTimeData);
  };

  subscriptionItem = {
    subscriberUID,
    resolution,
    handlers: [handler],
    socket: ws,
  };

  channelToSubscription.set(channelString, subscriptionItem);
};


export const unsubscribeFromStream = (subscriberUID) => {
  for (const [channelString, subscriptionItem] of channelToSubscription.entries()) {
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler) => handler.id === subscriberUID
    );

    if (handlerIndex !== -1) {
      subscriptionItem.handlers.splice(handlerIndex, 1);
      if (subscriptionItem.handlers.length === 0) {
        subscriptionItem.socket.close();
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
};
