import React from "react";
import "./ThankyouModal.css";
import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import { useClearPreviousSteps } from "../../../Hooks/useClearPreviousSteps";

const ThankyouModal = () => {

    const { t, togglePaymentReceievedModel, paymentReceieved } = useContext(Context);
    const [clearPreviousSteps] = useClearPreviousSteps();

    return (
        <Modal
            className="modal fade full-popup sent-modal"
            show={paymentReceieved}
            onHide={togglePaymentReceievedModel}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <div className="container h-100">
                    <div className="modal-dialog modal-dialog-zoom" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    onClick={clearPreviousSteps}
                                >
                                    <img src="assets/img/x.svg" alt="" />
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <img src="assets/img/thankyou.png" alt="img" />
                                <h6>{t("lblYeah,PaymentSuccessful")}!</h6>
                                <p>
                                    {t("lblYour paymentWasSuccessful,Now")}
                                    <br />
                                    {t("lblSitAndWaitForYourFood ToArrive")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ThankyouModal;