import React from "react";
import "./TimeInOut.css";
import { Table } from "../../components/TRTable/TrTable";
import Button from "../../components/TRButton/Button";
import TimeInOutStore from "../../context/TimeinOut";
import { CircleUserRound } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

class TimeInOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.timenow(),
      date: this.dateNow(),
      clickTime: false
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

  timeInClick = (method) => {
    const { timeIn, timeOut } = TimeInOutStore.getState();
    this.setState({clickTime: true});
    switch (method) {
      case 'in': 
          timeIn(this.timenow(), this.dateNow());
        break;
      case 'out': 
          timeOut(this.timenow(), this.dateNow());
        break;
    }
    this.setState({clickTime: false});
  }

  render() {
    const { timeIn, timeOut, timeData, timeInLoading, loading } = TimeInOutStore.getState();
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
          <Table data={timeData} isDetailed={{header: "Time logs"}} isLoading={timeInLoading} />
          <div className="timeinout-timer">
            <div className="calendar-container">
              <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar 
                    sx={{
                      // Target the PickersDay component for styling
                      '& .MuiPickersDay-root': {
                        color: '#FF4D52', // Change the text color to red
                        fontWeight: 'bold',
                        alignItems: 'center',
                        '&.Mui-selected': {
                          backgroundColor: '#FF4D52', // Background for selected day
                          color: 'white', // Text color for selected day
                        },
                        '&.Mui-disabled': {
                          color: 'grey', // Text color for disabled days
                        },
                        '&:hover': {
                          backgroundColor: '#ebebf58a', // Background on hover
                        },
                        '&.MuiPickersDay-today': {
                          borderColor: '#fff', // Border color for today's date
                        },
                        '&.MuiPickersDay-dayOutsideMonth': {
                          color: 'lightgrey', // Text color for days outside the current month
                        },
                      },

                      '& .MuiDayCalendar-weekDayLabel': {
                        color: '#ebebf58a', // Text color for week day labels
                        fontWeight: 'bold',
                      },
                      '& .MuiIconButton-root': {
                          color: '#FF4D52', // Color for the navigation arrows
                      },
                      '& .MuiPickersCalendarHeader-label': {
                          color: '#FF4D52', // Text color for month and year
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="timeinout-user-container">
              <div className="timeinout-user">
                <CircleUserRound className="user-icon-pic"/>
                <h1 className="user-name">{`${user.firstName} ${user.middleName} ${user.lastName}`}</h1>
                <p className="user-role">{user.role}</p>
              </div>
              <div className="timeinout-branch">
                <p className="branch-location">{user.branchLocation}</p>
                <p className="branch-label">Branch</p>
              </div>
              <div className="timeinout-datetime">
                <p className="current-time">{this.state.time}</p>
                <p className="current-date">{this.dateNow()}</p>
              </div>
              {user?.timedIn 
              ? <Button 
                  disabled={loading} 
                  maxWidth 
                  error 
                  text="CLOCK OUT" 
                  onClick={() => this.timeInClick('out')}
                /> 
              : <Button 
                  disabled={loading}
                  maxWidth 
                  success 
                  text="CLOCK IN" 
                  onClick={() => this.timeInClick('in')}
                />
            }
            </div>
          </div>
        </div>
      </div>                                                                          
    );
  }
}

export default TimeInOut;