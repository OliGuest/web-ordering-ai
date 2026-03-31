import React from "react";
import "./AboutModal.css";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";

const AboutModal = () => {

    const { billTheme, kartHistoryStore, t } = useContext(Context);

    return (

        <div
            id="about-modal"
            className="modal fade full-popup products-modal cart-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="ItemsLabel"
            aria-hidden="true"
        >
            <div className="container h-100">
                <div className="modal-dialog modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{
                                backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                                margin: "0 -15px",
                            }}
                        >
                            <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                                {kartHistoryStore && kartHistoryStore?.length > 1
                                    ? ` ${t("IbIaboutModalHeader")}`
                                    : ` ${t("IbIaboutModalHeader")}`}
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
                        <div
                            className="modal-body"
                            style={{
                                backgroundColor: `${billTheme?.BackgroundColor}`,
                                margin: "0 -15px",
                            }}
                        >
                            <p>
                               {t("IbIAboutModalDesc")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutModal;