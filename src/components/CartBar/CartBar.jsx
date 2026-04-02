import React from "react";
import "./CartBar.css";
import { useContext } from "react";
import { Context } from "../../context/kartItemContext";

const CartBar = ({ countMin, countSec, visible, timer }) => {

    const { 
        // getTotalQuantityInKaart, 
        // activeColor, 
        total, bascketLenght, t } = useContext(Context);

   

    return (
        <div
            className={`cart-bar hideOnScroll ${visible ? "toBottom" : ""}`}
           
            style={{
                opacity: 1,
                visibility: "visible",
            }}
        >
            <div className={`cart-bar-content text-white ${parseFloat(total) === 0 ? "justify-content-center" : "justify-content-between"}`}>

               <div className="icon-text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                data-toggle="modal"
                data-target="#cart-modal"
                style={{
                    opacity: 1,
                    visibility: "visible"
                }}>{t("lblPlaceOrder")}
                </div>
        </div>

    )
}

export default CartBar;