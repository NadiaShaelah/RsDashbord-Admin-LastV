import React, { useEffect, useState } from 'react'
import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function ReservationDetails() {
    const [reservInfos, setReservInfos] = useState()
    const [queryParameters] = useSearchParams()


    const ReservInfosFunc = () => {
        const reservDatasDetails = ref(getDatabase(database), `/Reservation/${queryParameters.get("id")}`)
        onValue(reservDatasDetails, snapshort => {
            setReservInfos(snapshort.val())
            console.log("snapshort.val() ::: ", snapshort.val());
        })
    }

    useEffect(() => {
        ReservInfosFunc()
    }, [])

    const validateReserv = (reserv) => {
        if(reserv.reservationId) {
            if(reserv.status !== "Validé") {
                try {
                    update(ref(getDatabase(database), `/Reservation/${reserv.reservationId}`), {
                        status: "Validé"
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const cancelReserv = (reserv) => {
        if(reserv.reservationId) {
            if(reserv.status !== "Annulé") {
                try {
                    update(ref(getDatabase(database), `/Reservation/${reserv.reservationId}`), {
                        status: "Annulé"
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }


    return(
        <section className="order-details bg-green-100 h-screen py-10">
            <div className="container mx-auto py-20">
                <div className="py-4 flex flex-col items-center">
                    <h1 className='flex gap-2'>
                        <span className='mt-2'>Reférence réservation : </span>
                        <strong className='text-3xl font-semibold'>{reservInfos?.reservationId}.</strong>
                    </h1>
                </div>
                <div className="py-20">
                    <h2 className='text-center text-xl font-semibold text-slate-800'>Les informations de la réservation.</h2>
                    <div className="w-4/6 mx-auto">
                        <div className="py-10 flex flex-col items-center">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Resto img</th>
                                        <th scope="col" className="px-6 py-4">Restaurant</th>
                                        <th scope="col" className="px-6 py-4">Date(s) reservée(s)</th>
                                        <th scope="col" className="px-6 py-4">Heure(s) réservée(s)</th>
                                        <th scope="col" className="px-6 py-4">Nombre de personne(s)</th>
                                        <th scope="col" className="px-6 py-4">Statut</th>
                                        <th scope="col" className="px-6 py-4">Client</th>
                                        <th scope="col" className="px-6 py-4">Téléphone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-green-300 hover:bg-green-50 cursor-pointer">
                                        <td className="whitespace-nowrap px-6 py-4"><img className='w-full' src={reservInfos?.imageMag} alt="" /></td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.organisation}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.dateReservation}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.heureReservation}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.nbrePerson}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{reservInfos?.numero}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-between mt-20 gap-4 w-full">
                                <button onClick={() => cancelReserv(reservInfos)} className='bg-red-600 w-full p-2 text-white text-xl font-semibold rounded-sm'>Annuler</button>
                                <button onClick={() => validateReserv(reservInfos)} className='bg-green-700 w-full p-2 text-white text-xl font-semibold rounded-sm'>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReservationDetails