import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from '../../../firebase-config';
// import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


// const importAll = (r) => {
//     let files = {};
//     r.keys().forEach((item, index) => { 
//       files[item.replace('./', '')] = r(item);
//     });
//     return files;
//   };
  
//   // Importer tous les fichiers du dossier processors
//   const processors = importAll(require.context('./api', false, /\.js$/));
  
function CreateStores() {
    const [result, setResult] = useState(null);
  
    // useEffect(() => {
    //   // Exécuter une fonction spécifique de chaque fichier
    //   const results = Object.values(processors).map((processor) => {
    //     // Supposons que chaque fichier exporte une fonction appelée `run`
    //     return processor.run();
    //   });
    //   setResult(results);
    // }, []);

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [ville, setVille] = useState("")
    const [number, setNumber] = useState("")
    const [codePostal, setCodePostal] = useState("")
    const [description, setDescription] = useState("")
    const [adresse, setAdresse] = useState("")
    const [categorie, setCategorie] = useState("")
    const [organisation, setOrganisation] = useState("")
    const [taxe, setTaxe] = useState("")
    const [image, setImage] = useState("")
    const [livraison, setLivraison] = useState("")
    const [password2, setPassword2] = useState("")
    const [selectedOption, setSelectedOption] = useState('');
    const [checkedItems, setCheckedItems] = useState({});
    const TermsCond = "Je certifie avoir lu et approuvé les ";
    const [loader,setLoader] = useState(false)
    const [verif,setVerif] = useState(false);
    const randomNumb = parseInt(Math.random() * 1000000)
    const router = useNavigate();


    const handleChangeCheckBox = (e) => {
      const { name, checked } = e.target;
    //   setBool(!e.target.checked)
      setCheckedItems(prevState => ({
        ...prevState,
        [name]: checked,
      }));
    };

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setLivraison(e.target.value)
        if(e.target.value === "non") {
            setTaxe(0)
        }
        else {
            setTaxe(taxe)
        }
    };


    console.log("name ::: ", name.trim());
    console.log("email ::: ", email);
    console.log("password ::: ", password);
    console.log("ville ::: ", ville);
    console.log("number ::: ", number);
    console.log("codePostal ::: ", codePostal);
    console.log("description ::: ", description);
    console.log("adresse ::: ", adresse);
    console.log("categorie ::: ", categorie);
    console.log("organisation ::: ", organisation);
    console.log("taxe ::: ", taxe);
    console.log("livraison ::: ", livraison);
    console.log("password2 ::: ", password2);


    const createUSer = async () => {
        setLoader(true)
        if (password === password2) {
            //hachage ici

            //fin hachage

            // create a pointer to our Document
            const _user = doc(db, `Admin/${email}`);
            // structure the todo data
            const Users = {
                categorie,
                // imageUrl: uri,
                name,
                organisation,
                number,
                email,
                password,
                // siret,
                adresse,
                // tva,
                transportLivraison: livraison,
                taxeLivraison:taxe,
                ville,codePostal,
                description,
                status: 'non verifié',
                code: randomNumb
            };
            await setDoc(_user, Users)
                .then(async () => {
                await axios.post("api/sendmail.js", { email: email, message: randomNumb, subject: "code de verification" });
                toast({
                    title: "INSCRIPTION VALIDEE",
                    description: "veuillez vous connecter",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setLoader(true)
                setVerif(true)
                })
                .catch(() => {
                setLoader(false)
                toast({
                    title: "VERIFIER LES CHAMPS/VOUS AVEZ UN COMPTE",
                    description: "SVP VERIFIER VOS DONNEES ",
                    status: "error",
                    duration: 7000,
                    isClosable: true,
                });
                });

        } else {
            setLoader(false)
            // console.log("okay la");
            toast({
                title: "MAUVAISE SAISIE",
                description: "MOT DE PASSE NON IDENTIQUE",
                status: "error",
                duration: 7000,
                isClosable: true,
            });
        }
    };

    const handleImageUpload = async (file, cat, org) => {
        // Upload the image to Firebase Storage
        // const imageRef = ref(storage, cat + "/" + org + "/logo/" + file.name.trim());
        // await uploadBytes(imageRef, file);

        // // Get the download URL of the uploaded image
        // const downloadURL = await getDownloadURL(imageRef);

        // Do something with the downloadURL, such as storing it in a database
        // setUri(downloadURL);
        // createUSer();
    };

    if (verif) {
        router.push("/verification/")
    }
    else {
        return (
            <div>
                <h1 className="text-xl md:text-3xl text-black text-center py-6">Bienvenue très chers partenaires...</h1>
                <form className="bg-white p-10">
                    <div className="relative z-0 w-full mb-5 group">
                        <select value={categorie}
                        onChange={(e) => setCategorie(e.target.value)} type="text" name="select" id="select" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required>
                            <option value={"Restaurant"} defaultChecked>Restaurant</option>
                            <option value={"Salon de Coiffure"}>Salon De Coiffure</option>
                            <option value={"Commerce de meches"}>Commerce de meches</option>
                            <option value={"Cosmetique"}>Cosmetique</option>
                            <option value={"Textile"}>Textile</option>
                            <option value={"Fret"}>Fret</option>
                            <option value={"Epicerie"}>Epicerie</option>
                        </select>
                        <label for="select" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Categorie</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input onChange={(e) => setName(e.target.value)} type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom du gérant</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setOrganisation(e.target.value)} name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom de votre société</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setVille(e.target.value)} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ville</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setNumber(e.target.value)} name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numéro de structure</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setCodePostal(e.target.value)} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code postal</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setDescription(e.target.value)} name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setAdresse(e.target.value)} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => { setEmail(e.target.value.trim()) }} name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input accept="image/*" type="file" onChange={(e) => { setImage(e.target.files[0]) }} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image magasin</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required>    
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                        type="radio"
                                        value="oui"
                                        checked={selectedOption === 'oui'}
                                        onChange={handleChange}
                                        className="form-radio text-blue-600"
                                        />
                                        <span>Oui</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                        type="radio"
                                        value="non"
                                        checked={selectedOption === 'non'}
                                        onChange={handleChange}
                                        className="form-radio text-red-600"
                                        />
                                        <span>Non</span>
                                    </label>
                                </div>
                                {livraison === "oui" ? 
                                    <input className="border border-cyan-500 focus:outline-none" onChange={(e)=>setTaxe(e.target.value)}  placeholder="Entrez la valeur"/>
                                    :
                                    <>  </>
                                }
                            </div>
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Avez-vous un moyen de livraison ?</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setPassword(e.target.value)} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mot de passe</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" onChange={(e) => setPassword2(e.target.value)} name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-600 focus:outline-none focus:ring-0 focus:border-cyan7text-cyan-700 peer" placeholder=" " required />
                            <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-cyan-700 peer-focus:dark:text-cyanborder-cyan-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmation mot de passe</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 items-center justify-center">
                        <div className="flex flex-col space-y-4">
                            <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="option1"
                                checked={checkedItems.option1 || false}
                                onChange={handleChangeCheckBox}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span>{TermsCond}
                            <Link
                                color={"messenger.400"}
                                fontWeight={"bold"}
                                href={"/Terms"}
                                _hover={{ textDecoration: "none" }}>
                                termes et conditions
                            </Link></span>
                            </label>
                            
                        </div>
                        <Link _hover={{ textDecoration: "none" }}>
                            <button className="bg-cyan-700 text-white py-2 px-6 rounded-md"
                            // isDisabled={bool === true || email.length < 15 || password.length < 8 || password2.length < 8 }
                            isLoading={loader}
                            onClick={(e) => createUSer(e.preventDefault())}
                            // onClick={() => { handleImageUpload(image, categorie, organisation) }}
                            > 
                                Inscription
                            </button>
                        </Link>
                        <div className="">
                            <span>Avez vous deja un compte?{" "}</span>
                            <Link href="/Connexion">
                                <strong className="underline text-cyan-600">Connectez-vous</strong>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    
}

export default CreateStores;