import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ReservationsTabs, ReservationsTab } from './ReservationsTabs'

import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, update } from "firebase/database";
import PopUp from '../../PopUp/PopUp';
import PopUpValidation from '../../PopUp/PopUpValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';



function Reservations() {
    
    const [reservationsDatas, setReservationsDatas] = useState([])
    const [load, setLoad] = useState(true)
    const [open, setOpen] = useState(false);
    const [openValidate, setOpenValidate] = useState(false);

    const handleTrue = () => {
        alert('Ok! Delete complete');
    };
    
    const getReservationsDatas = async () => {
        setLoad(false)
        let datas = ref(getDatabase(database), "/Reservation");
        onValue(datas, snapshot => {
            const data = snapshot.val()
            console.log(data)
            setReservationsDatas(data)
        })
    }

    useEffect(() => {
        getReservationsDatas()
    }, [])

    
    const ValidateReservation = (reserv) => {
        if(reserv.reservationId) {
            if(reserv.reponseResto === "Acceptée" && reserv.status === "En attente") {
                try {
                    update(ref(getDatabase(database), `/Reservation/${reserv.reservationId}`), {
                        status: "Validée",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }


    const CancelReservation = (reserv) => {
        console.log("Confirm annuler :: ", reserv);
        //reponseResto:"Refusée"
        if(reserv.reservationId) {
            console.log("reservationId ::: ", reserv.reservationId);
            if(reserv.reponseResto === "Refusée" && reserv.status === "En attente") {
                console.log("Ouiii j'y suis");
                try {
                    update(ref(getDatabase(database), `/Reservation/${reserv.reservationId}`), {
                        status: "Annulée",
                    });
                    console.log("C'est fait");
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }


    return (
        <div>
            <ReservationsTabs>
                <ReservationsTab label="Toutes les réservations">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID Réservation</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Date réservation</th>
                                                <th scope="col" className="px-6 py-4">Heure réservées</th>
                                                <th scope="col" className="px-6 py-4">Nombre de pers.</th>
                                                <th scope="col" className="px-6 py-4">Téléphone</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {reservationsDatas && reservationsDatas !== "" ?
                                            Object.values(reservationsDatas).reverse().map((reserv,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                {/* <Link component="td" to="/reserv-details">{order.reservationId}</Link> ?id=${order.reservationId}to={`/order-details?id=${order.reservationId}`}*/}
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reservationId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.dateReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.heureReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.nbresperson}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.numero}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReservationsTab>
                <ReservationsTab label="Réservations en attente">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID Réservation</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Date réservation</th>
                                                <th scope="col" className="px-6 py-4">Heure réservées</th>
                                                <th scope="col" className="px-6 py-4">Nombre de pers.</th>
                                                <th scope="col" className="px-6 py-4">Téléphone</th>
                                                <th scope="col" className="px-6 py-4">Etat client</th>
                                                <th scope="col" className="px-6 py-4">Réponse Restaurateur</th>
                                                <th scope="col" className="px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {reservationsDatas && reservationsDatas !== "" ?
                                            Object.values(reservationsDatas).filter((item) => item.status === "En attente").reverse().map((reserv,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reservationId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.dateReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.heureReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.nbresperson}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.numero}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 text-blue-900 font-semibold"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reponseResto}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    {/* <button onClick={() => ValidateReservation(reserv)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Valider</button> */}
                                                    <button onClick={() => ValidateReservation(reserv)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Valider</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Valider</button>
                                                    <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir valider la réservation ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => ValidateReservation(reserv)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Valider</button>
                                                                        a supprimer ---<button onClick={() => CancelOrder(order)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelReservation(reserv)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button> */}
                                                    {/* <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler la réservation ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelReservation(reserv)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUp> */}
                                                </td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReservationsTab>
                {/* <ReservationsTab label="Réservations en cours">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID Réservation</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Date réservation</th>
                                                <th scope="col" className="px-6 py-4">Heure réservées</th>
                                                <th scope="col" className="px-6 py-4">Nombre de pers.</th>
                                                <th scope="col" className="px-6 py-4">Téléphone</th>
                                                <th scope="col" className="px-6 py-4">Etat client</th>
                                                <th scope="col" className="px-6 py-4">Réponse Restaurateur</th>
                                                <th scope="col" className="px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservationsDatas && reservationsDatas !== "" ?
                                            Object.values(reservationsDatas).filter((item) => item.status === "En cours").map((reserv,index) => (
                                                <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reservationId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.dateReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.heureReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.nbresperson}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.numero}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 text-blue-900 font-semibold"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reponseResto}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <button onClick={() => ValidateReservation(reserv)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Valider</button>
                                                    <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelReservation(reserv)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUp>
                                                </td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReservationsTab> */}
                <ReservationsTab label="Réservations validées">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID Réservation</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Date réservation</th>
                                                <th scope="col" className="px-6 py-4">Heure réservées</th>
                                                <th scope="col" className="px-6 py-4">Nombre de pers.</th>
                                                <th scope="col" className="px-6 py-4">Téléphone</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservationsDatas && reservationsDatas !== "" ?
                                            Object.values(reservationsDatas).filter((item) => item.status === "Validée").reverse().map((reserv,index) => (
                                                <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                {/* <Link component="td" to="/reserv-details">{order.reservationId}</Link> */}
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reservationId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.dateReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.heureReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.nbresperson}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.numero}</Link></td>
                                                {/* <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link></td> */}
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-green-600"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link><FontAwesomeIcon className='ml-2' icon={faTruck}/></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReservationsTab>
                <ReservationsTab label="Réservations annulées">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID Réservation</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Date réservation</th>
                                                <th scope="col" className="px-6 py-4">Heure réservées</th>
                                                <th scope="col" className="px-6 py-4">Nombre de pers.</th>
                                                <th scope="col" className="px-6 py-4">Téléphone</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservationsDatas && reservationsDatas !== "" ?
                                            Object.values(reservationsDatas).filter((item) => item.status === "Annulée").reverse().map((reserv,index) => (
                                                <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                {/* <Link component="td" to="/reserv-details">{order.reservationId}</Link> */}
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.reservationId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.dateReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.heureReservation}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.nbresperson}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.numero}</Link></td>
                                                {/* <td className="whitespace-nowrap px-6 py-4"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link></td> */}
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-red-600"><Link to={`/reserv-details?id=${reserv.reservationId}`}>{reserv.status}</Link><FontAwesomeIcon className='ml-2' icon={faXmarkCircle}/></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReservationsTab>
            </ReservationsTabs>
            <PopUp className="mt-0"/>
        </div>
    )
}

export default Reservations