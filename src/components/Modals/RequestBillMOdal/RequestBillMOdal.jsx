
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../../context/kartItemContext";
import "./RequestBillMOdal.css"

const RequestBillMOdal = () => {

    const { t } = useTranslation();
    const { activeColor } = useContext(Context);

    const modalClose = () => {
        document.getElementById("modalRequestEmpty").style.visibility = "hidden";
    };

    return (

        <div className="modal-empty-wrapper" id="modalRequestEmpty">
            <div className="modal-empty">
                <div className="close-modal-btn" >

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15.8333 5.34175L14.6583 4.16675L9.99996 8.82508L5.34163 4.16675L4.16663 5.34175L8.82496 10.0001L4.16663 14.6584L5.34163 15.8334L9.99996 11.1751L14.6583 15.8334L15.8333 14.6584L11.175 10.0001L15.8333 5.34175Z" fill="#252424" />
                    </svg>
                </div>
                <div className="icon-text">

                    <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                        <path d="M10.0833 6.91665H11.9167V8.74998H10.0833V6.91665ZM10.0833 10.5833H11.9167V16.0833H10.0833V10.5833ZM11 2.33331C5.94001 2.33331 1.83334 6.43998 1.83334 11.5C1.83334 16.56 5.94001 20.6666 11 20.6666C16.06 20.6666 20.1667 16.56 20.1667 11.5C20.1667 6.43998 16.06 2.33331 11 2.33331ZM11 18.8333C6.95751 18.8333 3.66668 15.5425 3.66668 11.5C3.66668 7.45748 6.95751 4.16665 11 4.16665C15.0425 4.16665 18.3333 7.45748 18.3333 11.5C18.3333 15.5425 15.0425 18.8333 11 18.8333Z" fill="#0288D1" />
                    </svg>

                    <p>{t("lblRequestTheBill")}</p>
                </div>

                <div className="bottom-clear-buttons">
                    <button className="btn-bottom cancel-request-bill" 
                         >{t("lblCancel")}</button>
                    <button className="btn-bottom confirm-request-bill" style={{ background: `${activeColor}` }} onClick={() => {

                    }}>{t("lblYes")}</button>
                </div>

            </div>

        </div>
    )
}

export default RequestBillMOdal;
