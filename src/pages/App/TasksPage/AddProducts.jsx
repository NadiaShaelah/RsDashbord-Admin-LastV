import React, { useEffect, useState } from "react";
import RestaurantProducts from "./RestaurantProducts";
import TextileProducts from "./TextileProducts";
import EpicerieProducts from "./EpicerieProducts";


function AddProducts({categ}) {
    const [cat, setCat] = useState();

    useEffect(() => {
        // setCat(sessionStorage.getItem("cat"));
        setCat(JSON.parse(sessionStorage.getItem("cat")))
    }, []);

    return (
        <div className={" h-screen"} mt={-5} pb={20} overflowY={"auto"}>
            <RestaurantProducts/>
            {/* {categ === "Restaurant" ? <RestaurantProducts/> : cat === "Textile" ? <TextileProducts/> :  <EpicerieProducts/>} */}
        </div>
    );
}

export default AddProducts;