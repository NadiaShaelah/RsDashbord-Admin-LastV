import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import OrderDetails from '../../components/Main/Orders/OrderDetails'
import ReservationDetails from '../../components/Main/Reservations/ReservationDetails'
import QuoteDetails from '../../components/Main/Quotes/QuoteDetails'
import DashboardPage from './DashboardPage/DashboardPage'
import Users from './Users/Users'
import UserDetails from './Users/UserDetails'
import TasksPage from './TasksPage/TasksPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path='/order-details' element={<OrderDetails/>} />
            <Route path='/reserv-details' element={<ReservationDetails/>} />
            <Route path='/quote-details' element={<QuoteDetails/>} />
            <Route path='/*' element={<Navigate replace to="dashboard" />} />
            <Route path='/api' element={<run />} />
            <Route path='/users' element={<Users/>} />
            <Route path='/user-details' element={<UserDetails/>} />
            <Route path='/task' element={<TasksPage/>} />
        </Routes>
    )
}

export default AppRouter