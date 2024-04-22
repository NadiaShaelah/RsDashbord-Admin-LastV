import React, { useState } from 'react';
import Confirm from './ConfirmTest';
import './style.css';

export default function AppTest() {
  const handleTrue = () => {
    alert('Ok! Delete complete');
  };



    return (
        <Confirm
            btnValue="Annuler"
            handleTrue={handleTrue}
            trueButtonName="Annuler"
            falseButtonName="Retour"
            title="Confirmation !"
            message="Êtes-vous sûr de vouloir annuler ?"
        />
    );
}
