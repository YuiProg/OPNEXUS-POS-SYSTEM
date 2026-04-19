import React from "react";
import "./DonutChart.css";
import { PieChart } from '@mui/x-charts/PieChart';
import DashboardStore from "../../../context/DashboardStore";

const donutSettings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

const MONTH_LABELS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const legendLabels = ["Sales", "VIP Discounts", "VIP Sales", "Non-VIP Sales"];

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      selectedMonth: MONTH_LABELS[new Date().getMonth()],
    };
  }

  componentDidMount() {
    const { getNetProfit } = DashboardStore.getState();
    getNetProfit();

    this.unsubscribe = DashboardStore.subscribe((state) => {
      const monthly = state.netProfit?.data;
      if (monthly && monthly.length > 0) {
        const { selectedMonth } = this.state;
        const found = monthly.find((m) => m.month === selectedMonth);
        this.setState({ chartData: found ? found.data : [] });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { chartData, selectedMonth } = this.state;

    return (
      <div className="dc-container">
        <div className="dc-text">
          <h1 className="dc-title">Net Profit</h1>
          <p className="dc-branch">{selectedMonth} &#40;monthly&#41;</p>
        </div>
        <div className="donut-chart">
          {chartData.length > 0 ? (
            <PieChart
              series={[{ 
                innerRadius: 50, 
                outerRadius: 90, 
                data: chartData,
              }]}
              {...donutSettings}
              sx={{
                '& .MuiPieArc-root': {
                  stroke: 'none',
                },
              }}
            />
          ) : (
            <div className="dc-empty">No data</div>
          )}
        </div>
        <div className="dc-legend">
          {chartData.map((item, index) => (
            <div className="legend-item" key={index}>
              <div className="legend-circle" style={{ backgroundColor: item.color }}></div>
              <div>
                <h4 className="dc-legend-fund">{item.label}</h4>
                <p className="dc-legend-label">{legendLabels[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DonutChart;