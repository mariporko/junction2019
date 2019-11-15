import React from 'react';

export function Greeting() {
    const date = new Date();
    const hours = date.getHours();
    let greeting;

    if (hours < 12 && hours >= 4) {
        greeting = 'Good Morning!';
    } else if (hours >= 12 && hours <= 17) {
        greeting = 'Good Afternoon!';
    } else if (hours >= 17 && hours <= 24) {
        greeting = 'Good Evening!';
    } else if (hours < 4) {
        greeting = 'Good Night!';
    }

    return (
        <h1>{greeting}</h1>
    );
}
