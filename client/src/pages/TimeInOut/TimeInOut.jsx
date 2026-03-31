import React from "react";
import "./TimeInOut.css";
import { Table } from "../../components/TRTable/TrTable";
import Button from "../../components/TRButton/Button";
import TimeInOutStore from "../../context/TimeinOut";
import { CircleUserRound } from 'lucide-react';

class TimeInOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.timenow(),
      date: this.dateNow()
    };
  }

  componentDidMount() {
    const { getData } = TimeInOutStore.getState();
    
    this.interval = setInterval(() => {
      this.setState({ time: this.timenow(), date: this.dateNow()});
    }, 1000);

    getData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timenow = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  }

    dateNow = () => {
      const date = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const dayName = days[date.getDay()];
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const day = date.getDate();

      return `${dayName} ${month} ${day} ${year}`;
    }


  render() {
    const { timeIn, timedIn, timeOut, timeData } = TimeInOutStore.getState();
    const { user } = this.props;
    
    return (
      <div className="timeinout-container">
        <div className="timeinout-top-contents">
          <div className="timeinout-header">
            <h1 className="timeinout-bigtitle">Time In / Out</h1>
            <p className="timeinout-sentence">Clock in when you start, clock out when you finish.</p>
          </div>
        </div>
        <div className="timeinout-main-contents">
          <Table data={timeData}/>
          <div className="timeinout-timer">
            <div className="calendar-container">
              <input type="date" />
            </div>
            <div className="timeinout-user-container">
              <div className="timeinout-user">
                <CircleUserRound className="user-icon-pic"/>
                <h1 className="user-name">{`${user.firstName} ${user.middleName} ${user.lastName}`}</h1>
                <p className="user-role">{user.role}</p>
              </div>
              <div className="timeinout-datetime">
                <p className="current-time">{this.state.time}</p>
                <p className="current-date">{this.dateNow()}</p>
              </div>
              {timedIn ? <Button error text="CLOCK OUT" onClick={() => timeOut(this.timenow(), this.dateNow())}/> : <Button success text="CLOCK IN" onClick={() => timeIn(this.timenow(), this.dateNow())}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeInOut;