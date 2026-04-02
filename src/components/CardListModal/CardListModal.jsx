import React from "react";
import "./CardListModal.css";
import Modal from "./Modal/Modal";
import CardList from "./CardList/CardList";
import { useContext } from "react";
import { Context } from "../../context/kartItemContext";
import SwipeableModal from "../SwipeableModal/SwipeableModal";

const CartListModal = ({ countMin, countSec, timer }) => {

    const { kartItem, orderTheme, t, tipTotal, total } = useContext(Context);

    return (
        <>
            <div
                id="cart-modal"
                className="modal full-popup products-modal cart-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="ItemsLabel"
                aria-hidden="true"
            >
                <div className="container ">
                    <div className="modal-dialog modal-dialog-zoom " role="document">
                        <SwipeableModal modalId="cart-modal">
                        <div id="modal-content-cart-modal" className="modal-content">
                            <div
                                className="modal-header"
                            >
                                <h4>
                                   {t("IbIItem")}
                                </h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Icons/close_24px">
                                            <path id="icon" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#1D1A22" />
                                        </g>
                                    </svg>

                                </button>
                            </div>
                           
                            {kartItem && kartItem?.length > 0 ? (
                            
                                <div
                                    className="modal-body"
                                >
                                    <div className="total-amounts">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <p className="total-hd">{t("lblTotal")}: {kartItem.length}</p>
                                            {total === 0 ?
                                                <p className="total-price" style={{ color: "black" }}></p>
                                                :
                                                <p className="total-price" style={{ color: "black" }}>
                                                    {"€" +
                                                        (parseFloat(tipTotal) + parseFloat(total)).toFixed(
                                                            2
                                                        )}
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    
                                    <CardList />

                                   
                                </div>

                            ) : (
                                    <div className="modal-body text-center empty-cart-img">
                                        <svg className="empty-basked-icon" width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M23.9067 32.3433L27.4175 75.2115C27.6737 78.5109 30.2995 80.9854 33.5076 80.9854H33.5309H97.0574H97.069C100.102 80.9854 102.693 78.6663 103.124 75.5881L108.655 36.3839C108.783 35.4515 108.556 34.519 108.003 33.7659C107.456 33.0068 106.652 32.5167 105.744 32.3852C104.527 32.433 54.031 32.3613 23.9067 32.3433ZM33.4954 89.9505C25.8275 89.9505 19.3357 83.806 18.7128 75.946L13.3796 10.8309L4.60545 9.2768C2.22416 8.84645 0.634683 6.53329 1.04224 4.08863C1.46144 1.64397 3.76123 0.0540503 6.09013 0.436588L18.2004 2.58836C20.1508 2.94102 21.6355 4.60267 21.8044 6.6349L23.1726 23.3769C106.291 23.4128 106.559 23.4546 106.961 23.5024C110.204 23.9866 113.056 25.7259 115.001 28.4037C116.946 31.0755 117.761 34.3689 117.295 37.6683L111.77 76.8665C110.728 84.326 104.416 89.9505 97.0802 89.9505H97.0511H33.542H33.4954Z" fill="#E7A536" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M87.7164 54.4325H71.5771C69.1609 54.4325 67.2104 52.4242 67.2104 49.9497C67.2104 47.4751 69.1609 45.4668 71.5771 45.4668H87.7164C90.1268 45.4668 92.0831 47.4751 92.0831 49.9497C92.0831 52.4242 90.1268 54.4325 87.7164 54.4325Z" fill="#E7A536" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M30.992 106.188C32.7445 106.188 34.1593 107.64 34.1593 109.44C34.1593 111.239 32.7445 112.697 30.992 112.697C29.2337 112.697 27.8188 111.239 27.8188 109.44C27.8188 107.64 29.2337 106.188 30.992 106.188Z" fill="#E7A536" />
                                            <mask id="mask0_432_5082" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="27" y="106" width="8" height="7">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M27.8142 109.438C27.8142 111.243 29.229 112.701 30.9932 112.701C32.7457 112.701 34.1605 111.243 34.1605 109.438C34.1605 107.638 32.7457 106.186 30.9932 106.186C29.229 106.186 27.8142 107.638 27.8142 109.438Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_432_5082)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M-1.29126 142.579H63.2716V76.2983H-1.29126V142.579Z" fill="#E7A536" />
                                            </g>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M30.9855 108.212C30.3276 108.212 29.7919 108.762 29.7919 109.438C29.7919 110.795 32.1849 110.795 32.1849 109.438C32.1849 108.762 31.6434 108.212 30.9855 108.212ZM30.9859 117.18C26.8288 117.18 23.4519 113.707 23.4519 109.44C23.4519 105.172 26.8288 101.705 30.9859 101.705C35.143 101.705 38.5257 105.172 38.5257 109.44C38.5257 113.707 35.143 117.18 30.9859 117.18Z" fill="#E7A536" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M96.6682 106.188C98.4207 106.188 99.8414 107.64 99.8414 109.44C99.8414 111.239 98.4207 112.697 96.6682 112.697C94.9099 112.697 93.4951 111.239 93.4951 109.44C93.4951 107.64 94.9099 106.188 96.6682 106.188Z" fill="#E7A536" />
                                            <mask id="mask1_432_5082" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="93" y="106" width="7" height="7">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M93.4951 109.438C93.4951 111.243 94.9099 112.701 96.6682 112.701C98.4149 112.701 99.8414 111.243 99.8414 109.438C99.8414 107.638 98.4149 106.186 96.6682 106.186C94.9099 106.186 93.4951 107.638 93.4951 109.438Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask1_432_5082)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M64.384 142.579H128.953V76.2983H64.384V142.579Z" fill="#E7A536" />
                                            </g>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M96.6616 108.211C96.0095 108.211 95.4738 108.761 95.4738 109.437C95.4797 110.805 97.8668 110.793 97.861 109.437C97.861 108.761 97.3195 108.211 96.6616 108.211ZM96.6624 117.18C92.5053 117.18 89.1284 113.707 89.1284 109.44C89.1284 105.172 92.5053 101.705 96.6624 101.705C100.825 101.705 104.208 105.172 104.208 109.44C104.208 113.707 100.825 117.18 96.6624 117.18Z" fill="#E7A536" />
                                        </svg>


                                    <h6>{t("lblYourCartIsEmpty")}</h6>
                                    {/* <p> */}
                                        {/* {t("lblYourCartIsEmpty")} */}
                                        <br />
                                        {/* {t("lblPleaseSelectItemsFromMenu")} */}
                                    {/* </p> */}
                                </div>
                            )}

                        </div>
                        </SwipeableModal>
                    </div>
                            <Modal countMin={countMin} countSec={countSec} timer={timer} />
                </div>
            </div>

            {/* <Modal countSec={countSec} countMin={countMin}  /> */}
        </>
    );
}

export default CartListModal;
