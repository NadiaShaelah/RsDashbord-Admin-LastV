import { faBell, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className='w-full fixed top-0 bg-white  shadow-[0_0_12px_rgba(0,0,0,0.2)]'>
            <ul className="container mx-auto py-6 flex justify-between flex-col md:flex-row gap-4 md:gap-0 px-4 md:px-0">
                <li><h1 className='text-4xl font-semibold text-blue-950'>RsChain</h1></li>
                <li>
                    <div className='flex'>
                        <input type="search" className='w-full focus:outline-none bg-white border border-blue-950 p-1 text-slate-500' placeholder='Recherchez ici...'/>
                        <button className=' py-1 px-3 bg-blue-950 text-slate-500'><FontAwesomeIcon icon={faSearch}/></button>
                    </div>
                </li>
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

export default NavBar