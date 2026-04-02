import React from "react";
import "./SettingsModal.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import Modal from 'react-bootstrap/Modal';

const SettingsModal = ({ show, handleClose }) => {

    const { kartHistoryStore, t, } = useContext(Context);

    return (
        <div >

            <Modal id="settings-modal"
                className="modal full-popup products-modal cart-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="contained-modal-title-vcenter"
                aria-hidden="true" show={show} onHide={handleClose}
            >
                <Modal.Header >
                    <button onClick={handleClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Icons/close_24px">
                                <path id="icon" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#1D1A22" />
                            </g>
                        </svg>

                    </button>
                    <h4>
                        {kartHistoryStore && kartHistoryStore?.length > 1
                            ? ` ${t("IbISettings")}`
                            : ` ${t("IbISettings")}`}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="language-allergens-options">
                        <button onClick={() => {
                            handleClose();
                            setTimeout(() => {
                                const modal = document.getElementById('language-modal');
                                if (modal) {
                                    modal.classList.add('show');
                                    modal.style.display = 'flex';
                                    document.body.classList.add('modal-open');
                                }
                            }, 300);
                        }}>{t("IbILanguage")}</button>
                        <button onClick={() => {
                            handleClose();
                            setTimeout(() => {
                                const modal = document.getElementById('alergens-modal');
                                if (modal) {
                                    modal.classList.add('show');
                                    modal.style.display = 'flex';
                                    document.body.classList.add('modal-open');
                                }
                            }, 300);
                        }}>{t("lblAllergies")}</button>
                    </div>

                    <div className="about-rules">
                        {/* <button>{t("IbIAbout")}</button> */}
                        <Link to="/about"
                            className="side-menulink"
                        >
                            {t("IbIAbout")}
                        </Link>
                        <Link
                            to="/HouseRules"
                            className="side-menulink">

                            {t("IbIHouseAndRules")}
                        </Link>
                        {/* <button>{t("IbIHouseAndRules")}</button> */}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default SettingsModal;