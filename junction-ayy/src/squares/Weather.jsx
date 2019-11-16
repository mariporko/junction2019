import React, { useState, useEffect } from 'react';
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
import Card from '@material-ui/core/Card';

export function Weather() {

    const [data, setData] = useState({temperateure: 0});

    useEffect(() => {
        const request = require('request');

        let req = {
            url: 'http://api.weatherstack.com/current?access_key=aa24982083f1c3d55aed3be87a73678f&query=Espoo',
            method: 'GET',
        };

        request(req, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                setData(JSON.parse(body).current);
            }
        });
    }, []);

    return (
        <Card className="card">
            <h1>Weather</h1>
            <p>Temperature in Espoo is currently {data.temperature} &#8451;!</p>
        </Card>
    );
}