import React, { useLayoutEffect } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import Input from "../../component/input";
import { Button } from "reactstrap";

const Home = () => {
  useLayoutEffect(() => {
    Chart();
  }, []);
  return (
    <div>
      <div className="px-5 pt-1">
        <h4>Rented Car Data Visualization</h4>
        <p>Month</p>
        <div className="d-flex">
          <Input className="search-input"></Input>
          <div>
            <Button
              className="search-btn text-center"
              style={{ backgroundColor: "#0D28A6" }}
            >
              Go
            </Button>
          </div>
        </div>
      </div>
      <div
        className="barchart"
        style={{ width: "100%", height: "500px" }}
        id="chart"
      ></div>
    </div>
  );
};

export const Chart = () => {
  /* Chart code */

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  let root = am5.Root.new("chart");

  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  let cursor = chart.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      behavior: "zoomX",
    })
  );
  cursor.lineY.set("visible", false);

  let date = new Date();
  date.setHours(0, 0, 0, 0);
  let value = 100;

  function generateData() {
    value = Math.round(Math.random() * 10 - 5 + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value,
    };
  }

  function generateDatas(count) {
    let data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  let xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 60,
      }),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}",
      }),
    })
  );

  series.columns.template.setAll({ strokeOpacity: 0 });

  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set(
    "scrollbarX",
    am5.Scrollbar.new(root, {
      orientation: "horizontal",
    })
  );

  let data = generateDatas(50);
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
};
export default Home;
