import React, { useState } from 'react';
import PopUp from './PopUpTest';
import './style.css';

export default function Confirm({ btnValue, handleTrue, trueButtonName, falseButtonName, title, message}) {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(!toggle);
    };

    const handleFalse = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLive"
                onClick={() => handleClick()}>
                {btnValue}
            </button>

            <PopUp
                toggle={toggle}
                handleTrue={handleTrue}
                handleFalse={handleFalse}
                trueButtonName={trueButtonName}
                falseButtonName={falseButtonName}
                title={title}
                message={message}
            />
        </>
    );
}
