import React from "react";
import "./FacebookModal.css";
import { Modal } from "react-bootstrap";
import ReactFbLike from "react-fb-like";
import { useClearIntervalFun } from "../../../Hooks/useClearIntervalFun";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";

const FacebookModal = () => {

    const { recievedOrder, handleRecievedOrderClose, setRecievedOrder, setshowFbLike, activeColor, showFbLike, orderTheme, t, handleClose } = useContext(Context);

    const [clearIntervalFun] = useClearIntervalFun();


    return (
        <Modal
            id="fb-modal"
            className="modal fade full-popup sent-modal"
            show={recievedOrder}
            onHide={handleRecievedOrderClose}
            backdrop="static"
            keyboard={false}
        >
            <div className="container h-100">
                <div className="modal-dialog modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div className="modal-close-btn mt-3">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    handleClose();
                                    setRecievedOrder(false);
                                    // clearIntervalFun();
                                    setshowFbLike(false);
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-header">
                            <p className="close-time">
                                {t("lblClosingIn")}{" "}
                                <span
                                    id="seconds"
                                    className="js-timeout"
                                    style={{ color: `${activeColor}` }}
                                >
                                    00:10
                                </span>
                            </p>
                        </div>
                        <div className="modal-body text-center">
                            <img className="mt-auto" src="assets/img/order.png" alt="img" />
                            <h6>{t("lblMSG4")}</h6>
                            <p>
                                {t("lblMSG5")}
                                <br />
                                {t("lblMSG6")}
                            </p>
                            {showFbLike ? (
                                <div className="p-4 mt-auto w-100">
                                    <a
                                        href="#myModal1"
                                        // id="place-order"
                                        className="facebok-butn butn butn-blue disable-btn w-100"
                                        data-dismiss="modal"
                                        data-toggle="modal"
                                        data-target="#myModal1"
                                        id="placeOrderBtn"
                                    >
                                        <span style={{ color: `${orderTheme?.ButtonTextColor}` }}>
                                            <svg
                                                width={28}
                                                height={27}
                                                viewBox="0 0 28 27"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 12.0124V24.4035C1 25.0609 1.53901 25.5981 2.19858 25.5981H6.59575C7.03546 25.5981 7.42553 25.3578 7.63121 25.0043C8.2766 25.6193 9.15603 26.001 10.1206 26.001H21.2128C23.6667 26.001 25.227 24.7216 25.5035 22.4879L26.9929 13.0373C27 13.002 27 12.9737 27 12.9383C27 10.9521 25.3759 9.34046 23.3901 9.34046H17.7801V5.31139C17.7801 3.61494 17.2837 2.38502 16.2979 1.67109C14.7447 0.53306 12.6028 1.18337 12.5106 1.21164C12.2411 1.29646 12.0638 1.54386 12.0638 1.81953V6.33633C12.0638 9.89887 7.91489 11.1147 7.74468 11.1641C7.65957 11.1853 7.58865 11.2278 7.52482 11.2772C7.30496 11.0016 6.96454 10.8249 6.58865 10.8249H2.19149C1.53901 10.8178 1 11.355 1 12.0124ZM8.09929 12.3941C8.31206 12.3375 13.3617 10.8743 13.3617 6.33633V2.33554C13.9149 2.25071 14.8652 2.20123 15.5532 2.7031C16.1844 3.16962 16.5106 4.04612 16.5106 5.31139V9.9837C16.5106 10.3371 16.8014 10.6269 17.156 10.6269H23.4043C24.6738 10.6269 25.7092 11.6448 25.7305 12.903L24.2482 22.3112C24.2482 22.3183 24.2482 22.3254 24.2482 22.3324C24.0567 23.9228 23.0355 24.7287 21.227 24.7287H10.1277C8.84397 24.7287 7.80142 23.6896 7.80142 22.4102V12.4011C7.89362 12.4223 8 12.4223 8.09929 12.3941ZM2.28369 12.0972H6.51064V24.3187H2.28369V12.0972Z"
                                                    fill="white"
                                                    stroke="white"
                                                    strokeWidth="0.5"
                                                />
                                            </svg>{" "}
                                            {t("lblThankYouForLikingUs!")}{" "}
                                        </span>
                                    </a>
                                    {/* modal */}

                                    <button
                                        onClick={() => {
                                            handleClose();
                                            setRecievedOrder(false);
                                            clearIntervalFun();
                                        }}
                                        className="facebok-butn butn butn-blue w-100 mt-4 order-close-btn"
                                        style={{
                                            backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                                            textDecoration: "none",
                                            borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                                            borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                                        }}
                                    >
                                        {t("lblClose")}
                                    </button>
                                </div>
                            ) : (
                                <div className="p-4 mt-auto w-100">
                                    <a
                                        href="#myModal1"
                                        // id="place-order"
                                        className="facebok-butn butn butn-blue w-100"
                                        data-dismiss="modal"
                                        data-toggle="modal"
                                        data-target="#myModal1"
                                        id="placeOrderBtn"
                                        style={{
                                            backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                                            textDecoration: "none",
                                            borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                                            borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                                        }}
                                        onClick={() => setshowFbLike(true)}
                                    >
                                        <span style={{ color: `${orderTheme?.ButtonTextColor}` }}>
                                            <svg
                                                width={28}
                                                height={27}
                                                viewBox="0 0 28 27"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 12.0124V24.4035C1 25.0609 1.53901 25.5981 2.19858 25.5981H6.59575C7.03546 25.5981 7.42553 25.3578 7.63121 25.0043C8.2766 25.6193 9.15603 26.001 10.1206 26.001H21.2128C23.6667 26.001 25.227 24.7216 25.5035 22.4879L26.9929 13.0373C27 13.002 27 12.9737 27 12.9383C27 10.9521 25.3759 9.34046 23.3901 9.34046H17.7801V5.31139C17.7801 3.61494 17.2837 2.38502 16.2979 1.67109C14.7447 0.53306 12.6028 1.18337 12.5106 1.21164C12.2411 1.29646 12.0638 1.54386 12.0638 1.81953V6.33633C12.0638 9.89887 7.91489 11.1147 7.74468 11.1641C7.65957 11.1853 7.58865 11.2278 7.52482 11.2772C7.30496 11.0016 6.96454 10.8249 6.58865 10.8249H2.19149C1.53901 10.8178 1 11.355 1 12.0124ZM8.09929 12.3941C8.31206 12.3375 13.3617 10.8743 13.3617 6.33633V2.33554C13.9149 2.25071 14.8652 2.20123 15.5532 2.7031C16.1844 3.16962 16.5106 4.04612 16.5106 5.31139V9.9837C16.5106 10.3371 16.8014 10.6269 17.156 10.6269H23.4043C24.6738 10.6269 25.7092 11.6448 25.7305 12.903L24.2482 22.3112C24.2482 22.3183 24.2482 22.3254 24.2482 22.3324C24.0567 23.9228 23.0355 24.7287 21.227 24.7287H10.1277C8.84397 24.7287 7.80142 23.6896 7.80142 22.4102V12.4011C7.89362 12.4223 8 12.4223 8.09929 12.3941ZM2.28369 12.0972H6.51064V24.3187H2.28369V12.0972Z"
                                                    fill="white"
                                                    stroke="white"
                                                    strokeWidth="0.5"
                                                />
                                            </svg>{" "}
                                            {t("lblLikeUsOnFacebook")}{" "}
                                            <ReactFbLike
                                                layout="button"
                                                share="false"
                                                version="v2.12"
                                            />
                                        </span>
                                    </a>
                                    {/* modal */}

                                    <button
                                        onClick={() => {
                                            handleClose();
                                            setRecievedOrder(false);
                                            clearIntervalFun();
                                        }}
                                        className="facebok-butn butn butn-blue w-100 mt-4 order-close-btn"
                                        style={{
                                            backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                                            textDecoration: "none",
                                            borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                                            borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                                        }}
                                    >
                                        {t("lblClose")}
                                    </button>
                                </div>
                            )}

                            <button id="open-modal"></button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FacebookModal;