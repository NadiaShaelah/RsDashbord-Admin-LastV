import { faGear, faHomeUser, faMessage, faSignOut, faTasks, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

import chaplogo from '../images/app-chap-logo.png'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-config'

function SideBar() {
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', undefined);
    const [userConnected, setUserConnected] = useState()

    useEffect(() => {
        const user = async () => {
            const querySnapshot = await getDocs(collection(db, "DashboardUsers"));
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data().name);
                setUserConnected(doc.data().name)
            })
        }
        user()
    }, [])
    
    return (
        <section className='side-bar h-full bg-blue-950 text-white'>
            <div className="fixed top-0 z-50">
                <div className="hidden lg:flex items-center">
                    <ul className='flex flex-col items-center py-10 gap-20'>
                        <li className='flex flex-col items-center'>
                            <img className='lg:w-32 xl:w-60 object-cover lg:-my-6 lg:-ml-4 xl:-my-16 xl:-ml-4 cursor-pointer transition duration-500 ease-in-out hover:text-blue-200 text-center' src={chaplogo} alt="" />
                        </li>
                        <li className="flex flex-col gap-8">
                            <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-200 text-center'>
                                <FontAwesomeIcon className='lg:text-3xl xl:text-xl' icon={faHomeUser}/>
                                <span className='lg:hidden xl:flex text-lg'>Dashboard</span>
                            </Link>
                            <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-200 text-center'>
                                <FontAwesomeIcon className='lg:text-3xl xl:text-xl' icon={faUser}/>
                                <span className='lg:hidden xl:flex text-lg'>Admin</span>
                            </Link>
                            <Link to={"/users"} className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-200 text-center'>
                                <FontAwesomeIcon className='lg:text-3xl xl:text-xl' icon={faUsers}/>
                                <span className='lg:hidden xl:flex text-lg'>Utilisateurs</span>
                            </Link>
                            <Link to={"/task"} className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-200 text-center'>
                                <FontAwesomeIcon className='lg:text-3xl xl:text-xl' icon={faTasks}/>
                                <span className='lg:hidden xl:flex text-lg'>Tâches</span>
                            </Link>
                            <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-200 text-center'>
                                <FontAwesomeIcon className='lg:text-3xl xl:text-xl' icon={faGear}/>
                                <span className='lg:hidden xl:flex text-lg'>Paramètres</span>
                            </Link> 
                        </li>
                        <li className='flex gap-2 items-center cursor-pointer transition duration-500 ease-in-out hover:text-blue-200 text-center'>
                            <FontAwesomeIcon className='lg:text-3xl xl:text-xl' icon={faSignOut}/>
                            <button onClick={() => setLoggedUser(false)} className='lg:hidden xl:flex text-lg'>Se deconnecter</button>
                            {/* <span className='lg:hidden xl:flex text-lg'><Link to={'/sign-in'}>Se deconnecter</Link></span> */}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default SideBar