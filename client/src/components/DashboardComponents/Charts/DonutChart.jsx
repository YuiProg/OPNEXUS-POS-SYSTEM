import React from "react";
import "./DonutChart.css";
import { PieChart } from '@mui/x-charts/PieChart';

const donutData = [
  { label: 'PHP 18,000', value: 1000, color: '#C4161C' },
  { label: 'PHP 12,320', value: 300, color: '#FFA000' },
  { label: 'PHP 1,500', value: 400, color: '#0088FF' },
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
            series={[
              { 
                innerRadius: 50, 
                outerRadius: 90, 
                data: donutData, 
              }]}
            {...donutSettings}
            sx={{
              '& .MuiPieArc-root': {
                stroke: 'none', // Removes the stroke (outline) // Ensures no stroke width is applied
              },
            }}
          />
        </div>
        <div className="dc-legend">
          <div className="legend-item">
            <div className="legend-circle" style={{backgroundColor: donutData[0].color}}></div>
            <div>
              <h4 className="dc-legend-fund">{donutData[0].label}</h4>
              <p className="dc-legend-label">Sales</p>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-circle" style={{backgroundColor: donutData[1].color}}></div>
            <div>
              <h4 className="dc-legend-fund">{donutData[1].label}</h4>
              <p className="dc-legend-label">Utilities</p>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-circle" style={{backgroundColor: donutData[2].color}}></div>
            <div>
              <h4 className="dc-legend-fund">{donutData[2].label}</h4>
              <p className="dc-legend-label">Labor</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DonutChart;