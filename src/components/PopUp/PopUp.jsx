import React from 'react'

function PopUp({open, onClose, children}) {
    return (
        <section className="popup">
            <div onClick={onClose} className={`w-full px-4 lg:px-0 fixed inset-0 flex justify-center items-center transition-colors z-10
                ${open ? "visible bg-black/20" : "invisible"}`}>
                <div className={`w-full lg:w-[40%] flex flex-col gap-8 bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                    <button className={`absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white
                    hover:bg-gray-50 hover:text-gray-600`} onClick={onClose}>X</button>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default PopUp;

// function ReservationModal({open, onClose, children}) {
//     return (
//         <div onClick={onClose} className={`w-full px-4 lg:px-0 fixed inset-0 flex justify-center items-center transition-colors z-10
//             ${open ? "visible bg-black/20" : "invisible"}`}>
//             <div className={`w-full lg:w-[40%] flex flex-col gap-8 bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
//                 <button className={`absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white
//                 hover:bg-gray-50 hover:text-gray-600`} onClick={onClose}>X</button>
//                 {children}
//             </div>
//         </div>
//     )
// }
// <section className="popup">
//     <div className="bg-white w-[400px] mx-auto rounded-md p-4">
//         <div className="flex flex-col items-center gap-4">
//             <h2 className='text-2xl font-semibold'>Confirmer l'annulation.</h2>
//             <p className='text-lg'>Êtes-vous sûr de vouloir annuler ?</p>
//             <div className="flex gap-4">
//                 <button className='bg-red-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Annuler</button>
//                 <button className='bg-green-600 text-white font-semibold text-lg py-2 px-4 rounded-md'>Retour</button>
//             </div>
//         </div>
//     </div>
// </section>