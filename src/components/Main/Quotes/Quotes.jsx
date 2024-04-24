import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, update } from "firebase/database";
import { QuotesTabs, QuotesTab } from './QuotesTabs'
import PopUpValidation from '../../PopUp/PopUpValidation';
import PopUp from '../../PopUp/PopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

function Quotes() {

    const [quotesDatas, setQuotesDatas] = useState([])
    const [load, setLoad] = useState(true)
    const [open, setOpen] = useState(false);
    const [openValidate, setOpenValidate] = useState(false);

    const getQuotesDatas = async () => {
        setLoad(false)
        let datas = ref(getDatabase(database), "/DevisPerso");
        onValue(datas, snapshot => {
            const data = snapshot.val()
            console.log("iciiiiiiiiiiii ::: ", data)
            setQuotesDatas(data)
        })
    }

    useEffect(() => {
        getQuotesDatas()
    }, [])


    const ReglerQuote = (devis) => {
        console.log("devis ::: ", devis);
        if(devis.devisId) {
            if(devis.modePaiement === "Espèce") {
                try {
                    update(ref(getDatabase(database), `/DevisPerso/${devis.devisId}`), {
                        status: "Réglé",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const Livrer = (devis) => {
        console.log("devis ::: ", devis);
        if(devis.devisId) {
            if(devis.status === "Disponible") {
                try {
                    update(ref(getDatabase(database), `/DevisPerso/${devis.devisId}`), {
                        status: "Livré",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const EnAgence = (devis) => {
        console.log("devis ::: ", devis);
        if(devis.devisId) {
            if(devis.status === "Réglé") {
                try {
                    update(ref(getDatabase(database), `/DevisPerso/${devis.devisId}`), {
                        status: "En cours",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const Expedier = (devis) => {
        console.log("devis ::: ", devis);
        if(devis.devisId) {
            if(devis.status === "En cours") {
                try {
                    update(ref(getDatabase(database), `/DevisPerso/${devis.devisId}`), {
                        status: "Expédié",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const Disponible = (devis) => {
        console.log("devis ::: ", devis);
        if(devis.devisId) {
            if(devis.status === "Expédié") {
                try {
                    update(ref(getDatabase(database), `/DevisPerso/${devis.devisId}`), {
                        status: "Disponible",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const CancelQuote = (devis) => {
        console.log("devis :: ", devis);
        if(devis.devisId) {
            if(devis.status !== "Annulé") {
                try {
                    update(ref(getDatabase(database), `/DevisPerso/${devis.devisId}`), {
                        status: "Annulé",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    
    return (
        <>
            <QuotesTabs>
                <QuotesTab label="Toutes les dévis">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Partenaires</th>
                                                <th scope="col" className="px-6 py-4">Clients</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destinations</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                {/* <th scope="col" class="px-6 py-3">Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).reverse().map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.partenaire}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}</Link></td>
                                                {/* <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                                                </td> */}
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </QuotesTab>
                <QuotesTab label="Dévis à régler">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" class="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "En attente").reverse().map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    {/* <button href="#" className='bg-blue-900 py-2 px-4 rounded-md text-white text-[1rem] font-semibold'>Régler</button>
                                                    <button href="#" className='bg-blue-900 py-2 px-4 rounded-md text-white text-[1rem] font-semibold'>Annuler</button> */}
                                                    <button onClick={() => ReglerQuote(quote)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Régler</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Régler</button> */}
                                                    {/* <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir régler le devis ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => ReglerQuote(quote)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Régler</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelQuote(quote)}  className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler le devis ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
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
                </QuotesTab>
                <QuotesTab label="Dévis réglés">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" class="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "Réglé").reverse().map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <button onClick={() => EnAgence(quote)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>En agence</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>En agence</button> */}
                                                    {/* <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir transférer le colis en agence ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => EnAgence(quote)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Confirmer</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelQuote(quote)}  className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button> */}
                                                    {/* <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler le transfert du colis ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
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
                </QuotesTab>
                <QuotesTab label="Colis en agence">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" class="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "En cours").reverse().map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <button onClick={() => Expedier(quote)}  className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Expédier</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Expédier</button>
                                                    <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir expédier le colis ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => Expedier(quote)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Confirmer</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler l'expédition du colis ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
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
                </QuotesTab>
                <QuotesTab label="Colis expédiés">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" class="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "Expédié").reverse().map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <button  onClick={() => Disponible(quote)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Disponible</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Disponible</button>
                                                    <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Vous confirmez que le colis est bien disponible ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => Disponible(quote)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Confirmer</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
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
                </QuotesTab>
                <QuotesTab label="Colis disponible">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" class="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "Disponible").map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                <button onClick={() => Livrer(quote)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Livrer</button>
                                                {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Livrer</button> */}
                                                    {/* <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr que le colis a bien été livré ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => Livrer(quote)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Confirmer</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button> */}
                                                    {/* <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler le devis ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelQuote(quote)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
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
                </QuotesTab>
                <QuotesTab label="Dévis annulés">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "Annulé").map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-red-600"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}<FontAwesomeIcon className='ml-2' icon={faXmarkCircle}/></Link></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </QuotesTab>
                <QuotesTab label="Colis livrés">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">ID dévis</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Lieu départ</th>
                                                <th scope="col" className="px-6 py-4">Destination</th>
                                                <th scope="col" className="px-6 py-4">Voie</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotesDatas && quotesDatas !== "" ?
                                            Object.values(quotesDatas).filter((item) => item.status === "Livré").map((quote,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/quote-details?id=${quote.devisId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.devisId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.depart}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.arrive}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.moyen}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.total}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-green-600"><Link to={`/quote-details?id=${quote.devisId}`}>{quote.status}<FontAwesomeIcon className='ml-2' icon={faTruck}/></Link></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </QuotesTab>
            </QuotesTabs>
        </>
    )
}

export default Quotes