import React from "react";
import "./DonutChart.css";
import { PieChart } from '@mui/x-charts/PieChart';
import DashboardStore from "../../../context/DashboardStore";

const donutSettings = {
  margin: { top: 10, bottom: 10, left: 10, right: 10 },
  width: 200,
  height: 200,
};

const MONTH_LABELS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const legendLabels = ["Sales", "VIP Discounts", "VIP Sales", "Non-VIP Sales"];

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      selectedMonth: MONTH_LABELS[new Date().getMonth()],
      netProfitLoading: false,
    };
  }

  componentDidMount() {
    const { getNetProfit } = DashboardStore.getState();
    
    this.setState({ netProfitLoading: true });
    getNetProfit();

    this.unsubscribe = DashboardStore.subscribe((state) => {
      const monthly = state.netProfit?.data;
      this.setState({ netProfitLoading: state.netProfitLoading || false });
      if (monthly && monthly.length > 0) {
        const { selectedMonth } = this.state;
        const found = monthly.find((m) => m.month === selectedMonth);
        this.setState({ chartData: found ? found.data : this.state.chartData });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { chartData, selectedMonth, netProfitLoading } = this.state;

    return (
      <div className="dc-container">
        <div className="dc-header">
          <div className="dc-title-group">
            <span className="dc-label">Performance Breakdown</span>
            <h3 className="dc-title">Net Profit</h3>
          </div>
          <span className="dc-branch">{selectedMonth} (Monthly)</span>
        </div>

        {netProfitLoading ? (
          <div className="dc-loading">
            <span className="dc-spinner"></span>
          </div>
        ) : (
          <div className="dc-content-body">
            <div className="donut-chart-wrapper">
              {chartData.length > 0 ? (
                <PieChart
                  series={[{ 
                    innerRadius: 60, 
                    outerRadius: 85, 
                    data: chartData,
                    paddingAngle: 2, 
                    cornerRadius: 4,
                  }]}
                  {...donutSettings}
                  // Suppresses the hidden dark text layout block entirely
                  slotProps={{
                    legend: {
                      hidden: true
                    }
                  }}
                  sx={{
                    '& .MuiPieArc-root': {
                      stroke: 'none',
                    },
                    // Absolute fallback layout pruning for native legend elements
                    '& .MuiChartsLegend-root, & .MuiChartsLegend-series text': {
                      display: 'none !important',
                    }
                  }}
                />
              ) : (
                <div className="dc-empty">No data available</div>
              )}
            </div>
            
            {/* Custom Bottom Legend - Colors and text align correctly */}
            <div className="dc-legend">
              {chartData.map((item, index) => (
                <div className="legend-item" key={index}>
                  <span className="legend-circle" style={{ backgroundColor: item.color || '#e24b4a' }}></span>
                  <div className="legend-texts">
                    <h4 className="dc-legend-fund">
                      {item.value?.toLocaleString() || item.total?.toLocaleString() || 0}
                    </h4>
                    <p className="dc-legend-label">{legendLabels[index] || item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DonutChart;