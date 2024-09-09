import React, { useState } from 'react';
import CreateStores from './CreateStores';
import AddProducts from './AddProducts';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function TasksPage() {
    const [activeTab, setActiveTab] = useState(0);
  
    const tabs = [
        { name: 'Créer Magasins', content: <CreateStores/> },
        { name: 'Ajouter produits', content: <AddProducts/> }
    ];


    return (
        <div className="w-full max-w-2xl mx-auto py-10 px-6">
            <Link className='text-3xl px-4 lg:px-0' to={"/"}><FontAwesomeIcon icon={faArrowLeft}/></Link>
            <div className="flex gap-10 items-center justify-center flex-wrap space-x-1">
                {tabs.map((tab, index) => (
                    <button
                    key={index}
                    className={`py-2 px-4 text-sm md:text-lg font-semibold focus:outline-none uppercase ${
                        activeTab === index
                        ? 'border-b-2 border-cyan-600 text-cyan-600'
                        : 'text-gray-500 hover:text-cyan-600'
                    }`}
                    onClick={() => setActiveTab(index)}
                    >
                    {tab.name}
                    </button>
                ))}
            </div>
            <div className="py-10 px-6">
                <p>{tabs[activeTab].content}</p>
            </div>
        </div>
  );
};


export default TasksPage;