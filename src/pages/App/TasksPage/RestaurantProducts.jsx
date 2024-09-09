import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
// import { useToast } from 'react-toastify';
import toast from 'react-hot-toast';
import {
  child,
  get,
  getDatabase,
  increment,
  push,
  ref,
  remove,
  update,
} from "firebase/database";

import { db } from '../../../firebase-config';


function RestaurantProducts() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [last, setLast] = useState([]);
    const [id, setId] = useState([]);
    const router = useNavigate();

    const [org, setOrg] = useState();
    const [cat, setCat] = useState();
    const [finish, setFinish] = useState(false);
    // const toast = useToast();
    const [image, setImage] = useState([]);
    const [imageuri, setImageuri] = useState([]);

    const [name, setName] = useState();
    const [prix, setPrix] = useState();
    const [loader, setLoader] = useState(false);
    const [quantite, setQuantite] = useState(0);
    const [desc, setDesc] = useState();
    const [category, setCategorie] = useState();



  //enregistrer data
    function writeData(cat, org, name, prix, description, quantite) {
        if (name != null) {
            push(ref(db, cat + "/" + org), {
                nom: name,
                prix: parseFloat(prix),
                description: description,
                quantite: 0,
                imageUrl: [""],
                quantiteStock: 0,
                organisation: org,
                etat: "Disponible",
                note: "nouveau",
                categorieMenu:category,
            });
            toast({
                title: "SUCCÉS",
                description: "PRODUIT SAUVEGARDÉ AVEC SUCCES",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            router.reload();
        } else {
            toast({
                title: "VEUILLEZ RELANCER SVP",
                description: "Produit pas enregistre",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const handleState = (cat, org, id,state) => {
        try {
        update(ref(db, cat + "/" + org + "/" + id), {
        
            etat: state,
        
        });
        const dbRef = ref(getDatabase());
        get(child(dbRef, `course${cat}` + "/" + id)).then((snapshot) => {  update(ref(db, `course${cat}` + "/" + id), {
        
        etat: state,
        
        })});
    
        } catch (error) {
        
        }
    
        // router.reload();
        toast({
            title: "Mise à jour",
            description: "INFORMATION MISE À JOUR AVEC SUCCES",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        router.replace(router.asPath);
    
 
    };


    return (
        <>
            <div>
                <div className='flex justify-between'>
                <h1>
                    Produit de la carte
                </h1>
                <button
                    onClick={onOpen}
                    bgColor={"#08566e"}
                    _hover={{ bgColor: "blue.400" }}
                    color={"white"}
                >
                    Ajouter Produit
                </button>

                <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset="scale"
                    size={["lg", "lg", "lg", "xl", "xl"]}
                >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>AJOUT DE PRODUIT</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    
                        <div display={{base:"grid",lg:"flex"}}>
                        <form>
                            <label>Intitulé</label>
                            <input
                                value={name}
                                isRequired
                                placeholder="intitulé"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label>Prix de vente</label>
                            <input
                                isRequired
                                value={prix}
                                placeholder="Prix de vente"
                                type="number"
                                onChange={(e) => setPrix(e.target.value)}
                            />
                        </form>
                        <div>
                            <label>Catégories</label>
                            <select onChange={(e)=>setCategorie(e.target.value)}>
                            <option>Entrées</option>
                            <option>Plats</option>
                            <option>Accompagnements</option>
                            <option>Spécialités</option>
                            <option>Boissons</option>
                            <option>Cocktail</option>
                            </select>
                            <label>description</label>
                            <input
                                minH={"100px"}
                                width={{base:"full",lg:"300px"}}
                                isRequired
                                value={desc}
                                as={Textarea}
                                placeholder="Description"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <input type="hidden" value={org} />
                        </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button colorScheme="red" mr={3} onClick={onClose}>
                        FERMER
                        </button>
                        <button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                            writeData(cat, org, name, prix, desc, quantite);
                        }}
                        >
                        Valider
                        </button>

                    </ModalFooter>
                    </ModalContent>
                </Modal>
                </div>
                <div>

                <table variant="simple">
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <thead bgColor={"#fff"} borderColor={"#e9ecef"}>
                    <tr>
                        <th> Nom</th>
                        
                        <th>Description</th>
                        <th isNumeric>Prix</th>
                    
                        <th>Etat</th>
                        <th>Note</th>
                        <th>Actions </th>
                    </tr>
                    </thead>
                    <tbody padding={0} id="tb14">
                    {Object.values(last).map((items, index) => (
                        <tr key={index}>
                        <td>{items.nom}</td>
                        
                        <td>
                            <p width={300} height={20} noOfLines={4}>
                            {items.description}
                            </p>
                        </td>
                        <td>{items.prix}</td>
                        
                        <td>
                            <div display={"grid"} textAlign={"center"}>
                            {items.etat}
                            {items.etat === "Disponible" ?<button colorScheme="red" onClick={()=>handleState(cat,items.organisation,id[index],"Indisponible")}>En rupture</button> : <Button colorScheme="blue" onClick={()=>handleState(cat,items.organisation,id[index],"Disponible")}>Disponible</Button> }
                            </div>
                        </td>
                        <td>{items.note}</td>
                        <td>
                            {/* <div justifyContent={"space-around"} w={10}>
                            <EditProduct id={id[index]} cat={cat} desc={items.description}
                            org={items.organisation} name={items.nom}
                                prix={items.prix}  quantite={items.quantite}/>
                                
                            
                            <DeleteIcon
                                color={"red"}
                                fontSize={30}
                                cursor={"pointer"}
                                onClick={() => deleteData(cat, org, id[index])}
                            />
                            </div> */}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    );
}

export default RestaurantProducts