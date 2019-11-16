import React from 'react';
import Card from '@material-ui/core/Card';

export function Time() {
    const timeNow = new Date();

    function getWeekday() {
        const weekdays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]
        return weekdays[timeNow.getDay()];
    }

    function getMonthName() {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ]
        return months[timeNow.getMonth()];
    }

    return (
        <Card className="card time">
            <h2>{timeNow.getHours()}:{timeNow.getMinutes()}</h2>
            <p>{getWeekday()}, {getMonthName()} {timeNow.getDate()}</p>
        </Card>
    );
}