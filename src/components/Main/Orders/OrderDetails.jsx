import React, { useEffect, useState } from 'react'
import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useSearchParams } from 'react-router-dom';



function OrderDetails() {
    
    const [orderInfos, setOrderInfos] = useState()
    const [queryParameters] = useSearchParams()


    const OrderInfosFunc = () => {
        const orderDatasDetails = ref(getDatabase(database), `/Commandes/${queryParameters.get("id")}`)
        onValue(orderDatasDetails, snapshort => {
            setOrderInfos(snapshort.val())
        })
    }
    
    useEffect(() => {
        OrderInfosFunc()
    }, [])


    const validateOrder = (command) => {
        if(command.commandeId) {
            if(command.status !== "Validé") {
                try {
                    update(ref(getDatabase(database), `/Commandes/${command.commandeId}`), {
                        status: "Validé",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const cancelOrder = (command) => {
        if(command.commandeId) {
            if(command.status !== "Annulé") {
                try {
                    update(ref(getDatabase(database), `/Commandes/${command.commandeId}`), {
                        status: "Annulé",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    return(
        <section className="order-details bg-green-100 h-screen py-10">
            <div className="container mx-auto">
                <div className="py-4 flex flex-col items-center">
                    <h1 className='flex gap-2'>
                        <span className='mt-2'>Reférence commande : </span>
                        <strong className='text-3xl font-semibold'>{orderInfos?.commandeId}.</strong>
                    </h1>
                    <small className=''>{orderInfos?.cartlist?.length} produits</small>
                </div>
                <div className="grid grid-cols-[1fr_24rem] gap-4 mt-10">
                    <div className="-ml-20">
                        <h2 className='text-center text-xl font-semibold text-slate-800'>Les produits de la commande.</h2>
                        <table className='mt-6 '>
                            <thead className="border-b font-medium dark:border-green-300">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Image</th>
                                    <th scope="col" className="px-6 py-4">ProductID</th>
                                    <th scope="col" className="px-6 py-4">Nom du produit</th>
                                    {/* <th scope="col" className="px-6 py-4">Description</th> */}
                                    <th scope="col" className="px-6 py-4">Etat du produit</th>
                                    <th scope="col" className="px-6 py-4">Client</th>
                                    <th scope="col" className="px-6 py-4">Boutique</th>
                                    <th scope="col" className="px-6 py-4">Quantitée</th>
                                    <th scope="col" className="px-6 py-4">Prix</th>
                                </tr>
                            </thead>
                            {orderInfos?.cartlist?.map((product, i) => (
                            <tbody>
                                <tr className="border-b dark:border-green-300 hover:bg-green-50 cursor-pointer">
                                    <td className="whitespace-nowrap px-6 py-4"><img className='w-full' src={product.orderImageUrl[0]} alt={product.orderName} /></td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.productId}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.orderName}</td>
                                    {/* <td className="whitespace-nowrap px-6 py-4">{product.orderDescription}</td> */}
                                    <td className="whitespace-nowrap px-6 py-4 capitalize">{product.orderEtat}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.orderOrganisation}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.orderQte}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.orderPrice}</td>
                                </tr>
                            </tbody>
                            ))}
                        </table>
                    </div>
                    <div className="">
                            <h2 className='text-center text-xl font-semibold text-slate-800'>Les informations de la commande.</h2>
                            <div className="mt-6 bg-green-50 p-4 shadow-[0_0_12px_rgba(0,0,0,0.2)] rounded-md">
                                <div className="flex flex-col gap-4">
                                    <h2 className='text-xl text-center font-semibold'>{orderInfos?.cartlist?.length} produits commandés.</h2>
                                    <div className="flex justify-between">
                                        <span>Statut : </span>
                                        <strong>{orderInfos?.status}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Commandé le, </span>
                                        <strong>{orderInfos?.dateCommande}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Par </span>
                                        <strong>{orderInfos?.email}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Moyen de paiement : </span>
                                        <strong>{orderInfos?.payment}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Destinateur : </span>
                                        <strong>{orderInfos?.receveur}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Livraison : </span>
                                        <strong>{orderInfos?.livraison}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Lieu de livraison : </span>
                                        <strong>{orderInfos?.lieu}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Téléphone : </span>
                                        <strong>{orderInfos?.numero}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal : </span>
                                        <strong className='text-lg'>{orderInfos?.subtotalPrice}</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>TOTAL : </span>
                                        <strong className='text-3xl text-red-600'>{orderInfos?.totalPrice}</strong>
                                    </div>
                                </div>
                            <div className="flex justify-between mt-20 gap-4">
                                <button onClick={() => cancelOrder(orderInfos)} className='bg-red-600 w-full p-2 text-white text-xl font-semibold rounded-sm'>Annuler</button>
                                <button onClick={() => validateOrder(orderInfos)} className='bg-green-700 w-full p-2 text-white text-xl font-semibold rounded-sm'>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderDetails;