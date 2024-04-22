import React, { useEffect, useState } from 'react'
import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref } from "firebase/database";
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function QuoteDetails() {
    
    const [quoteInfos, setQuoteInfos] = useState()
    const [queryParameters] = useSearchParams()


    const quoteInfosFunc = () => {
        const quoteDatasDetails = ref(getDatabase(database), `/DevisPerso/${queryParameters.get("id")}`)
        console.log("quoteDatasDetails ::: ", quoteDatasDetails);
        onValue(quoteDatasDetails, snapshort => {
            setQuoteInfos(snapshort.val())
            console.log("snapshort.val() ::: ", snapshort.val());
        })
    }

    useEffect(() => {
        quoteInfosFunc()
    }, [])

    const validateQuote = (state) => {
        if(state === "Validé") {
            // quoteInfos.status
            alert("------",state,"------")
            console.log("state :: ", state);
        }
    }

    const cancelQuote = () => {
        
    }

    return(
        <section className="order-details bg-green-100 h-screen py-10">
            <div className="container mx-auto py-20">
                <div className="py-4 flex flex-col items-center">
                    <h1 className='flex gap-2'>
                        <span className='mt-2'>Reférence commande : </span>
                        <strong className='text-3xl font-semibold'>{quoteInfos?.devisId}.</strong>
                    </h1>
                </div>
                <div className="grid grid-rows-2 gap-4 mt-10">
                    <div className="-ml-20">
                        <h2 className='text-center text-xl font-semibold text-slate-800'>Les produits du devis.</h2>
                        <div className="py-10 flex flex-col items-center">
                            <table className='mt-6 '>
                                <thead className="border-b font-medium dark:border-green-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">DevisId</th>
                                        <th scope="col" className="px-6 py-4">Partenaire</th>
                                        <th scope="col" className="px-6 py-4">Nom & Prénoms exp.</th>
                                        <th scope="col" className="px-6 py-4">Email expéditeur</th>
                                        <th scope="col" className="px-6 py-4">Voie</th>
                                        <th scope="col" className="px-6 py-4">Départ</th>
                                        <th scope="col" className="px-6 py-4">Destination</th>
                                        <th scope="col" className="px-6 py-4">Methode de paiement</th>
                                        <th scope="col" className="px-6 py-4">Prix total</th>
                                        <th scope="col" className="px-6 py-4">Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-green-300 hover:bg-green-50 cursor-pointer">
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.devisId}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.partenaire}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.nomExpediteur} {quoteInfos?.prenomExpediteur}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.moyen}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.depart}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.arrive}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.methodeDePaiement}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.total}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{quoteInfos?.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between mt-20 gap-4 w-full">
                            <button className='bg-red-600 w-full p-2 text-white text-xl font-semibold rounded-sm'>Annuler</button>
                            <button onClick={() => validateQuote(quoteInfos?.status)} className='bg-green-700 w-full p-2 text-white text-xl font-semibold rounded-sm'>Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default QuoteDetails