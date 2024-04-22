import React, { useEffect, useState } from 'react'
import { faBookBookmark, faBoxesStacked, faList12 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Orders from './Orders/Orders'
import Reservations from './Reservations/Reservations'
import Quotes from './Quotes/Quotes'


function Main() {

    const [activeTab, setActiveTab] = useState(0);


    const MainBox = [
        {
            titre : "Commandes",
            contenu : <Orders/>
        },
        {
            titre : "Réservations",
            contenu : <Reservations/>
        },
        {
            titre : "Dévis",
            contenu : <Quotes/>
        }
    ]


    return (
        //  transition duration-500 ease-in-out hover:text-cyan-800 transform hover:-translate-y-1 shadow-[0_0_12px_rgba(0,0,0,0.2)]
        <section className="main py-4 px-6">
            <div className="py-10">
                <div className="header grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MainBox.map((box, index) => (
                        <div key={index} className={` flex flex-col justify-center items-center gap-4 py-6 lg:py-10 shadow-[0_0_12px_rgba(0,0,0,0.2)]
                            rounded-md cursor-pointer ${index === activeTab ? "bg-blue-950" : "bg-white"}`} >
                           {/*  */}
                           <div onClick={() => setActiveTab(index)} className={`text-lg lg:text-2xl xl:text-3xl font-semibold flex flex-col items-center ${index === activeTab ? 'text-white' : 'text-blue-950'}`}>
                                <span>{box.titre === "Commandes" ? <FontAwesomeIcon icon={faBoxesStacked} className={`  ${index === activeTab ? "text-white" : "text-blue-950"}`}/> : ""}</span>
                                <span>{box.titre === "Réservations" ? <FontAwesomeIcon icon={faList12} className={`  ${index === activeTab ? "text-white" : "text-blue-950"}`}/> : ""}</span>
                                <span>{box.titre === "Dévis" ? <FontAwesomeIcon icon={faBookBookmark} className={`  ${index === activeTab ? "text-white" : "text-blue-950"}`}/> : ""}</span>
                                <span>{box.titre}</span>
                            </div>
                       </div>
                    ))}
                    
                </div>
                <div className=" py-10">
                    {MainBox[activeTab].contenu}
                </div>
            </div>
        </section>
    )
}

export default Main;

//<div className="bg-white flex flex-col justify-center items-center gap-4 py-10 shadow-[0_0_12px_rgba(0,0,0,0.2)]
// rounded-md cursor-pointer" onClick={() => setOrdersBoxIsClicked(true)}>
//    <FontAwesomeIcon icon={faBoxesStacked} className='text-4xl text-blue-950'/>
//    <span className='text-3xl text-blue-950 font-semibold'>Commandes</span>
//</div>
//<div className="bg-white flex flex-col justify-center items-center gap-4 py-10 shadow-[0_0_12px_rgba(0,0,0,0.2)]
// rounded-md cursor-pointer" onClick={() => setReservsOrdersBoxIsClicked(true)}>
//    <FontAwesomeIcon icon={faList12} className='text-4xl text-blue-950'/>
//    <span className='text-3xl text-blue-950 font-semibold'>Reservations</span>
//</div>
//<div className="bg-white flex flex-col justify-center items-center gap-4 py-10 shadow-[0_0_12px_rgba(0,0,0,0.2)]
// rounded-md cursor-pointer" onClick={() => setQuotesBoxIsClicked(true)}>
//    <FontAwesomeIcon icon={faBookBookmark} className='text-4xl text-blue-950'/>
//    <span className='text-3xl text-blue-950 font-semibold'>Devis</span>
//</div>