import React from "react";
import "./BarsChart.css";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import DashboardStore from "../../../context/DashboardStore";

const xLabels = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

class BarsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlySales: new Array(12).fill(0),
      statsLoading: false,
    };
  }

  componentDidMount() {
    const { getMonthlySales } = DashboardStore.getState();
    getMonthlySales();

    this.unsubscribe = DashboardStore.subscribe((state) => {
      const sales = state.monthlySales?.data;
      let mapped = new Array(12).fill(0);
      
      if (sales && sales.length > 0) {
        mapped = xLabels.map((month) => {
          const found = sales.find((s) => s.month === month);
          return found ? found.total : 0;
        });
      }

      this.setState({ 
        monthlySales: mapped,
        statsLoading: state.statsLoading || false
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { monthlySales, statsLoading } = this.state;
    return (
      <div className="bc-container">
        <span className="bc-label">Performance Metrics</span>
        <h3 className="bc-title">Statistics</h3>
        
        {statsLoading ? (
          <div className="bc-loading">
            <span className="spinner"></span>
          </div>
        ) : (
          <Box sx={{ width: '100%', height: 260, position: 'relative' }}>
            
            {/* Custom HTML Legend Layer - Clean White Text */}
            <div className="bc-custom-legend">
              <span className="legend-color-box"></span>
              <span className="legend-text">Sales</span>
            </div>

            <BarChart
              series={[
                { data: monthlySales, id: 'pvId', color: '#e24b4a' },
              ]}
              margin={{ top: 35, bottom: 30, left: 75, right: 15 }}
              xAxis={[{ 
                data: xLabels, 
                height: 28,
                tickLabelStyle: {
                  fill: 'rgba(255, 255, 255, 0.4)',
                  fontSize: 11,
                  fontWeight: 500,
                },
              }]}
              yAxis={[{ 
                width: 70,
                tickLabelStyle: {
                  fill: 'rgba(255, 255, 255, 0.4)',
                  fontSize: 11,
                  fontWeight: 500,
                },
              }]}
              // Directly forces the internal engine layout to ignore rendering the built-in legend entirely
              legend={{ hidden: true }}
            />
          </Box>
        )}
      </div>
    );
  }
}

export default BarsChart;