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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.32759 8.34749L6.93059 15.5195C6.97459 16.0715 7.42559 16.4855 7.97659 16.4855H7.98059H18.8916H18.8936C19.4146 16.4855 19.8596 16.0975 19.9336 15.5825L20.8836 9.02349C20.9056 8.86749 20.8666 8.71149 20.7716 8.58549C20.6776 8.45849 20.5396 8.37649 20.3836 8.35449C20.1746 8.36249 11.5016 8.35049 6.32759 8.34749ZM7.97459 17.9855C6.65759 17.9855 5.54259 16.9575 5.43559 15.6425L4.51959 4.74849L3.01259 4.48849C2.60359 4.41649 2.33059 4.02949 2.40059 3.62049C2.47259 3.21149 2.86759 2.94549 3.26759 3.00949L5.34759 3.36949C5.68259 3.42849 5.93759 3.70649 5.96659 4.04649L6.20159 6.84749C20.4776 6.85349 20.5236 6.86049 20.5926 6.86849C21.1496 6.94949 21.6396 7.24049 21.9736 7.68849C22.3076 8.13549 22.4476 8.68649 22.3676 9.23849L21.4186 15.7965C21.2396 17.0445 20.1556 17.9855 18.8956 17.9855H18.8906H7.98259H7.97459Z" fill="#FFFFFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.2876 12.043H14.5156C14.1006 12.043 13.7656 11.707 13.7656 11.293C13.7656 10.879 14.1006 10.543 14.5156 10.543H17.2876C17.7016 10.543 18.0376 10.879 18.0376 11.293C18.0376 11.707 17.7016 12.043 17.2876 12.043Z" fill="#FFFFFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.54451 20.7012C7.84551 20.7012 8.08851 20.9442 8.08851 21.2452C8.08851 21.5462 7.84551 21.7902 7.54451 21.7902C7.24251 21.7902 6.99951 21.5462 6.99951 21.2452C6.99951 20.9442 7.24251 20.7012 7.54451 20.7012Z" fill="#FFFFFF" />
                        <mask id="mask0_925_6952"  maskUnits="userSpaceOnUse" x="6" y="20" width="3" height="2">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.99902 21.2452C6.99902 21.5472 7.24202 21.7912 7.54502 21.7912C7.84602 21.7912 8.08902 21.5472 8.08902 21.2452C8.08902 20.9442 7.84602 20.7012 7.54502 20.7012C7.24202 20.7012 6.99902 20.9442 6.99902 21.2452Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_925_6952)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 26.7902H13.089V15.7012H2V26.7902Z" fill="#FFFFFF" />
                        </g>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.54345 21.0428C7.43045 21.0428 7.33845 21.1348 7.33845 21.2478C7.33845 21.4748 7.74945 21.4748 7.74945 21.2478C7.74945 21.1348 7.65645 21.0428 7.54345 21.0428ZM7.54351 22.5421C6.82951 22.5421 6.24951 21.9611 6.24951 21.2471C6.24951 20.5331 6.82951 19.9531 7.54351 19.9531C8.25751 19.9531 8.83851 20.5331 8.83851 21.2471C8.83851 21.9611 8.25751 22.5421 7.54351 22.5421Z" fill="#FFFFFF" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.8248 20.7031C19.1258 20.7031 19.3698 20.9461 19.3698 21.2471C19.3698 21.5481 19.1258 21.7921 18.8248 21.7921C18.5228 21.7921 18.2798 21.5481 18.2798 21.2471C18.2798 20.9461 18.5228 20.7031 18.8248 20.7031Z" fill="#FFFFFF" />
                        <mask id="mask1_925_6952"  maskUnits="userSpaceOnUse" x="18" y="20" width="2" height="2">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.2798 21.2452C18.2798 21.5472 18.5228 21.7912 18.8248 21.7912C19.1248 21.7912 19.3698 21.5472 19.3698 21.2452C19.3698 20.9442 19.1248 20.7012 18.8248 20.7012C18.5228 20.7012 18.2798 20.9442 18.2798 21.2452Z" fill="white" />
                        </mask>
                        <g mask="url(#mask1_925_6952)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.2798 26.7902H24.3698V15.7012H13.2798V26.7902Z" fill="#FFFFFF" />
                        </g>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.8238 21.0425C18.7118 21.0425 18.6198 21.1345 18.6198 21.2475C18.6208 21.4765 19.0308 21.4745 19.0298 21.2475C19.0298 21.1345 18.9368 21.0425 18.8238 21.0425ZM18.8238 22.5421C18.1098 22.5421 17.5298 21.9611 17.5298 21.2471C17.5298 20.5331 18.1098 19.9531 18.8238 19.9531C19.5388 19.9531 20.1198 20.5331 20.1198 21.2471C20.1198 21.9611 19.5388 22.5421 18.8238 22.5421Z" fill="#FFFFFF" />
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