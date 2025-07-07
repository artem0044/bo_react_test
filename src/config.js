const config = {
  // Configuration file
  api_url: process.env.REACT_APP_API_URL,

  default_locale: "en",
  default_theme: "orange",
  default_title: "Binify",
  local_state_name: "binify_state",
  default_pair: {
    slug: "EURUSD",
    name: "EURUSD",
    cover: `../images/icons/EUR/USD.svg`,
    pricescale: "100000",
  },
  default_futures_pair: {
    slug: "BTCUSDT",
    name: "BTCUSDT",
    cover: `../images/icons/btc.png`,
    pricescale: "100000",
  },
  supported_locales: process.env.REACT_APP_LANGS.split(","),
  pusher_key: process.env.REACT_APP_PUSHER_KEY,
  pusher_cluster: process.env.REACT_APP_PUSHER_CLUSTER,

  infoEmail: "info@binify.com",
  supportEmail: "support@binify.com",
  
  tradermade_key: process.env.REACT_APP_TRADERMADE_KEY,
};

export default config;
