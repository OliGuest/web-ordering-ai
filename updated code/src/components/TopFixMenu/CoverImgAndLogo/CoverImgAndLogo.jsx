import { React, useContext, useEffect } from "react";
import './CoverImgAndLogo.css';
import { Context } from "../../../context/kartItemContext";

const CoverImgAndLogo = ({ visible }) => {

    const {
        isOpenLanguage,
        landingPage

    } = useContext(Context);

    useEffect(() => {
        if (isOpenLanguage) {
            document.querySelector("body").classList.add("service-bar-toggle");
        } else {
            document.querySelector("body").classList.remove("service-bar-toggle");
        }
    }, [isOpenLanguage])

    return (
        <div className={`img-text-wrapper ${visible ? "up" : ""}`} >
            <img className={`top-background  ${visible ? "up" : ""}`} src={landingPage} alt="Landing Page" />
        </div>
    )
}

export default CoverImgAndLogo;