import React from "react";
import "./Modal.css";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import { usePlaceOrderHandler } from "../../../Hooks/usePlaceOrderHandler";

const Modal = ({ countMin, countSec, timer }) => {

    const { t, 
        // orderTheme, 
        // getTotalQuantityInKaart, 
        total, bascketLenght } = useContext(Context)
    const [placeOrderHandler] = usePlaceOrderHandler();


    return (

        <div className={`cart-modal-footer`}    >

            <div className={`cart-bar-content text-white ${parseFloat(total) === 0 ? "justify-content-center" : "justify-content-between"}`}>

                <div className="icon-text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    {timer &&
                        <p className="close-time cardBarText">
                            <span
                                id="seconds"
                                className=""
                                style={{ color: `white` }}
                            >
                                {countMin}:{countSec}
                            </span>
                        </p>
                    }
                    <h4 className="font_500 products">
                        {t("IbIItemsInBasket")}: {bascketLenght}
                    </h4>
                </div>

                {/* {parseFloat(total) === 0 ?
                        // eslint-disable-next-line
                        ""
                        :
                        <h4 className="cart-price mb-0">
                            € {total === "NaN" ? 0 : parseFloat(total)}
                        </h4>
                    } */}


            </div>
            <div className="continue-float-btn"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#received-order"
                id="placeOrderBtn"
                style={{
                    // backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                    textDecoration: "none",
                    // borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                    // borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                }}
                onClick={() => { placeOrderHandler(); }}>
                {t("lblPlaceOrder")}

                {/* <span
                    style={{ color: `${orderTheme?.ButtonTextColor}` }}
                >
                    {" "}
                    {t("lblPlaceOrder")}{" "}
                </span> */}

                {timer &&
                    <p className="close-time cardBarText">
                        <span
                            id="seconds"
                            className=""
                            style={{ color: `white ` }}
                        >
                            {countMin}:{countSec}
                        </span>
                    </p>
                }
            </div>



        </div>
    )
}

export default Modal;