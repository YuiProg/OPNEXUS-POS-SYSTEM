import React from "react";
import "./BarsChart.css";
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const pData = [2400, 1398, 4800, 3908, 4800, 3800, 4300, 2000, 4000, 4800, 2600, 3860];
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

class BarsChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bc-container">
        <h3 className="bc-title">Statistics</h3>
        <Box sx={{ width: '100%', height: 300 }}>
          <BarChart
            series={[
              { data: pData, label: 'Sales', id: 'pvId', color: '#E31E24' },
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
                    color: 'white', // Set the legend text color
                  },
                },
              }}
          />
        </Box>
      </div>
    )
  }
}

export default BarsChart;