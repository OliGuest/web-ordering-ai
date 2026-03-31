import React, { useEffect } from "react";
import "./PaymentMethodModal.css";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import Modal from 'react-bootstrap/Modal';
import mastrcard from "../../../assets/img/mastercard.svg";
import cashLogo from "../../../assets/img/cash.svg";
import Paycard from "../../../assets/img/pay-logos.svg";
import AppleLogo from "../../../assets/img/AppleLogo.svg";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSendPayWithCashRequest } from "../../../Hooks/useSendPayWithCashRequest";
import { useSendPayWithPinRequest } from "../../../Hooks/useSendPayWithPinRequest";

const PaymentMethodModal = ({ showPaumentMethod, handlePaymentMethodClose, handleShowPayment, handleShowPaymentCardInfo, showPin, showCash, showQRpay }) => {
    const [sendPayWithCash] = useSendPayWithCashRequest();
    const [sendPayWithPin] = useSendPayWithPinRequest();

    const { 
        // billTheme,   
        kartHistoryStore, t, 
        // activeColor, orderHistory 
    } = useContext(Context);
    // const [history, setHistory] = useState(orderHistory);

    useEffect(() => {

    }, [kartHistoryStore]);

    return (
        <div >
            <Modal id="payment-method-modal"
                className="modal full-popup products-modal cart-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="contained-modal-title-vcenter"
                aria-hidden="true" show={showPaumentMethod} onHide={handlePaymentMethodClose}
                centered
            >
                <Modal.Header >
                    <button onClick={handlePaymentMethodClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Icons/close_24px">
                                <path id="icon" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#1D1A22" />
                            </g>
                        </svg>

                    </button>
                    <h4>
                        {kartHistoryStore && kartHistoryStore?.length > 1
                            ? ` ${t("IbIPayment")}`
                            : ` ${t("IbIPayment")}`}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="dynamic-list">
                        <h4>{t("IbIPaymentMethod")}</h4>
                        <div className="payment-method-wrapper">

                            
                            {showPin && (
                               <button onClick={() => sendPayWithPin()} className="method-block">
                               <svg width="42" height="46" viewBox="0 0 42 46" fill="none" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                   <rect x="0.5" y="0.5" width="41" height="45" fill="url(#pattern0)" />
                                   <defs>
                                       <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                           <use href="#image0_1332_2857" transform="matrix(0.01 0 0 0.00911111 0 0.0444444)" />
                                       </pattern>
                                       <image id="image0_1332_2857" width="100" height="100" href="data:image/png;base64,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" />
                                   </defs>
                               </svg>
                           </button>
                            )}
                            {showCash && (
                               <button onClick={() => sendPayWithCash()} className="method-block">
                                     <img src={cashLogo} alt="cash" />
                                </button>
                            )}
                            
                            {/* <button className="method-block">
                                <svg width="44" height="14" viewBox="0 0 44 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.3053 13.7441H7.60297L4.82667 3.11439C4.69489 2.62542 4.4151 2.19315 4.00353 1.98941C2.9764 1.47741 1.84458 1.06994 0.609863 0.864434V0.45519H6.57404C7.39719 0.45519 8.01455 1.06994 8.11744 1.7839L9.55794 9.45148L13.2585 0.45519H16.8579L11.3053 13.7441ZM18.9157 13.7441H15.4192L18.2984 0.45519H21.7949L18.9157 13.7441ZM26.3185 4.13635C26.4214 3.42062 27.0388 3.01138 27.7591 3.01138C28.8909 2.90862 30.1238 3.11413 31.1527 3.62436L31.7701 0.76319C30.7411 0.353945 29.6093 0.148438 28.5822 0.148438C25.1885 0.148438 22.7191 1.98915 22.7191 4.54383C22.7191 6.48729 24.4683 7.50775 25.703 8.1225C27.0388 8.73548 27.5533 9.14472 27.4504 9.7577C27.4504 10.6772 26.4214 11.0864 25.3943 11.0864C24.1596 11.0864 22.9249 10.7799 21.7949 10.2679L21.1775 13.1309C22.4122 13.6411 23.748 13.8466 24.9827 13.8466C28.788 13.9476 31.1527 12.1086 31.1527 9.34846C31.1527 5.87254 26.3185 5.66881 26.3185 4.13635ZM43.3898 13.7441L40.6135 0.45519H37.6314C37.0141 0.45519 36.3967 0.864434 36.1909 1.47741L31.0499 13.7441H34.6493L35.3678 11.8024H39.7904L40.2019 13.7441H43.3898ZM38.1459 4.03354L39.1731 9.0419H36.2939L38.1459 4.03354Z" fill="#172B85" />
                                </svg>
                            </button> */}
                            {/* <button className="method-block">
                                <img src={mastrcard} alt="mastercard logo" />
                            </button> */}
                            {/* <button className="method-block">
                                <img src={Paycard} alt="Pay logo" />
                            </button> */}
                            {/* <button className="method-block">
                                <img src={AppleLogo} alt="Apple logo" />
                            </button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}
export default PaymentMethodModal;