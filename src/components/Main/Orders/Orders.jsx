import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { OrdersTab, OrdersTabs } from './OrdersTabs'

import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, update, query, limitToLast, orderByChild, orderByValue } from "firebase/database";


import { where, orderBy, getDocs } from "firebase/firestore";
import PopUp from '../../PopUp/PopUp';
import PopUpValidation from '../../PopUp/PopUpValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';


function Orders() {

    const [ordersDatas, setOrdersDatas] = useState([])
    const [open, setOpen] = useState(false);
    const [openValidate, setOpenValidate] = useState(false);
    const [load, setLoad] = useState(true)

    const totalLength = Object.values(ordersDatas).length;
    console.log("totalLength :: ", totalLength);

    const handleTrue = () => {
        alert('Ok! Delete complete');
    };

    const getOrdersDatas = async () => {
        setLoad(false)
        let datas = ref(getDatabase(database), "/Commandes");
        const q = query(datas, orderByChild("totalPrice"))
        
        onValue(q, snapshot => {
            const data = snapshot.val()
            console.log("data  :: ", data)
            setOrdersDatas(data)
        })
        /**
         *  const ordersRef = collection(db, "orders");
            const q = query(ordersRef, orderBy("orderCreatedAt");
            const querySnapshot = await getDocs(q);

            //orderBy("totalPrice", "desc"))
        // let datas = query(ref(getDatabase(database), "/Commandes"), orderBy("totalPrice", "desc").startAt(21));
        // const db = getDatabase();
        // const recentPostsRef = query(ref(db, 'posts'), limitToLast(100));
         */
    }
    
    
    useEffect(() => {
        getOrdersDatas()
    }, [])


    const ReglerAnOrder = (command) => {
        console.log("command ::: ", command);
        if(command.commandeId) {
            if(command.modePaiement === "Espèce" || command.modePaiement === "Carte stripe" || command.modePaiement === "Stripe" || command.modePaiement === "stripe") {
                try {
                    update(ref(getDatabase(database), `/Commandes/${command.commandeId}`), {
                        status: "Réglée",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const DeliverOrder = (command) => {
        console.log("command ::: ", command);
        if(command.commandeId) {
            if(command.status === "Réglée") {
                // if(command.modePaiement === "Espèce" && command.status === "Reglé") {
                try {
                    update(ref(getDatabase(database), `/Commandes/${command.commandeId}`), {
                        status: "Livrée",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const CancelOrder = (command) => {
        console.log("command :: ", command);
        if(command.commandeId) {
            if(command.status !== "Annulée") {
                try {
                    update(ref(getDatabase(database), `/Commandes/${command.commandeId}`), {
                        status: "Annulée",
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    return (
        <div>
            <OrdersTabs>
                <OrdersTab label="Toutes les commandes">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Référence</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Prix</th>
                                                <th scope="col" className="px-6 py-4">Frais d'expédition</th>
                                                <th scope="col" className="px-6 py-4">Date</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" className="px-6 py-4">Paiement</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {ordersDatas && ordersDatas !== "" ?
                                            Object.values(ordersDatas).reverse().map((order,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/order-details?id=${order.commandeId}`}>{totalLength-index}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.commandeId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.subtotalPrice}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.frais}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.dateCommande}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.modePaiement}</Link></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </OrdersTab>
                <OrdersTab label="Commandes à régler">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Référence</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Prix avec frais</th>
                                                <th scope="col" className="px-6 py-4">Date</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" className="px-6 py-4">Paiement</th>
                                                <th scope="col" className="px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {ordersDatas && ordersDatas !== "" ?
                                            Object.values(ordersDatas).filter((item) => item.status === "En attente").reverse().map((order,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/order-details?id=${order.commandeId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.commandeId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.totalPrice}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.dateCommande}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.modePaiement}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <button onClick={() => ReglerAnOrder(order)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Régler</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Régler</button> */}
                                                    {/* <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir régler la commande ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => ReglerAnOrder(order)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Régler</button>
                                                                        a supprimer --- <button onClick={() => CancelOrder(order)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelOrder(order)}  className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button> */}
                                                    {/* <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelOrder(order)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
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
                </OrdersTab>
                <OrdersTab label="Commandes réglées">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Référence</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Description</th>
                                                <th scope="col" className="px-6 py-4">Date</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                                <th scope="col" className="px-6 py-4">Paiement</th>
                                                <th scope="col" className="px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {ordersDatas && ordersDatas !== "" ?
                                            Object.values(ordersDatas).filter((item) => item.status === "Réglée").reverse().map((order,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/order-details?id=${order.commandeId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.commandeId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.totalPrice}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.dateCommande}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.status}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.modePaiement}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                                    <button onClick={() => DeliverOrder(order)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Livrée</button>
                                                    {/* <button onClick={()=> setOpenValidate(true)} className='bg-blue-900 text-white p-2 rounded-md font-semibold'>Livrée</button>
                                                    <PopUpValidation open={openValidate} onClose={() => setOpenValidate(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir confirmer la livraison ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => DeliverOrder(order)} className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Livrer</button>
                                                                        <button  className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </PopUpValidation> */}
                                                    <button onClick={() => CancelOrder(order)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    {/* <button onClick={()=> setOpen(true)} className='bg-red-600 text-white p-2 rounded-md font-semibold'>Annuler</button>
                                                    <PopUp open={open} onClose={() => setOpen(false)}>
                                                        <div className="text-center w-full">
                                                            <div className="bg-white w-[400px] mx-auto rounded-md p-4">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
                                                                    <p className='text-lg'>Êtes-vous sûr de vouloir annuler ?</p>
                                                                    <div className="flex gap-4">
                                                                        <button onClick={() => CancelOrder(order)} className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
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
                </OrdersTab>
                {/* <OrdersTab label="Commandes validées">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Référence</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Description</th>
                                                <th scope="col" className="px-6 py-4">Date</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>                                                
                                                <th scope="col" className="px-6 py-4">Paiement</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {ordersDatas && ordersDatas !== "" ?
                                            Object.values(ordersDatas).filter((item) => item.status === "Validé").map((order,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/order-details?id=${order.commandeId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.commandeId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.totalPrice}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.dateCommande}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.status}</Link></td>                                                
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.modePaiement}</Link></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </OrdersTab> */}
                <OrdersTab label="Commandes annulées">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Référence</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Description</th>
                                                <th scope="col" className="px-6 py-4">Date</th>
                                                <th scope="col" className="px-6 py-4">Paiement</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {ordersDatas && ordersDatas !== "" ?
                                            Object.values(ordersDatas).filter((item) => item.status === "Annulée").reverse().map((order,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                {/* <Link component="td" to="/order-details">{order.commandeId}</Link> */}
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/order-details?id=${order.commandeId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.commandeId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.totalPrice}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.dateCommande}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.modePaiement}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-red-600"><Link to={`/order-details?id=${order.commandeId}`}>{order.status}</Link><FontAwesomeIcon className='ml-2' icon={faXmarkCircle}/></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </OrdersTab>
                <OrdersTab label="Commandes livrées">
                    <div className="flex flex-col h-[30rem]">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-blue-300">
                                            <tr className=''>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Référence</th>
                                                <th scope="col" className="px-6 py-4">Client</th>
                                                <th scope="col" className="px-6 py-4">Prix avec frais</th>
                                                <th scope="col" className="px-6 py-4">Date</th>
                                                <th scope="col" className="px-6 py-4">Paiement</th>
                                                <th scope="col" className="px-6 py-4">Etat</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {ordersDatas && ordersDatas !== "" ?
                                            Object.values(ordersDatas).filter((item) => item.status === "Livrée").reverse().map((order,index) => (
                                            <tr key={index} className="border-b dark:border-blue-300 hover:bg-blue-50 cursor-pointer">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium"><Link to={`/order-details?id=${order.commandeId}`}>{index+1}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.commandeId}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.email}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.totalPrice}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.dateCommande}</Link></td>
                                                <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.modePaiement}</Link></td>
                                                {/* <td className="whitespace-nowrap px-6 py-4"><Link to={`/order-details?id=${order.commandeId}`}>{order.status}</Link></td> */}
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-green-600"><Link to={`/quote-details?id=${order.devisId}`}>{order.status}<FontAwesomeIcon className='ml-2' icon={faTruck}/></Link></td>
                                            </tr>
                                            )) : null }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </OrdersTab>
            </OrdersTabs>
        </div>
    )
}

export default Orders