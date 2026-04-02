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

        <div className={`cart-modal-footer`}>

            <div className="cart-footer-info">
                <span className="cart-footer-count">
                    {t("IbIItemsInBasket")}: {bascketLenght}
                </span>
                {timer && (
                    <span className="cart-footer-timer">{countMin}:{countSec}</span>
                )}
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