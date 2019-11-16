import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';

import { RESIDENTS } from '../building_information';

export function Residents() {

    return (
        <Card className="card">
            <h1>List of tenants</h1>
            {RESIDENTS.map((floor, key) => {
                console.log(floor);
                return (
                    <li className="floor" key={key}>
                        <span>FLOOR {floor.floor}</span>
                        {floor.tenants.map((apartment, key) => {
                            return (
                                <li className="apartment" key={key}>
                                    {apartment.number}: {apartment.names.map((name, key) => {
                                        return (
                                            <span className="name" key={key}>
                                                {name}
                                            </span>
                                        );
                                    })}
                                </li>
                            );
                        })}
                    </li>
                );
            })}
        </Card>
    );
}