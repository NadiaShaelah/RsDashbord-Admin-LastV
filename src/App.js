import { useState } from "react";
import AppRouter from "./pages/App/AppRouter";
import AuthRouter from "./pages/Auth/AuthRouter";
import { useLocalStorage } from "usehooks-ts";

import { Navigate, Route, Routes } from 'react-router-dom'

import SignIn from "./pages/Auth/SignIn/SignIn";
import SignUp from "./pages/Auth/SignUp/SignUp";
import DashboardPage from "./pages/App/DashboardPage/DashboardPage";
import OrderDetails from "./components/Main/Orders/OrderDetails";
import ReservationDetails from "./components/Main/Reservations/ReservationDetails";
import QuoteDetails from "./components/Main/Quotes/QuoteDetails";


function App() {

    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    // if(isAuthenticated)
    
    // const stringData = localStorage.getItem("userList") || "[]";
    // let currentList = JSON.parse(stringData);

    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', undefined);
    console.log(loggedUser);
    if(loggedUser)

        return <AppRouter />

    return <AuthRouter />

    
    // return(
    //     <Routes>
    //         <Route path="/dashboard" element={<DashboardPage/>}/>
    //         <Route path='/order-details' element={<OrderDetails/>} />
    //         <Route path='/reserv-details' element={<ReservationDetails/>} />
    //         <Route path='/quote-details' element={<QuoteDetails/>} />
    //         {/* <Route path='/*' element={<Navigate replace to="dashboard" />} /> */}
    //         {/* <Route path='/sign-in' element={<SignIn/>} /> */}
    //         <Route path='/' element={<SignIn/>} />
    //         <Route path='/sign-up' element={<SignUp/>}/>
    //         <Route path='/*' element={<Navigate replace to="/"/>}/>
    //     </Routes>
    // )
}

export default App;
