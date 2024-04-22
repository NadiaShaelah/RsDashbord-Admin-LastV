import React, { useState, useEffect } from 'react';
import './style.css';


const PopUp = ({toggle, title, trueButtonName, falseButtonName, message, handleFalse, handleTrue}) => {

    const [open, setOpen] = useState('false');

    useEffect(() => {
        toggle ? setOpen('true') : setOpen('false')
    }, [toggle]);


    return (
        <div className="show mx-auto w-[400px] bg-gray-300 p-2 rounded-md opacity-0 transition duration-500 ease-in-out  fade"  isOpen={open}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content flex flex-col gap-4 items-center">
                    <div className="modal-header text-3xl text-red-600">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <p className='text-lg'>{message}</p>
                    </div>
                    <div className="modal-footer flex gap-4">
                        <button onClick={() => handleTrue()} type="button" className="py-2 px-4 bg-red-600 text-white font-semibold">
                            {trueButtonName}
                        </button>
                        <button onClick={() => handleFalse()} type="button" className="py-2 px-4 bg-blue-900 text-white font-semibold">
                            {falseButtonName}
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show mx-auto w-[400px] bg-gray-300 p-2 rounded-md opacity-0 transition duration-500 ease-in-out "></div>
        </div>
    );
};
 export default PopUp;