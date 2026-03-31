import React, { useContext } from "react";
import "./Modal.css";
import { useClearIntervalFun } from "../../../Hooks/useClearIntervalFun";
import { Context } from "../../../context/kartItemContext";

const Modal = () => {

    const { t, } = useContext(Context)

    const [ clearIntervalFun ] = useClearIntervalFun();

    return (

        <div
            id="service-sent"
            className="modal fade full-popup sent-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="ServiceSentLabel"
            aria-hidden="true"
        >
            <div className="container h-100">
                <div className="modal-dialog modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={clearIntervalFun}
                            >
                                <img src="assets/img/x.svg" alt="" />
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <img src="assets/img/service-sent.svg" alt="img" />
                            <h6>{t("lblMSG3")}</h6>
                            <p>
                                {t("lblMSG1")}
                                <br />
                                {t("lblMSG2")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal;