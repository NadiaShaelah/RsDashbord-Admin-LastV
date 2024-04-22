import React, { useState } from 'react'

function ReservationsTabs({children}) {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    };
    
    return (
        <div className="w-full flex flex-col px-4 lg:px-0">
            <div className="flex flex-col lg:flex-row lg:gap-8 justify-between border-b border-blue-200">
                {children.map(child => (
                    <button
                        key={child.props.label}
                        className={`${
                        activeTab === child.props.label ? 'border-b-2 border-blue-900 font-semibold' : ''
                        } flex-1 text-blue-950 text-lg font-semibold py-2`}
                        onClick={e => handleClick(e, child.props.label)}>
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div className="py-4">
                {children.map(child => {
                    if (child.props.label === activeTab) {
                        return <div key={child.props.label}>{child.props.children}</div>;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

const ReservationsTab = ({ label, children }) => {
    return (
        <div label={label} className="hidden">
            {children}
        </div>
    );
};

export { ReservationsTabs, ReservationsTab };