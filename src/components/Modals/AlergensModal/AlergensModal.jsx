import React, { useState } from "react";
import "./AlergensModal.css";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import FilterItem from "../../FilterSidebar/FilterItem/FilterItem";

const closeAlergensModal = () => {
    const modal = document.getElementById('alergens-modal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = '';
        document.body.classList.remove('modal-open');
    }
};

const AlergensModal = ({ handleClose }) => {
    const { t, filterCheckeduncheck,
        // closeallOpenedModals
    } = useContext(Context);

    const [filterArray, setFilterArray] = useState([]);
    const [clearChecked, setClearChecked] = useState(false);

    const FILTERCONSTANTS = {
        GLUTTEN: 1,
        CRUSTACEANS: 2,
        EGGS: 3,
        FISH: 4,
        PEANUTS: 5,
        SOYBEANS: 6,
        MILK: 7,
        NUTS: 8,
        CELERY: 9,
        MUSTARD: 10,
        SESAMESEEDS: 11,
        SULPHURDIOXIDEANDSULPHITES: 12,
        LUPIN: 13,
        MOLLUSCS: 14,
        ONION: 15,
        GARLIC: 16,
        WHEAT: 17,
        ALCOHOL: 18
    };


    const fillFilterArray = (filterId) => {
        setFilterArray([...filterArray, filterId])
        setClearChecked(false);
    }

    const emptyFilterArray = () => {
        setFilterArray([])
        filterCheckeduncheck([]);
        setClearChecked(true);
    }

    return (
        <div
            id="alergens-modal"
            className="modal full-popup products-modal cart-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="ItemsLabel"
            aria-hidden="true"
        >
            <div className="container">
                <div className="modal-dialog modal-dialog-zoom" role="document" style={{ alignItems: "flex-end" }}>
                    <div id="modal-content" className="modal-content">
                        <div
                            className="modal-header"
                            style={{
                                backgroundColor: "white",
                                borderBottom: "1px solid #B0B0B0"
                            }}>
                            <button type="button"
                                className="close-button"
                                onClick={closeAlergensModal}
                                aria-label="Close">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icons/close_24px">
                                        <path id="icon" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#1D1A22" />
                                    </g>
                                </svg>

                            </button>
                            <h4>
                                {t("lblAllergies")}
                            </h4>
                        </div>
                        <div className="modal-body" style={{ backgroundColor: "white" }}>
                            <div className="text-details">
                                <h6 className="mb-0">{t("lblAllergiesText")} </h6>
                            </div>
                        <div className="filter-body">
                            {/* <h6 className="main-menu-heading mb-0 pl-20 pr-20 pt-20">{t("lblExclude")}</h6> */}
                            <div className="filter-list-wrapper d-flex flex-wrap mt-20">
                                {Object.entries(FILTERCONSTANTS).map((constantKey, index) => (
                                    <FilterItem key={index} constantKey={constantKey} index={index} clearChecked={clearChecked} fillFilterArray={fillFilterArray} setFilterArray={setFilterArray} />
                                ))}
                            </div>
                        </div>
                        </div>
                        <div className="modal-footer" style={{ backgroundColor: "white" }}>
                            <div className="bottom-clear-buttons">
                                <p className="btn-bottom clearAll-allergens"
                                    onClick={() => {
                                        emptyFilterArray();
                                        closeAlergensModal();
                                    }} >{t("lblAllergiesClearAll")}</p>

                                <button className="btn-bottom apply-allergens"
                                    aria-label="Close" onClick={() => {
                                    filterCheckeduncheck(filterArray);
                                    closeAlergensModal();
                                }}>{t("lblAllergiesApply")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlergensModal;
