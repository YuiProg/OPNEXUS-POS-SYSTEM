import React from "react";
import './TopProducts.css'
import ProgressBar from "../Charts/ProgressBar";

const testData = [
  { id: '01', name: "Burat ng Tralala", bgcolor: "#D63F14", completed: 80, sales: '45' },
  { id: '02', name: "Tae ni Zek", bgcolor: "#FFA000", completed: 60, sales: '29' },
  { id: '03', name: "HDMI ni Boss Jaw", bgcolor: "#0088FF", completed: 50, sales: '18' },
  { id: '04', name: "Motor ni Ed", bgcolor: "#603309", completed: 35, sales: '25' },
];

class TopProducts extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="tp-container">
        <h1 className="tp-title">Top Products</h1>
        <table className="tp-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><ProgressBar bgcolor={item.bgcolor} completed={item.completed} /></td>
                <td>{item.sales}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TopProducts;