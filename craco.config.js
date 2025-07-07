const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@library": path.resolve(__dirname, "src/components/library/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@actions": path.resolve(__dirname, "src/actions/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@helpers": path.resolve(__dirname, "src/helpers/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
    },
  },
};
