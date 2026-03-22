import React from "react";
import "./DonutChart.css";
import { PieChart } from '@mui/x-charts/PieChart';

const donutData = [
  { label: 'PHP 18,000', value: 400, color: '#34C759' },
  { label: 'PHP 12,320', value: 300, color: '#FF383C' },
  { label: 'PHP 1,500', value: 300, color: '#0088FF' },
];

const donutSettings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="dc-container">
        <div className="dc-text">
          <h1 className="dc-title">Net Profit</h1>
          <p className="dc-branch">Malolos Branch &#40;monthly&#41;</p>
        </div>
        <div className="donut-chart">
          <PieChart
            series={[{ innerRadius: 50, outerRadius: 100, data: donutData, arcLabel: 'value' }]}
            {...donutSettings}
          />
          <h3 className="dc-label">PHP</h3>
          {/* backend data */}
          <h4 className="dc-value">4,180</h4>
        </div>
        <div className="dc-legend">
          {donutData.map((item, index) => (
            <div key={index} className="dc-legend-item">
              <li className="dc-legend-label">{item.label}</li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DonutChart;