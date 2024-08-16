import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../../firebase-config';


function Users() {

    const [usersData, setUsersData] = useState()

    useEffect(() => {
        const getUsersDatas = async () => {

            const usersss = collection(db, '/Utilisateurs');
            console.log("usersss  ::: ", usersss);
            const q = query(usersss);
            console.log("qqq ::: ", q);

            const querySnapshot = await getDocs(q);
            const result =  querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setUsersData(Object.values(result));
            console.log("result ici ::: ", Object.values(result));
        }
        getUsersDatas()
  
    }, [])
    
    console.log("usersData ::: ", usersData);

    if (usersData !== undefined) {
        return(
            <>
                <section className="users w-full">
                    <div className="max-w-[1600px] mx-auto flex flex-col gap-10 py-10">
                        <h1 className='text-3xl font-bold text-center'>Bienvenue à la session users, pour plus d'informations sur nos utilisateurs.</h1>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link className="bg-cyan-600 p-4 text-sm uppercase text-center text-white font-semibold hover:scale-105">Nouveaux comptes</Link>
                            <Link className="bg-cyan-600 p-4 text-sm uppercase text-center text-white font-semibold hover:scale-105">Achat, web / mobile ?</Link>
                            <Link className="bg-cyan-600 p-4 text-sm uppercase text-center text-white font-semibold hover:scale-105">Acceder aux users</Link>
                            <Link className="bg-cyan-600 p-4 text-sm uppercase text-center text-white font-semibold hover:scale-105">Créer magasin</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-6 p-10">
                                <h2 className='text-xl font-semibold'>Liste des utilisateurs ou comptes crées depuis le web</h2>
                                {Object.values(usersData).reverse().map((d, i) => {
                                    if(d.data?.updatedFrom === "web" || d.data?.from === "web") {
                                        return (
                                            <ul key={i}>
                                                <Link to={`/user-details?id=${d.id}`}>
                                                    <li className='flex flex-col border border-b-cyan-500 p-1'>
                                                        <strong>{d.data.name} {d.data.surname} </strong>
                                                        <span>{d.data.email}</span>
                                                    </li>
                                                </Link>
                                            </ul>
                                        )
                                    }
                                })}
                            </div>
                    
                            <div className="flex flex-col gap-6 p-10">
                                <h2 className='text-xl font-semibold'>Liste des utilisateurs ou comptes crées depuis le mobile</h2>
                                {Object.values(usersData).map((d, i) => {
                                    if(d.data?.updatedFrom === "mobile" || d.data?.from === "mobile") {
                                        return (
                                            <ul key={i}>
                                                <li className='flex flex-col border border-b-cyan-500 p-1'>
                                                    <strong>{d.data.name} {d.data.surname} </strong>
                                                    <span>{d.data.email}</span>
                                                </li>
                                            </ul>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else {
        return <div className="text-center">Chargement...</div>
    }
}

export default Users