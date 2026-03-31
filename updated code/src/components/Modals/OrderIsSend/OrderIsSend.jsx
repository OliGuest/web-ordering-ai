
// import React from "react";
// import { useContext } from "react";
// import "./OrderIsSend.css";
// import { Context } from "../../../context/kartItemContext";

// const OrderIsSend = () => {

//     const { t } = useContext(Context);


//     const modalClose = () => {
//         document.getElementById("modalOrderIsSend").style.visibility = "hidden";
//     };

//     return (

//         <div className="modal-empty-wrapper" id="modalOrderIsSend" onClick={modalClose}>
//             <div className="modal-empty">
//                 <div className="close-modal-btn" onClick={modalClose}>

//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M15.8333 5.34175L14.6583 4.16675L9.99996 8.82508L5.34163 4.16675L4.16663 5.34175L8.82496 10.0001L4.16663 14.6584L5.34163 15.8334L9.99996 11.1751L14.6583 15.8334L15.8333 14.6584L11.175 10.0001L15.8333 5.34175Z" fill="#252424" />
//                     </svg>
//                 </div>
//                 <div className="icon-text done-modal-text">

//                     {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
//                         <path d="M14.2077 5.44834L8.16683 11.4892L4.876 8.20751L3.5835 9.50001L8.16683 14.0833L15.5002 6.75001L14.2077 5.44834ZM10.0002 0.333344C4.94016 0.333344 0.833496 4.44001 0.833496 9.50001C0.833496 14.56 4.94016 18.6667 10.0002 18.6667C15.0602 18.6667 19.1668 14.56 19.1668 9.50001C19.1668 4.44001 15.0602 0.333344 10.0002 0.333344ZM10.0002 16.8333C5.9485 16.8333 2.66683 13.5517 2.66683 9.50001C2.66683 5.44834 5.9485 2.16668 10.0002 2.16668C14.0518 2.16668 17.3335 5.44834 17.3335 9.50001C17.3335 13.5517 14.0518 16.8333 10.0002 16.8333Z" fill="#2E7D32" />
//                     </svg> */}

//                     <p>{t("lblmodalOrderIsSend")}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default OrderIsSend;
