import React from "react";
import './ActiveStaffs.css'
import { CircleUserRound } from 'lucide-react';

const staffData = [
  { name: 'Neg Neg', role: 'Clerk' },
  { name: 'Zeendy Ann Wukong', role: 'Clerk' },
  { name: 'Aki Tinukmol', role: 'Clerk' },
  { name: 'Violet Alaw Pwet', role: 'Clerk' },
  { name: 'Theorra Binomba', role: 'Clerk' },
  { name: 'Levi Inadik RP', role: 'Clerk' },
  { name: 'Waffle Nasampol', role: 'Clerk' },
  { name: 'Jaooo Tungaooo', role: 'Clerk' },
  { name: 'China Balyena', role: 'Clerk' },
  { name: 'Shiloh Kulang sa Paloh', role: 'Clerk' },
  { name: 'Neg Neg', role: 'Clerk' },
  { name: 'Zeendy Ann Wukong', role: 'Clerk' },
  { name: 'Aki Tinukmol', role: 'Clerk' },
  { name: 'Violet Alaw Pwet', role: 'Clerk' },
  { name: 'Theorra Binomba', role: 'Clerk' },
  { name: 'Levi Inadik RP', role: 'Clerk' },
  { name: 'Waffle Nasampol', role: 'Clerk' },
  { name: 'Jaooo Tungaooo', role: 'Clerk' },
  { name: 'China Balyena', role: 'Clerk' },
  { name: 'Shiloh Kulang sa Paloh', role: 'Clerk' },
  { name: 'Neg Neg', role: 'Clerk' },
  { name: 'Zeendy Ann Wukong', role: 'Clerk' },
  { name: 'Aki Tinukmol', role: 'Clerk' },
  { name: 'Violet Alaw Pwet', role: 'Clerk' },
  { name: 'Theorra Binomba', role: 'Clerk' },
  { name: 'Levi Inadik RP', role: 'Clerk' },
  { name: 'Waffle Nasampol', role: 'Clerk' },
  { name: 'Jaooo Tungaooo', role: 'Clerk' },
  { name: 'China Balyena', role: 'Clerk' },
  { name: 'Shiloh Kulang sa Paloh', role: 'Clerk' },
];

class ActiveStaffs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { staffData } = this.props;
    // const clerks = staffData.filter((d) => d.role === "Clerk");
    return (
      <div className="as-container">
        <h1 className="as-header">Active Clerks</h1>
        <ul className="staff-list">
          {/* {Array.isArray(clerks) && clerks.length > 0 ? (
            clerks.map((index, idx) => {
            return (
              <li key={idx} className="staff">
                <div className="staff-icon"><CircleUserRound className="icon-pic"/></div>
                <div className="staff-details">
                  <div className="staff-name">{index.username}</div>
                  <div className="staff-role">{index.role}</div>
                </div>
              </li>
            );
          })
          ) : (<p>No active clerk/s found.</p>)} */}
          {staffData.map((index, idx) => {
            return (
              <li key={idx} className="staff">
                <div className="staff-icon"><CircleUserRound className="icon-pic"/></div>
                <div className="staff-details">
                  <div className="staff-name">{index.username}</div>
                  <div className="staff-role">{index.role}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

export default ActiveStaffs;