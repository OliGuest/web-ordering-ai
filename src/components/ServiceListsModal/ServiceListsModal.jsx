import React from "react";
import "./ServiceListsModal.css";
import ServiceList from "./ServiceList/ServiceList";
// import Modal from "./Modal/Modal";
import { useContext } from "react";
import { Context } from "../../context/kartItemContext";

const ServiceListsModal = () => {

    const { serviceCallTheme, serviceCall, t, billTheme, kartHistoryStore } = useContext(Context)


    return (
        <>
            <div
                id="service-modal"
                className="modal full-popup products-modal cart-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="ItemsLabel"
                aria-hidden="true"
                // onClick={() => changeHeight()}
            >

                <div className="container">
                    <div className="modal-dialog modal-dialog-zoom" role="document" style={{aligItems: "flex-end"}}>
                        <div id="modal-content" className="modal-content">
                            <div
                                className="modal-header"
                            >
                                <h4>
                                    {kartHistoryStore && kartHistoryStore?.length > 1
                                        ? ` ${t("lblServices")}`
                                        : ` ${t("lblServices")}`}
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
                            >
                                {/* <div className="bar-heading">
                                    <div className="bar-heading-line"></div>
                                    <h4 style={{ color: `${serviceCallTheme?.ServiceCallTextColor}` }}>
                                        {t("lblService")}
                                    </h4>
                                </div> */}
                                <div className="service-bar-content" >
                                    {serviceCall?.map((data, index) => (
                                        <div className="service-list" key={index}>
                                            {/* <h5
                                                className="bar-sm-heading"
                                                style={{ color:  "black" }}
                                                // style={{ color: `${serviceCallTheme?.PickUpColor}` }}
                                            >
                                                {data?.Name}
                                            </h5> */}
                                            <ul>
                                                {data?.ServiceCalls?.map((data, index) => (
                                                    <ServiceList
                                                        key={index}
                                                        data={data}
                                                        serviceCallTheme={serviceCallTheme}

                                                    />
                                                ))}

                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="clearfix"></div>
                                {/* <div className="cart-modal-footer">
                                    <div className="tips"></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <Modal /> */}
        </>
    )
}

export default ServiceListsModal;