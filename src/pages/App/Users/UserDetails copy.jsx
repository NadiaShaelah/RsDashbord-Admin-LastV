import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebase-config';
import { database } from '../../../firebase-config'
import { getDatabase, onValue, ref, update, limitToLast, orderByChild, orderByValue } from "firebase/database";
import { faBaseball } from '@fortawesome/free-solid-svg-icons';

function UserDetails() {
    const [queryParameters] = useSearchParams()

    const iddd = queryParameters.get("id")
    // console.log("iddd ::: ", iddd);
    
    const [ordersDatas, setOrdersDatas] = useState()
    const [userData, setUserData] = useState()

    // const usersDetails = async  () => {
    //     // const userDetails = collection(db, `Utilisateurs/konedieu5@gmail.com`)
    //     // const querySnapshot = await getDocs(userDetails);
    //     // const cartDoc = querySnapshot.docs;
    
    //     // console.log("userDetails cartDoc ::: ", cartDoc);
       
            // Le bon ici
    //     const cartRef = collection(db, 'Utilisateurs'); // Assurez-vous que la collection est correcte.
    //     const q = query(cartRef, where('email', '==', iddd));

    //     const querySnapshot = await getDocs(q);
    //         // console.log(querySnapshot)

    //     querySnapshot.forEach((doc) => {
    //     // console.log(doc.data())
    //     setUserData(doc.data())
    //     });

    // }

    const fireStoreUsersOrders = async () => {
        const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
        const q = query(cartRef, where('email', '==', iddd));

        const querySnapshot = await getDocs(q);
            console.log("fireStoreOrders querySnapshot :::", querySnapshot)

        querySnapshot.forEach((doc) => {
        console.log("fireStoreOrders doc.data() ::: ", doc.data())
        setUserData(doc.data())
        });
    }

    const getOrdersDatas = async () => {
        let datas = ref(getDatabase(database), "/Commandes");
        const q = query(datas, orderByChild("totalPrice"))
        
        onValue(q, snapshot => {
            const data = snapshot.val()
            for(let com in data) {
                if(com.email === userData?.email) {
                    console.log("commmm yessss::: ");
                    setOrdersDatas(data[com].cartlist)
                    // console.log(com.email, "==>", com.cartlist);
                }
                // console.log("commmm ::: ", data[com].cartlist);
            }
            // console.log("commandes  :: ", [data])
            // const newtab = [data]
            // newtab.map((com) => {
            //     if(com.email === userData?.email) {
            //         console.log("commmm ::: ", com);
            //         setOrdersDatas("yessss")
            //         console.log(com.email, "==>", com.cartlist);
            //     }
            // })
            // console.log("result de map ::: ", result);
            // setOrdersDatas([data])
        })
    }
    

    useEffect(() => {
        // usersDetails()
        getOrdersDatas()
        fireStoreUsersOrders()
    }, [])

    console.log("orderdataaaa:: ", ordersDatas);

    return (
        <div className="relative overflow-x-auto py-20 flex flex-col gap-4">
            <div className="container mx-auto flex flex-col gap-4">
                <h1 className='text-2xl text-center'>{userData?.name}.</h1>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Nom et prénom(s) : </strong>
                    <span>{userData?.surname} {userData?.name}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Email : </strong>
                    <span>{userData?.email}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Date de création : </strong>
                    <span>{userData?.createdAt}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Téléphone : </strong>
                    <span>{userData?.number}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Ville : </strong>
                    <span>{userData?.ville}</span>
                </div>
                <div className="border p-4 flex items-center gap-4">
                    <strong>Avenue : </strong>
                    <span>{userData?.avenue}</span>
                </div>
            </div>
            {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 py-6">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nom et prénom(s)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date de création
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Téléphone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ville
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avenue
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                            {userData?.surname} {userData?.name}
                        </th>
                        <td className="px-6 py-4">
                            {userData?.email}
                        </td>
                        <td className="px-6 py-4">
                            {userData?.createdAt}
                        </td>
                        <td className="px-6 py-4">
                            {userData?.number}
                        </td>
                        <td className="px-6 py-4 capitalize">
                            {userData?.ville}
                        </td>
                        <td className="px-6 py-4">
                            {userData?.avenue}
                        </td>
                    </tr>
                </tbody>
            </table> */}
            <div className="container mx-auto flex flex-col gap-10">
                <h2 className='text-2xl mt-6'>Panier</h2>
                {ordersDatas?.map((d, i) => (
                    <ul key={i} className='flex flex-col gap-4'>
                        <div className='bg-green-200 p-4'>
                            <li>Id produit : <strong>{d.productId}</strong></li>
                            <li className='font-semibold'>{d.orderName}</li>
                            <li>{d.orderDescription}</li>
                            <li>{d.email}</li>
                            <li>{d.selected}</li>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default UserDetails