import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../../firebase-config'
import DashboardPage from '../../App/DashboardPage/DashboardPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { addNewUser } from '../../../datasforlocalstorage/addNewUser'
import { useLocalStorage } from 'usehooks-ts'

function SignIn() {
    const [signIn, setSignIn] = useState(true)
    const [signUp, setSignUp] = useState(false)
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [loggedUser, setLoggedUser] = useLocalStorage("loggedUser", undefined);
    const [userExist, setUserExist] = useState(false)

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
        setName(" ")
        setEmail(" ")
        setPassword(" ")
        setPasswordConfirm(" ")


        // console.log("name ::: ", name)
        // console.log("password ::: ", password)
        // const docRef = doc(db, 'DashboardUsers' + email);
        // const docSnap = await getDoc(docRef);
        // console.log("docSnap ::: ", docSnap);
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     console.log("No such document!");
        // }


        // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const userLogin = async (e) => {
        e.preventDefault()
        
        const querySnapshot = await getDocs(collection(db, "DashboardUsers"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data().email);
            // console.log("email :: ", email);
            if(email === doc.data().email) {
                setUserExist(true)
                let userData = {
                    // userName: name,
                    userEmail: email,
                    userPassword: password,
                    // userPasswordConfirm: passwordConfirm
                }; 
        
                addNewUser(userData);
                setLoggedUser(userData);
            }
           
        });
    }

    return (
        <section className='bg-gradient-to-r from-blue-950 to-blue-400 h-screen flex justify-center items-center'>
            <div className="container mx-auto px-4">
                <div className="w-full lg:w-2/6 mx-auto grid gap-8 py-20 px-10 bg-white rounded-md">
                    <h2 className='text-center text-xl font-bold text-blue-900'>Formulaire de connexion</h2>
                    <div className="flex border border-blue-400">
                        <button onClick={() => handleSignIn()} className={`${signIn ? '' : ''}w-full p-3 text-lg font-bold text-white bg-blue-900`}>Connexion</button>
                        <button onClick={() => handleSignUp()} className={`${signUp ? '' : ''}w-full p-3 text-lg font-bold text-blue-900 bg-white`}>Inscription</button>
                    </div>
                    {/* {signIn && ( */}
                        <form action="" className='flex flex-col gap-4' onSubmit={(e) => userLogin(e)}>
                            <div className="bg-white border p-2 flex justify-between items-center gap-2">
                                <input type="text" value={email} onChange={handleChangeEmail} placeholder='Entrez votre adresse email' className='w-full focus:outline-none bg-white border-none'/>
                                <FontAwesomeIcon icon={faUser} className='text-blue-900'/>
                            </div>
                            <div className="bg-white border p-2 flex justify-between items-center gap-2">
                                <input type="password" value={password} onChange={handleChangePassword} placeholder='Entrez votre mot de passe' className='w-full focus:outline-none bg-white border-none'/>
                                <FontAwesomeIcon icon={faLock} className='text-blue-900'/>
                            </div>
                            <small className='text-red-300 text-sm -mt-2'>Mot de passe oublié ?</small>
                            <Link to={"/dashboard"}><button className='w-full p-2 text-lg font-bold text-white bg-blue-900'>Connexion</button></Link>
                            <small className='text-sm'>Vous n'avez pas de compte ? <Link to={'/sign-up'} className=' font-semibold underline text-base text-red-300'>Créez un compte ici</Link></small>
                        </form>
                    {/* )} */}
                    {/* {signUp && (
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
                        </form>
                    )} */}
                    {userExist && (
                        <DashboardPage/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SignIn