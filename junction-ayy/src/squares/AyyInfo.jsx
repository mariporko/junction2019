import React from 'react';
import code from '../assets/qr-some.svg';
import { StyledCard } from '../StyledCard';

export function AyyInfo() {

    return (
        <StyledCard className="card ayy-info">
            <h2>AYYHELLO</h2>
            <p>Join the house discussion in @ayy-smt-6!</p>
            <img className="qr-koodi" alt="QR-code" src={code} />
        </StyledCard>
    );
}