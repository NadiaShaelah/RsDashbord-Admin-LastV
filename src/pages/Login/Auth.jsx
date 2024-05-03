import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardPage from '../../pages/App/DashboardPage/DashboardPage'
import { db } from '../../firebase-config'
import { collection, doc, getDocs , setDoc } from 'firebase/firestore'


function Auth() {

    const [signIn, setSignIn] = useState(true)
    const [signUp, setSignUp] = useState(false)
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()


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

    
    const connectUser = async (e) => {
        e.preventDefault()
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


        const querySnapshot = await getDocs(collection(db, "DashboardUsers"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data().email);
            // console.log("email :: ", email);
            if(email === doc.data().email) {
                console.log("YESSSSSSS !");
                return (
                    <DashboardPage/>
                )
            }
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
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
                    {signIn && (
                        <form action="" className='flex flex-col gap-4' onSubmit={(e) => connectUser(e)}>
                            <div className="bg-white border p-2 flex justify-between items-center gap-2">
                                <input type="text" value={email} onChange={handleChangeEmail} placeholder='Entrez votre adresse email' className='w-full focus:outline-none bg-white border-none'/>
                                <FontAwesomeIcon icon={faUser} className='text-blue-900'/>
                            </div>
                            <div className="bg-white border p-2 flex justify-between items-center gap-2">
                                <input type="password" value={password} onChange={handleChangePassword} placeholder='Entrez votre mot de passe' className='w-full focus:outline-none bg-white border-none'/>
                                <FontAwesomeIcon icon={faLock} className='text-blue-900'/>
                            </div>
                            <small className='text-red-300 text-sm -mt-2'>Mot de passe oublié ?</small>
                            <button className='w-full p-2 text-lg font-bold text-white bg-blue-900'>Connexion</button>
                            <small className='text-sm'>Vous n'avez pas de compte ? <Link className=' font-semibold underline text-base text-red-300'>Créez un compte ici</Link></small>
                        </form>
                    )}
                    {signUp && (
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
                    )}
                </div>
            </div>
        </section>
    )
}

export default Auth

// const usersCollectionRef = collection(database, 'DashboardUsers')

    // const addUser = async () => {
    //     const document = await addDoc(usersCollectionRef, {
    //         name: name,
    //         email: email,
    //         password: password,
    //         passwordConfirm: passwordConfirm,
    //     })

    //     const newCollectionRef = collection(database, 'DashboardUsers', document.id, 'name of new subcollection')

    //     await addDoc(newCollectionRef, {
    //         data: 'Hello there World',
    //     })
    // }
    // const colRef = collection(db, "collection_name");
        // // try {
        //     const docRef = await addDoc(collection(database, "DashboardUsers"), {
        //         name: name,
        //         email: email,
        //         password: password,
        //         passwordConfirm: passwordConfirm
        //     });

        //     console.log("Document written with ID: ", docRef.id);
        // } 
        // catch (e) {
        // console.error("Error adding document: ", e);
        // }