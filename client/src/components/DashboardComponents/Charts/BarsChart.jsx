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
      if (sales && sales.length > 0) {
        const mapped = xLabels.map((month) => {
          const found = sales.find((s) => s.month === month);
          return found ? found.total : 0;
        });
        this.setState({ monthlySales: mapped });
      }
      this.setState({ statsLoading: state.statsLoading });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { monthlySales, statsLoading } = this.state;
    return (
      <div className="bc-container">
        <h3 className="bc-title">Statistics</h3>
        {statsLoading ? (
          <div className="bc-loading">
            <span className="spinner"></span>
          </div>
        ) : (
          <Box sx={{ width: '100%', height: 300 }}>
            <BarChart
              series={[
                { data: monthlySales, label: 'Sales', id: 'pvId', color: '#E31E24' },
              ]}
              xAxis={[{ 
                data: xLabels, 
                height: 28,
                tickLabelStyle: {
                  fill: 'white',
                  fontWeight: 10,
                },
              }]}
              yAxis={[{ 
                width: 50,
                tickLabelStyle: {
                  fill: 'white',
                  fontWeight: 10,
                },
              }]}
              slotProps={{
                legend: {
                  direction: 'horizontal',
                  position: { vertical: 'top', horizontal: 'center' },
                  padding: 0,
                  itemMarkWidth: 10,
                  itemMarkHeight: 10,
                  sx: {
                    color: 'white',
                  },
                },
              }}
            />
          </Box>
        )}
      </div>
    );
  }
}

export default BarsChart;