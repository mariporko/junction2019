import React, { useState, useEffect } from 'react';
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
import Card from '@material-ui/core/Card';

export function PublicTransport() {

    const [next, setNext] = useState({
        headsign: "",
        trip: { route: { shortName: "" } },
        realtimeDeparture: 0,
        serviceDay: 0,
    });

    useEffect(() => {
        const request = require('request');

        let now = new Date().getSeconds();

        let req = {
            url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
            method: 'POST',
            headers: { "Content-Type": "application/graphql" },
            body: `{
                stop(id: "HSL:2222210") {
                name
                stoptimesWithoutPatterns {
                    realtimeDeparture
                    trip {
                        route {
                            shortName
                        }
                    }
                    headsign
                }
                }
            }`
        };

        request(req, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                setNext(JSON.parse(body).data.stop.stoptimesWithoutPatterns[0]);
            }
        });
    }, []);

    function nextWillDepart() {
        if (next) {
            let departs = next.realtimeDeparture;
            let now = Math.floor((new Date() - new Date().setHours(0,0,0,0)) / 1000);
            let timeLeft = Math.floor((departs - now) / 100);
            return timeLeft;
        } else {
            return ""
        }
    }

    return (
        <Card className="card">
            <h1>Public transport info</h1>
            <p>Bus {next.trip.route.shortName} to {next.headsign} will depart in {nextWillDepart()} minutes.</p>
        </Card>
    );
}
