// import { useContext, useState } from "react";
// import FilterItem from "./FilterItem/FilterItem";
// import "./FilterSidebar.css";
// import { useTranslation } from "react-i18next";
// import { Context } from "../../context/kartItemContext";

// const FilterSidebar = () => {
//   const { t } = useTranslation();
//   const { filterCheckeduncheck, activeColor, closeallOpenedModals } = useContext(Context);
//   const [filterArray, setFilterArray] = useState([]);
//   const [clearChecked, setClearChecked] = useState(false);

//   const FILTERCONSTANTS = {
//     GLUTTEN: 1,
//     CRUSTACEANS: 2,
//     EGGS: 3,
//     FISH: 4,
//     PEANUTS: 5,
//     SOYBEANS: 6,
//     MILK: 7,
//     NUTS: 8,
//     CELERY: 9,
//     MUSTARD: 10,
//     SESAMESEEDS: 11,
//     SULPHURDIOXIDEANDSULPHITES: 12,
//     LUPIN: 13,
//     MOLLUSCS: 14,
//     ONION: 15,
//     GARLIC: 16,
//     WHEAT: 17,
//     ALCOHOL: 18
//   };


//   const fillFilterArray = (filterId) => {
//     setFilterArray([...filterArray, filterId])
//     setClearChecked(false);
//   }

//   const emptyFilterArray = () => {
//     console.log("emptyFilterArray")
//     closeallOpenedModals();
//     setFilterArray([])
//     filterCheckeduncheck([]);
//     setClearChecked(true);
//   }

//   return (
//     <div className="filter-sidebar">
//       <div className="filter-wrapper">
//         <div className="filter-head" >
//           <div className="colored-text" style={{ background: `${activeColor}` }}>
//             <h6 className="mb-0">{t("lblAllergies")} </h6>
//             <span className="toggleCloseAllergens" onClick={() => closeallOpenedModals()}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#FFFBFE" />
//               </svg>
//             </span>
//           </div>
//           <div className="text-details">
//             <h6 className="mb-0 pl-18">{t("lblAllergiesText")} </h6>
//           </div>
//         </div>
//         <div className="filter-body">
//           {/* <h6 className="main-menu-heading mb-0 pl-20 pr-20 pt-20">{t("lblExclude")}</h6> */}
//           <div className="filter-list-wrapper d-flex flex-wrap mt-20">
//             {Object.entries(FILTERCONSTANTS).map((constantKey, index) => (
//               <FilterItem key={index} constantKey={constantKey} index={index} clearChecked={clearChecked} fillFilterArray={fillFilterArray} setFilterArray={setFilterArray} />
//             ))}
//           </div>
//         </div>
//         <div className="bottom-clear-buttons">
//           <button className="btn-bottom clearAll-allergens"
//             onClick={() => {
//               // emptyFilterArray(); 
//             }} >{t("lblAllergiesClearAll")}</button>
//           <button className="btn-bottom apply-allergens" style={{ background: `${activeColor}` }} onClick={() => {
//             filterCheckeduncheck(filterArray); closeallOpenedModals();
//           }}>{t("lblAllergiesApply")}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;
