import React from "react";
import './TopProducts.css'
import ProgressBar from "../Charts/ProgressBar";

const testData = [
  { id: '01', name: "Burat ng Tralala", bgcolor: "#D63F14", bgcolor2: "#d63f1440", completed: 80, sales: '45' },
  { id: '02', name: "Tae ni Zek", bgcolor: "#FFA000", bgcolor2: "#ffa00040", completed: 60, sales: '29' },
  { id: '03', name: "HDMI ni Boss Jaw", bgcolor: "#0088FF", bgcolor2: "#0088FF40", completed: 50, sales: '18' },
  { id: '04', name: "Motor ni Ed", bgcolor: "#603309", bgcolor2: "#60330940", completed: 35, sales: '25' },
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
                <td><ProgressBar bgcolor={item.bgcolor} bgcolor2={item.bgcolor2} completed={item.completed} /></td>
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