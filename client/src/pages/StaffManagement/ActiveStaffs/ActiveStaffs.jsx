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
];

class ActiveStaffs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="as-container">
        <h1 className="as-header">Active Clerks</h1>
        <ul className="staff-list">
          {staffData.map((index, idx) => {
            return (
              <li key={idx} className="staff">
                <div className="staff-icon"><CircleUserRound className="icon-pic"/></div>
                <div className="staff-details">
                  <div className="staff-name">{index.name}</div>
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