import React, { useState } from 'react';

import { addNewUser } from '../../../datasforlocalstorage/addNewUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocalStorage } from 'usehooks-ts';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { Link } from 'react-router-dom';

function SignUp() {
    const [signIn, setSignIn] = useState(true)
    const [signUp, setSignUp] = useState(false)
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [loggedUser, setLoggedUser] = useLocalStorage("loggedUser", undefined);


    const handleSignIn = () => {
        setSignUp(false)
        setSignIn(true)
    }

    const handleSignUp = () => {
        setSignIn(false)
        setSignUp(true)
    }
        
    const addUser = async (e) => {
        e.preventDefault()
        const usersCollectionRef = doc(db, 'DashboardUsers/'+ email)
        await setDoc(usersCollectionRef, {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
        }).then((test) => console.log("addedddd...")).catch((e) => console.log(e))

        // let userData = {
        //     userName: name,
        //     userEmail: email,
        //     userPassword: password,
        //     userPasswordConfirm: passwordConfirm
        // }; 

        // addNewUser(userData);
        // setLoggedUser(userData);
        // setName(" ")
        // setEmail(" ")
        // setPassword(" ")
        // setPasswordConfirm(" ")
    }
    

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangePasswordConfim = (e) => {
        setPasswordConfirm(e.target.value)
    }


    return (
        <section className='bg-gradient-to-r from-blue-950 to-blue-400 h-screen flex justify-center items-center'>
            <div className="container mx-auto px-4">
                <div className="w-full lg:w-[40%] mx-auto grid gap-8 py-20 px-10 bg-white rounded-md">
                    <h2 className='text-center text-xl font-bold text-blue-900'>Formulaire de connexion</h2>
                    <div className="flex border border-blue-400">
                        <button onClick={() => handleSignIn()} className={`${signIn ? '' : ''}w-full p-3 text-lg font-bold text-white bg-blue-900`}>Connexion</button>
                        <button onClick={() => handleSignUp()} className={`${signUp ? '' : ''}w-full p-3 text-lg font-bold text-blue-900 bg-white`}>Inscription</button>
                    </div>
                    <form action="" className='flex flex-col gap-8' onSubmit={(e) => addUser(e)}>
                        <div className="bg-white border p-2 flex justify-between items-center gap-2">
                            <input value={name} onChange={handleChangeName} type="text" placeholder='Entrez votre nom' className='w-full focus:outline-none bg-white border-none'/>
                            <FontAwesomeIcon icon={faUser} className='text-blue-900'/>
                        </div>
                        <div className="bg-white border p-2 flex justify-between items-center gap-2">
                            <input value={email} onChange={handleChangeEmail} type="email" placeholder='Entrez votre adresse email' className='w-full focus:outline-none bg-white border-none'/>
                            <FontAwesomeIcon icon={faUser} className='text-blue-900'/>
                        </div>
                        <div className="bg-white border p-2 flex justify-between items-center gap-2">
                            <input value={password} onChange={handleChangePassword} type="password" placeholder='Entrez votre mot de passe' className='w-full focus:outline-none bg-white border-none'/>
                            <FontAwesomeIcon icon={faLock} className='text-blue-900'/>
                        </div>
                        <div className="bg-white border p-2 flex justify-between items-center gap-2">
                            <input value={passwordConfirm} onChange={handleChangePasswordConfim} type="password" placeholder='Confirmez votre mot de passe' className='w-full focus:outline-none bg-white border-none'/>
                            <FontAwesomeIcon icon={faLock} className='text-blue-900'/>
                        </div>
                        <button className='w-full p-2 text-lg font-bold text-white bg-blue-900'>Inscription</button>
                        <small className='text-sm'>Vous avez déjà un compte ? <Link to={'/sign-in'} className=' font-semibold underline text-base text-red-300'>Connectez-vous ici</Link></small>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp