import React from 'react';
import Card from '@material-ui/core/Card';
import code from '../assets/qr-some.svg';

export function AyyInfo() {

    return (
        <Card className="card ayy-info">
            <h2>AYYHELLO</h2>
            <p>Join the house discussion in @ayy-smt-6!</p>
            <img className="qr-koodi" alt="QR-code" src={code} />
        </Card>
    );
}