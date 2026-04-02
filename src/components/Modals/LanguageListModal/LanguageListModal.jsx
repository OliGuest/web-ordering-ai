import React, { useState } from "react";
import "./LanguageListModal.css";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import { useSelectLanguage } from "../../../Hooks/useSelectLanguage";

const closeLanguageModal = () => {
    const modal = document.getElementById('language-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = '';
        document.body.classList.remove('modal-open');
    }
};

const LanguageListModal = ({ isLanguageModalOpen     }) => {
    const { allLanguageList, t, kartHistoryStore } = useContext(Context);
    const [selectLanguage] = useSelectLanguage();
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(1); // State to track the selected language index
    const [selectedLanguages, setSelectedLanguages] = useState(
        allLanguageList.length > 0 ? allLanguageList.map(() => false) : []
    ); // State to track whether each language is selected

    const handleLanguageSelect = (index) => {
        const newSelectedLanguages = Array(allLanguageList.length).fill(false); // Reset all to false
        newSelectedLanguages[index] = true; // Set only the clicked index to true
        setSelectedLanguages(newSelectedLanguages);
        setSelectedLanguageIndex(index);
    };

    const saveCheckedOption = () => {
        const langData = allLanguageList[selectedLanguageIndex];
        if (!langData) { return; }
        selectLanguage(selectedLanguageIndex, langData?.Locale, langData?.Name, langData);
        // setIsLanguageModalOpen(false); // Close the modal
    }

    return (
        <div
            id="language-modal"
            className="modal full-popup products-modal cart-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="ItemsLabel"
            aria-hidden="true"
        >
            <div className="container">
                <div className={`modal-dialog modal-dialog-zoom`} role="document" style={{ alignItems: "flex-end" }}>
                    <div id="modal-content" className="modal-content">
                        <div
                            className="modal-header"
                            style={{
                                backgroundColor: "white",
                                paddingBottom: "0",
                                borderBottom: "0"
                            }}
                        >
                            <h4>
                                {kartHistoryStore && kartHistoryStore?.length > 1
                                    ? ` ${t("lblChangeLanguage")}`
                                    : ` ${t("lblChangeLanguage")}`}
                            </h4>
                        </div>
                        <div className="modal-body" style={{ backgroundColor: "white" }}>
                            <p>{t("IbIpreferredlanguage")}</p>
                            <div className="dropdown">
                                <button className="dropbtn">{allLanguageList[selectedLanguageIndex] === undefined ? allLanguageList[0]?.Name : allLanguageList[selectedLanguageIndex]?.Name}</button>
                                <div className="dropdown-content">
                                    {allLanguageList && allLanguageList?.length > 0 && (
                                        allLanguageList?.map((langData, index) => (
                                            <button
                                                key={index}
                                                className={selectedLanguages[index] ? "selected" : ""}
                                                onClick={() => handleLanguageSelect(index)}
                                            >
                                                {selectedLanguages[index] && (
                                                    <svg
                                                        className="checked-icon"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                )}
                                                {langData?.Name}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white" }}>
                            <button
                                type="button"
                                onClick={closeLanguageModal}
                                aria-label="Close"
                            >{t("IbICancel")}</button>
                            <button
                                type="button"
                                aria-label="Close"
                                 onClick={() => { saveCheckedOption(); closeLanguageModal(); }}>{t("IbISave")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageListModal;
