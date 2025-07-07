import React, {useEffect, useRef, useState} from "react";
import {widget} from "@assets/charting_library";
import datafeed from "./datafeed";
import useStyles from "@helpers/theme/useStyles";
import {useSelector} from "react-redux";
import {BidNotification} from "@components/library";
import {convertToUserTimezone, getUserTimezone} from "@helpers/timezone";
import moment from "moment-timezone";
import "./index.sass";

export const MyTradingViewWidget = () => {
  const chartContainerRef = useRef();
  const styles = useStyles();
  const [myWidget, setMyWidget] = useState(null);
  const {locale} = useSelector((state) => state.localization);
  const [activeShapeIds, setActiveShapeIds] = useState([]);

  const {
    theme: {theme},
    trading: {pair},
    bids: {openedHistory},
  } = useSelector((state) => state);

  const defaultProps = {
    symbol: pair.slug,
    interval: "1",
    libraryPath: "/charting_library/",
    fullscreen: false,
    autosize: true,
    backgroundColor: styles.widget.bgWidget,
    gridColor: styles.widget.grid,
    supports_marks: true,
  };

  const changeSymbol = async () => {
    await myWidget.activeChart().setSymbol(pair.slug, () => {
      showCurrentMarks();
    });
  };

  const showCurrentMarks = () => {
    if (!myWidget) return;

    myWidget.onChartReady(() => {
      const activeSymbolBids = openedHistory.filter(
        (el) => el.pair_name === pair.name
      );
      removeAllShapes();
      activeSymbolBids.forEach((el) => {
        drawMark(
          convertToUserTimezone(el.created_at),
          convertToUserTimezone(el.closing_at),
          el.opening_price,
          el.type,
          parseFloat(el.contribution),
          el.id
        );
      });
    });
  };

  const addShapeIds = (symbolId, shapeIds) => {
    setActiveShapeIds((prev) => [...prev, {symbolId, shapeIds}]);
  };

  const removeAllShapes = () => {
    activeShapeIds.forEach(({shapeIds}) => {
      myWidget.activeChart().removeEntity(shapeIds[0]);
      myWidget.activeChart().removeEntity(shapeIds[1]);
    });

    setActiveShapeIds([]);
  };

  const drawMark = (open, close, price, type, amount, symbolId) => {
    const from = new Date(open).getTime() / 1000;

    const lineColor = type === "up" ? "#00AD64" : "#FE3D31";

    const rayId = myWidget.activeChart().createShape(
      {time: from, price: Number(price)},
      {
        shape: "horizontal_ray",
        lock: true,
        disableSelection: true,
        showInObjectsTree: false,
        ownerStudyId: 'programmatic',
        overrides: {
          linecolor: lineColor,
          lineWidth: 2,
          transparency: 30,
        },
      }
    );

    const textId = myWidget.activeChart().createMultipointShape(
      [
        {time: from, price: Number(price)},
      ],
      {
        shape: "text",
        text: `${type === "up" ? "▲" : "▼"}${amount}$`,
        lock: true,
        disableSelection: true,
        zOrder: 'top',
        ownerStudyId: 'programmatic',
        showInObjectsTree: false,
        overrides: {
          color: "#FFFFFF",
          backgroundColor: lineColor,
          borderColor: lineColor,
          fontsize: 12,
          bold: true,
          fillBackground: true,
        },
      });

    const shapeIds = [rayId, textId];

    addShapeIds(symbolId, shapeIds);
  };

  useEffect(() => {
    if (myWidget) {
      showCurrentMarks();
    }
  }, [openedHistory.length, myWidget]);

  useEffect(() => {
    if (myWidget) {
      changeSymbol();
    }
  }, [pair]);

  useEffect(() => {
    const offset = moment.tz(getUserTimezone()).utcOffset() / 60;
    const savedInterval = localStorage.getItem('tradingview.chart.lastUsedTimeBasedResolution') || defaultProps.interval;

    const widgetOptions = {
      timezone: getUserTimezone(),
      symbol: defaultProps.symbol,
      datafeed: datafeed,
      interval: savedInterval,
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath,
      locale,
      disabled_features: [
        "header_symbol_search",
        "header_compare",
        "header_settings",
        "timeframes_toolbar",
        "show_object_tree",
        "header_saveload",
        "chart_template_storage",
        "library_custom_color_themes",
        "save_chart_properties_to_local_storage",
      ],

      enabled_features: [],
      client_id: defaultProps.clientId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      theme: theme === "white" ? "light" : "dark",
      fullWidth: true,
      custom_timezones: [{
        id: getUserTimezone(),
        alias: `Etc/GMT${offset > 0 ? '-' : '+'}${Math.abs(offset)}`,
        title: getUserTimezone().replace('_', ' '),
      }],
      saveInterval: true,
      autoSave: true,
      overrides: {
        "paneProperties.background": styles.widget.bgWidget,
        "paneProperties.backgroundType": "solid"
      },
      gridColor: styles.widget.grid,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(async () => {
      setMyWidget(tvWidget);
      setTimeout(() => {
        tvWidget.setCSSCustomProperty('--tv-color-pane-background', styles.widget.bgWidget);
        tvWidget.setCSSCustomProperty('--tv-color-platform-background', styles.widget.bgWidget);
      })
    });

    return () => {
      tvWidget.remove();
    };
  }, []);

  useEffect(() => {
    if (myWidget) {
      myWidget.changeTheme(theme === "white" ? "light" : "dark");

      setTimeout(() => {
        myWidget.applyOverrides({
          "paneProperties.background": styles.widget.bgWidget,
          "paneProperties.backgroundType": "solid"
        });
        myWidget.setCSSCustomProperty('--tv-color-pane-background', styles.widget.bgWidget);
        myWidget.setCSSCustomProperty('--tv-color-platform-background', styles.widget.bgWidget);
      })
    }
  }, [styles]);

  return (
    <div className={"TVChartContainer tradingview-widget"}>
      <div
        className="tradingview-widget__wrapper"
        ref={chartContainerRef}
      ></div>
      <BidNotification/>
    </div>
  );
};

export default MyTradingViewWidget;
