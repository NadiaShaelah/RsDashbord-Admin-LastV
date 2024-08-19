import { faBars, faBell, faGear, faHomeUser, faSearch, faSignOut, faTasks, faUser, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

function NavBar() {
    const [toggle, setToggle] = useState("false")
    const [top, setTop] = useState(true);
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', undefined);

    useEffect(() => {
    const scrollHandler = () => {
        window.scrollY > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);
    return (
        <nav className='w-full fixed top-0 bg-white  shadow-[0_0_12px_rgba(0,0,0,0.2)]'>
            <ul className="container mx-auto py-6 flex justify-between flex-col md:flex-row gap-4 md:gap-0 px-4 md:px-0">
                <li className='flex justify-between'>
                    <h1 className='text-4xl font-semibold text-blue-950'>RsChain</h1>
                    <div className="space-y-1 md:hidden cursor-pointer z-20" onClick={() => setToggle(!toggle)}>
                        <FontAwesomeIcon className={`text-3xl text-blue-950`} icon={faBars}/>
                    </div>
                </li>
                <li>
                    <div className='flex'>
                        <input type="search" className='w-full focus:outline-none bg-white border border-blue-950 p-1 text-slate-500' placeholder='Recherchez ici...'/>
                        <button className=' py-1 px-3 bg-blue-950 text-slate-500'><FontAwesomeIcon icon={faSearch}/></button>
                    </div>
                </li>
                <ul className={`${toggle ? "hidden" : ""} bg-white shadow-sm shadow-blue-950/55 absolute top-0 left-0 w-full p-10 rounded-b-3xl space-y-10 text-blue-950 font-semibold text-sm uppercase text-center`}>
                    <li className="flex flex-col gap-8">
                        <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-400 text-center'>
                            <FontAwesomeIcon className='text-lg' icon={faHomeUser}/>
                            <span className='lg:hidden text-sm'>Dashboard</span>
                        </Link>
                        <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-400 text-center'>
                            <FontAwesomeIcon className='text-lg' icon={faUser}/>
                            <span className='lg:hidden text-sm'>Admin</span>
                        </Link>
                        <Link to={"/users"} className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-400 text-center'>
                            <FontAwesomeIcon className='text-lg' icon={faUsers}/>
                            <span className='lg:hidden text-sm'>Utilisateurs</span>
                        </Link>
                        <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-400 text-center'>
                            <FontAwesomeIcon className='text-lg' icon={faTasks}/>
                            <span className='lg:hidden text-sm'>Tâches</span>
                        </Link>
                        <Link className='flex gap-2 items-center transition duration-500 ease-in-out hover:text-blue-400 text-center'>
                            <FontAwesomeIcon className='text-lg' icon={faGear}/>
                            <span className='lg:hidden text-sm'>Paramètres</span>
                        </Link> 
                    </li>
                    <li className='flex gap-2 items-center cursor-pointer transition duration-500 ease-in-out hover:text-blue-400 text-center'>
                        <FontAwesomeIcon className='text-lg' icon={faSignOut}/>
                        <button onClick={() => setLoggedUser(false)} className='lg:hidden xl:flex text-lg'>Se deconnecter</button>
                        {/* <span className='lg:hidden xl:flex text-lg'><Link to={'/sign-in'}>Se deconnecter</Link></span> */}
                    </li>
                </ul>
                <li className='hidden lg:flex gap-2'>
                    <span className='cursor-pointer border border-blue-950 text-blue-950 px-3 py-1 transition duration-500 ease-in-out hover:bg-blue-950 hover:text-white'>
                        <FontAwesomeIcon icon={faBell}/>
                    </span>
                    <span className='cursor-pointer border bg-blue-950 px-3 py-1 text-white shadow-[0_0_12px_rgba(0,0,0,0.2)] rounded-sm transition duration-500 ease-in-out hover:text-blue-950 hover:bg-white'>
                        <FontAwesomeIcon icon={faUserCircle}/>
                    </span>
                </li>
            </ul>
        </nav>

        // <section className='nav-bar w-full fixed top-0 bg-white py-10 px-6 text-blue-950 shadow-lg'>
        //     <div className="w-full ">
        //         <nav className='container mx-auto'>
        //             <ul className='flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between items-center'>
        //                 <li className='text-3xl lg:text-4xl font-bold uppercase'>Rs.Dashboard</li>
        //                 <li className='flex justify-between items-center gap-6'>
        //                     <div className="flex items-center mr-10">
        //                         <input type="text" className='border w-full p-1'/>
        //                         <button className='bg-blue-950 text-white p-1 rounded-r-sm'><FontAwesomeIcon icon={faSearch}/></button>
        //                     </div>
        //                     <Link className='bg-blue-950 py-1 px-3 rounded-sm text-white'><FontAwesomeIcon icon={faBell}/></Link>
        //                     <Link className='bg-white py-1 px-3 rounded-sm text-blue-950 border border-blue-950'><FontAwesomeIcon icon={faUserCircle}/></Link>
        //                 </li>
        //             </ul>
        //         </nav>
        //     </div>
        // </section>
    )
}

export default NavBar;