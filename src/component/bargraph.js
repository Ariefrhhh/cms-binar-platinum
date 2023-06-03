import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, Legend, registerables } from "chart.js";

Chart.register(Legend, ...registerables);

const BarGraph = (dataReport) => {
  const monthlyReport = dataReport.dataReport;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const labels = monthlyReport.map((data) => data.day.substr(8, 2));
  const dataOrder = monthlyReport.map((data) => data.orderCount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Date",
        backgroundColor: "#586B90",
        data: dataOrder,
      },
    ],
  };

  return (
    <div id="componentBarGraph">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-12 d-flex align-items-center barGraphContainer">
            <div className="titleAreaBarGraph">
              <h5 className="titleBarGraph">Amount of Car Rented</h5>
            </div>
            <div className="barGraphArea flex-fill">
              <Bar options={options} data={data} className="barGraph" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
