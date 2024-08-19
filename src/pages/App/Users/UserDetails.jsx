import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebase-config';
import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, orderByChild } from "firebase/database";

function UserDetails() {
    const [queryParameters] = useSearchParams()

    const iddd = queryParameters.get("id")
    
    const [ordersDatas, setOrdersDatas] = useState()
    const [userData, setUserData] = useState()

    const usersDetails = async  () => {
        const cartRef = collection(db, 'Utilisateurs'); // Assurez-vous que la collection est correcte.
        const q = query(cartRef, where('email', '==', iddd));

        const querySnapshot = await getDocs(q);
            // console.log(querySnapshot)

        querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        setUserData(doc.data())
        });

    }

    const fireStoreUsersOrders = async () => {
        const cartRef = collection(db, 'orders');
        const q = query(cartRef, where('email', '==', iddd));

        const querySnapshot = await getDocs(q);
        // console.log("fireStoreOrders querySnapshot :::", querySnapshot)

        querySnapshot.forEach((doc) => {
        // console.log("fireStoreOrders doc.data() ::: ", doc.data())
        setOrdersDatas(doc.data())
        });
    }

    // const getOrdersDatas = async () => {
    //     let datas = ref(getDatabase(database), "/Commandes");
    //     const q = query(datas, orderByChild("totalPrice"))
        
    //     onValue(q, snapshot => {
    //         const data = snapshot.val()
    //         for(let com in data) {
    //             if(com.email === userData?.email) {
    //                 console.log("commmm yessss::: ");
    //                 setOrdersDatas(data[com].cartlist)
    //             }
    //         }
    //     })
    // }
    

    useEffect(() => {
        // getOrdersDatas()
        usersDetails()
        fireStoreUsersOrders()
    }, [])

    return (
        <div className="relative overflow-x-auto py-20 flex flex-col gap-4 px-4 lg:px-0">
            <div className="container mx-auto flex flex-col gap-4">
                <h1 className='text-2xl text-center capitalize'>{userData?.name}.</h1>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Nom et prénom(s) : </strong>
                    <span className='capitalize'>{userData?.surname} {userData?.name}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Email : </strong>
                    <span>{userData?.email}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Date de création : </strong>
                    <span className='capitalize'>{userData?.createdAt}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Téléphone : </strong>
                    <span>{userData?.number}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Ville : </strong>
                    <span className='capitalize'>{userData?.ville}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Avenue : </strong>
                    <span className='capitalize'>{userData?.avenue}</span>
                </div>
            </div>
            <div className="container mx-auto flex flex-col gap-10">
                <h2 className='text-2xl mt-6'>Panier</h2>
                <ul className='flex flex-col gap-4 p-4'>
                    <li className='text-center'>Id produit : <strong>{ordersDatas?.currentUID}</strong></li>
                    <li className='font-semibold'>{ordersDatas?.orderName}</li>
                    <li className='capitalize'>{ordersDatas?.orderDescription}</li>
                    <li>De chez <strong>{ordersDatas?.orderOrganisation}</strong></li>
                    <li>Prix : <strong>{ordersDatas?.orderPrice} €</strong></li>
                    <li>Quantitée : <strong>{ordersDatas?.orderQte}</strong></li>
                    <li className='underline'>Client : <strong>{ordersDatas?.email}</strong></li>
                </ul>
            </div>
        </div>
    )
}

export default UserDetails