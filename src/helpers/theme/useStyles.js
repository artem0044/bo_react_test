import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../../config";

const useStyles = () => {
  const { theme } = useSelector((state) => state.theme);
  const [styles, setStyles] = useState(getCurrentColors(theme));
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    setStyles(
      isAuth ? getCurrentColors(theme) : getCurrentColors(config.default_theme)
    );
  }, [theme, isAuth]);

  return styles;
};

const getCurrentColors = (theme = "orange") => {
  let palette = {};

  switch (theme) {
    case "green":
      palette = {
        main: "#8EF43D",
        lineArrowDown: "#121212",
        lineArrowDownBg: "#FCC800",
        lineArrowUp: "#121212",
        lineArrowUpBg: "#69D215",
        arrowUpHistory: "#121212",
        arrowUpHistoryBg: "#8EF43D",
        arrDownHistory: "#121212",
        arrDownHistoryBg: "#FAE017",
        secColor: "#ffffff",

        widget: {
          bgWidget: "#202020",
          grid: "rgba(255, 242, 204, 0.06)",
        },
      };
      break;
    case "blue":
      palette = {
        main: "#22AEFF",
        lineArrowDown: "#FFFFFF",
        lineArrowDownBg: "#FFFFFF",
        lineArrowUp: "#121212",
        lineArrowUpBg: "#9E9E9E",
        arrowUpHistory: "#121212",
        arrowUpHistoryBg: "#FFFFFF",
        arrDownHistory: "#FFFFFF",
        arrDownHistoryBg: "#22AEFF",
        secColor: "#ffffff",

        widget: {
          bgWidget: "#202020",
          grid: "rgba(255, 242, 204, 0.06)",
        },
      };
      break;
    case "red":
      palette = {
        main: "#E31D1C",
        lineArrowDown: "#FFFFFF",
        lineArrowDownBg: "#FF1414",
        lineArrowUp: "#FFFFFF",
        lineArrowUpBg: "#000000",
        arrowUpHistory: "#121212",
        arrowUpHistoryBg: "#8EF43D",
        arrDownHistory: "#121212",
        arrDownHistoryBg: "#FAE017",
        secColor: "#ffffff",

        widget: {
          bgWidget: "#202020",
          grid: "rgba(255, 242, 204, 0.06)",
        },
      };
      break;
    case "dark-green":
      palette = {
        main: "#056E52",
        lineArrowDown: "#FFFFFF",
        lineArrowDownBg: "#FFFFFF",
        lineArrowUp: "#FFFFFF",
        lineArrowUpBg: "#FFFFFF",
        arrowUpHistory: "#FFFFFF",
        arrowUpHistoryBg: "#056E52",
        arrDownHistory: "#FFFFFF",
        arrDownHistoryBg: "#FD4840",
        secColor: "#ffffff",

        widget: {
          bgWidget: "#202020",
          grid: "rgba(255, 242, 204, 0.06)",
        },
      };
      break;

    case "white":
      palette = {
        main: "#FF6C22",
        lineArrowDown: "#FFFFFF",
        lineArrowDownBg: "#FFFFFF",
        lineArrowUp: "#FFFFFF",
        lineArrowUpBg: "#FFFFFF",
        arrowUpHistory: "#1B1B1B",
        arrowUpHistoryBg: "#00AD64",
        arrDownHistory: "#FFFFFF",
        arrDownHistoryBg: "#FE3D31",
        secColor: "#000000",

        widget: {
          bgWidget: "#ffffff",
          grid: "rgba(18, 18, 18, 0.06)",
        },
      };
      break;

    default:
      palette = {
        main: "#FF6C22",
        lineArrowDown: "#FFFFFF",
        lineArrowDownBg: "#FFFFFF",
        lineArrowUp: "#FFFFFF",
        lineArrowUpBg: "#FFFFFF",
        arrowUpHistory: "#1B1B1B",
        arrowUpHistoryBg: "#00AD64",
        arrDownHistory: "#FFFFFF",
        arrDownHistoryBg: "#FE3D31",
        secColor: "#ffffff",

        widget: {
          bgWidget: "#121212",
          grid: "rgba(255, 242, 204, 0.06)",
        },
      };
  }

  return palette;
};

export default useStyles;
