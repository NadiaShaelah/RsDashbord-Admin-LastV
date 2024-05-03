import React from 'react'
import NavBar from '../../../../src/components/NavBar/NavBar'
import SideBar from '../../../../src/components/SideBar/SideBar'
import Analytics from '../../../components/Analytics/Analytics'
import Main from '../../../components/Main/Main'

function DashboardPage() {
    return (
        <section className='dashboard w-full bg-blue-100'>
            <div className="grid grid-cols-12">
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-1 xl:col-span-2 ">
                    <SideBar/>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-11 xl:col-span-10">
                    <div className="grid grid-rows-12 gap-4">
                        <div className="row-span-1"><NavBar/></div>
                        <div className="row-span-11">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-9 py-6"><Main/></div>
                                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-3 py-6"><Analytics/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardPage