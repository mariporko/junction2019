import React from "react";
import "./Time.css";

export function Time() {
  const timeNow = new Date();

  function getWeekday() {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return weekdays[timeNow.getDay()];
  }

  function getMonthName() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    return months[timeNow.getMonth()];
  }

  function hours() {
    if (timeNow.getHours() < 10) return "0" + timeNow.getHours();
    else return timeNow.getHours()
  }

  function minutes() {
    if (timeNow.getMinutes() < 10) return "0" + timeNow.getMinutes();
    else return timeNow.getMinutes();
  }

  return (
    <div className="time">
      <h2>
        {hours()}:{minutes()}
      </h2>
      <p>
        {getWeekday()}, {getMonthName()} {timeNow.getDate()}
      </p>
    </div>
  );
}
