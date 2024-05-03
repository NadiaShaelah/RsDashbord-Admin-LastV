import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'



function AuthRouter() {

    return (
        <Routes>
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/*' element={<Navigate replace to="sign-in"/>}/>
        </Routes>
    )
}

export default AuthRouter