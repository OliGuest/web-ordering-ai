
import React from "react";
import "./DoneOrdering.css"
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";

const DoneOrdering = () => {

    const { waitGuestToConf, t } = useContext(Context);


    const modalClose = () => {
        document.getElementById("modalDoneOrdering").style.visibility = "hidden";
    };

    return (

        <div className="modal-empty-wrapper" id="modalDoneOrdering">
            <div className="modal-empty">
                {/* <div className="close-modal-btn" onClick={modalClose}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15.8333 5.34175L14.6583 4.16675L9.99996 8.82508L5.34163 4.16675L4.16663 5.34175L8.82496 10.0001L4.16663 14.6584L5.34163 15.8334L9.99996 11.1751L14.6583 15.8334L15.8333 14.6584L11.175 10.0001L15.8333 5.34175Z" fill="#252424" />
                    </svg>
                </div> */}
                <div className="icon-text">

                    {/* <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                        <path d="M10.0833 6.91671H11.9167V8.75004H10.0833V6.91671ZM10.0833 10.5834H11.9167V16.0834H10.0833V10.5834ZM11 2.33337C5.94001 2.33337 1.83334 6.44004 1.83334 11.5C1.83334 16.56 5.94001 20.6667 11 20.6667C16.06 20.6667 20.1667 16.56 20.1667 11.5C20.1667 6.44004 16.06 2.33337 11 2.33337ZM11 18.8334C6.95751 18.8334 3.66668 15.5425 3.66668 11.5C3.66668 7.45754 6.95751 4.16671 11 4.16671C15.0425 4.16671 18.3333 7.45754 18.3333 11.5C18.3333 15.5425 15.0425 18.8334 11 18.8334Z" fill="#0288D1" />
                    </svg> */}

                    <p>{waitGuestToConf} {t("lblmodalDoneOrdering")}</p>
                </div>
            </div>
        </div>
    )
}

export default DoneOrdering;
