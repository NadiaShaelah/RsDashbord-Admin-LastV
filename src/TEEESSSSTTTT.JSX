const getOrdersDatas = async () => {
    setLoad(false)
    const data = getFirestore(database)
    const ordersRef = collection(data, "Admin");
        
    const q = query(ordersRef);
    
    const log = await getDocs(q)
    console.log("log ::: ", log.docs);
    // let datas = ref(getDatabase(database), "/Commandes");
    // let datas = query(ref(getDatabase(database), "/Commandes"), orderBy("totalPrice", "desc").startAt(21));
    // onValue(datas, snapshot => {
    //     const data = snapshot.val()
    //     console.log(data)
    //     setOrdersDatas(data)
    //     // const q = query(datas, where("status", "===", "En cours"))
    //     // console.log("qp :: ", q);
    // })
    /**
     *  const ordersRef = collection(db, "orders");
        const q = query(ordersRef, orderBy("orderCreatedAt");
        const querySnapshot = await getDocs(q);
     */
}
// // Fonction pour récupérer tous les paniers d'un utilisateur
// async function getCartsByUserId(userId) {
// try {
//   const cartRef = collection(db, 'orders'); // Assurez-vous que la collection est correcte.
//   const q = query(cartRef, where('email', '==', userId));

//   const querySnapshot = await getDocs(q);
//   console.log("querySnapshot ::: ", querySnapshot);
//   const userCarts = [];

//   querySnapshot.forEach((doc) => {
//     userCarts.push(doc.data());
//   });
//   // console.log("successful")
//   return userCarts;
// } catch (error) {
//   console.error("Erreur lors de la récupération du panier :", error);
//   return [];
// }
// }