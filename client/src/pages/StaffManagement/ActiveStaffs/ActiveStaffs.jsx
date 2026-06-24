import React from "react";
import './ActiveStaffs.css'
import { Wifi } from 'lucide-react';

class ActiveStaffs extends React.Component {
  constructor(props) {
    super(props);
  }

  getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  render() {
    const { staffData } = this.props;
    const clerks = staffData.filter((d) => d.role === "Clerk");

    return (
      <div className="as-container">
        <div className="as-top">
          <div className="as-top-left">
            <span className="as-live-dot" />
            <div className="as-top-left-texts">
              <p className="as-eyebrow">Management Console</p>
              <h2 className="as-header">Active Clerks</h2>
            </div>
          </div>
          <span className="as-count">{clerks.length}</span>
        </div>

        <ul className="staff-list">
          {Array.isArray(clerks) && clerks.length > 0 ? (
            clerks.map((clerk, idx) => (
              <li key={idx} className="staff-item">
                <div className="staff-avatar">
                  {this.getInitials(clerk.username)}
                </div>
                <div className="staff-details">
                  <p className="staff-name">{clerk.username}</p>
                  <p className="staff-role">{clerk.role}</p>
                </div>
                <div className="staff-online-indicator" title="Online" />
              </li>
            ))
          ) : (
            <li className="staff-empty">
              <Wifi size={20} className="staff-empty-icon" />
              <p>No active clerks found.</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default ActiveStaffs;