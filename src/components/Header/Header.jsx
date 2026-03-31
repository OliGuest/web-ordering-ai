// import { Fragment } from "react";
// import "./Header.css";
// import { useContext } from "react";
// import { Context } from "../../context/kartItemContext";
// import SubCatList from "./SubCatList";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

// const Header = () => {
//   const {
//     activeColor,
//     index,
//     activeTheme,
//     t,
//     isOpen,
//     toogleSubMenu,
//     toogleLeftMenu,
//     leftMenuIsOpen,
//     closeallOpenedModals,
//     // currentLanguageCode

//   } = useContext(Context);

//   const openRequestModal = () => {
//     toogleLeftMenu();
//     document.getElementById("modalRequestEmpty").style.visibility = "visible";
//   }

//   const readyToOrder = () => {
//     // document.getElementById("modalDoneOrdering").style.visibility = "visible";
//   }
 
//   return (
//     <div className={`collapse navbar-collapse ${leftMenuIsOpen && "menu-show "}`} id="navbarNav" >
//       <div
//         className="main-menu-header"
//         style={{ backgroundColor: `${activeColor}` }}
//       >
//         {/* <h6>
//           <span className="mr-17">{curentTime}</span>
//         </h6> */}
//         <div className="icon-menu">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g id="bxs:category">
//               <path id="Vector" d="M4 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11ZM14 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11ZM4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21ZM17 21C19.206 21 21 19.206 21 17C21 14.794 19.206 13 17 13C14.794 13 13 14.794 13 17C13 19.206 14.794 21 17 21Z" fill="#1C1B1F" />
//             </g>
//           </svg>

//           <p className="menu-text" >{t("IbIMenu")}</p>
//         </div>
//         <svg className="arrow-back-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => toogleLeftMenu()}>
//           <g id="ArrowBackFilled">
//             <path id="Vector" d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="black" fillOpacity="0.54" />
//           </g>
//         </svg>

//       </div>

//       <div className="main-menu-body">

//         <nav>
//         {index !== undefined && index && index.length > 0 ? (
//            <div className={"dropdown"} style={{ backgroundColor: `${activeTheme}` }}>
           
         
//             {index?.map((data, index) => (
//               <Fragment key={index}>
//                 <label htmlFor={`${index}`} id={`${data?.Name}`} className={isOpen === index  ? "dropdown-label is-open" : "dropdown-label"}>
//                   <span className="dropdown-btn"
//                   style={{
//                     color: `${activeTheme === "1" ? "black" : "white"}`,
//                   }}
//                 >
//                   <div className="img-left">
//                     <img src={`${data.PictureUrl}`} alt="" />
//                   </div>
//                   {data?.Name}</span>
//                 </label>
//                 <ul className="slide">
                 
//                   {data.SubCategories.map((SubCategorydata, indexSub) => (

//                     <SubCatList SubCategorydata={SubCategorydata} key={indexSub} data={data} index={index} closeallOpenedModals={closeallOpenedModals} />

//                   ))}
//                 </ul>
//                 <input className="touch" type="checkbox" id={`${index}`} onClick={(e) => { e.stopPropagation(); toogleSubMenu(index);  }} />

//                </Fragment>
//             ))}
//             </div>
//         ) : (
//           <div></div>
//         )}
//         </nav>
//       </div>

//       <div
//         className="main-menu-header main-menu-settings"
//         // style={{ backgroundColor: `${activeColor}` }}
//         style={{ backgroundColor: "white" }}
//       >
//         <div className="icon-menu">
//           <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g id="SettingsFilled">
//               <path id="Vector" d="M20.735 14.0183C20.7783 13.6933 20.8 13.3575 20.8 13C20.8 12.6533 20.7783 12.3066 20.7241 11.9816L22.9233 10.27C23.1183 10.1183 23.1725 9.82581 23.0533 9.60914L20.9733 6.01248C20.8433 5.77414 20.5725 5.69831 20.3341 5.77414L17.745 6.81414C17.2033 6.40248 16.6291 6.05581 15.99 5.79581L15.6 3.04414C15.5566 2.78414 15.34 2.59998 15.08 2.59998H10.92C10.66 2.59998 10.4541 2.78414 10.4108 3.04414L10.0208 5.79581C9.38162 6.05581 8.79662 6.41331 8.26579 6.81414L5.67662 5.77414C5.43829 5.68748 5.16746 5.77414 5.03746 6.01248L2.96829 9.60914C2.83829 9.83664 2.88162 10.1183 3.09829 10.27L5.29746 11.9816C5.24329 12.3066 5.19996 12.6641 5.19996 13C5.19996 13.3358 5.22162 13.6933 5.27579 14.0183L3.07662 15.73C2.88162 15.8816 2.82746 16.1741 2.94662 16.3908L5.02662 19.9875C5.15662 20.2258 5.42746 20.3016 5.66579 20.2258L8.25496 19.1858C8.79662 19.5975 9.37079 19.9441 10.01 20.2041L10.4 22.9558C10.4541 23.2158 10.66 23.4 10.92 23.4H15.08C15.34 23.4 15.5566 23.2158 15.5891 22.9558L15.9791 20.2041C16.6183 19.9441 17.2033 19.5975 17.7341 19.1858L20.3233 20.2258C20.5616 20.3125 20.8325 20.2258 20.9625 19.9875L23.0425 16.3908C23.1725 16.1525 23.1183 15.8816 22.9125 15.73L20.735 14.0183ZM13 16.9C10.855 16.9 9.09996 15.145 9.09996 13C9.09996 10.855 10.855 9.09997 13 9.09997C15.145 9.09997 16.9 10.855 16.9 13C16.9 15.145 15.145 16.9 13 16.9Z" fill="#1C1B1F" />
//             </g>
//           </svg>
//           <p className="menu-text" >{t("IbISettings")}</p>
//         </div>
//       </div>

//       <div className="main-menu-footer">
//         {/* <button
//           className="feedback-wrapper"
//           data-toggle="modal"
//           data-target="#feedback-modal"
//         >
//           <span className="menulink-img mr-12">
//             <img src="assets/img/request-arrow.svg" alt="" />
//           </span>
//           {t("IbIFeedback")}
//         </button> */}
//         <div className="side-menuitem-outer about-side  ">
//           <button className="language-flag side-menulink" data-toggle="modal"
//             data-target="#language-modal" onClick={() => toogleLeftMenu()}>
//             {/* <img src={process.env.PUBLIC_URL + "/assets/icons/" + currentLanguageCode + ".png"} alt="" /> */}
//             {t("IbILanguage")}
//           </button>
//           {/* <div className="language-flag side-menulink">
//             <h4>{t("IbILanguage")}</h4>
//           </div> */}
//           {/* <Link
//           to="/about"
//             className="side-menulink"
//             onClick={() => toogleLeftMenu()}
//           > */}
//             {/* <span className="menulink-img mr-12">
//               <img src="assets/img/question-mark.svg" alt="" />
//             </span> */}
//             {/* {t("IbIAbout")} */}
//           {/* </Link> */}
//           <Link
//             to="/HouseRules"
//             className="side-menulink"
//             onClick={() => toogleLeftMenu()}
//           >
//             {/* <span className="menulink-img mr-12">
//               <img src="assets/img/check.svg" alt="" />
//             </span> */}
//             {t("IbIHouseAndRules")} 
//           </Link>
//           <button
//             className="side-menulink"
//             // data-toggle="modal"
//             // data-target="#tablet-modal"
//             onClick={() => openRequestModal() }
//           >
//             {/* <span className="menulink-img mr-12">
//               <img src="assets/img/request-arrow.svg" alt="" />
//             </span> */}
//             {t("IbIRequestBill")}
//           </button>
//         </div>
//       </div>
//       <div
//         className="main-menu-header main-menu-help-support"
//         // style={{ backgroundColor: `${activeColor}` }}
//         style={{ backgroundColor: "white" }}
//       >
//         <div className="icon-menu" onClick={readyToOrder()}>
//           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g id="InfoOutlined">
//               <path id="Vector" d="M9.16663 5.83335H10.8333V7.50002H9.16663V5.83335ZM9.16663 9.16669H10.8333V14.1667H9.16663V9.16669ZM9.99996 1.66669C5.39996 1.66669 1.66663 5.40002 1.66663 10C1.66663 14.6 5.39996 18.3334 9.99996 18.3334C14.6 18.3334 18.3333 14.6 18.3333 10C18.3333 5.40002 14.6 1.66669 9.99996 1.66669ZM9.99996 16.6667C6.32496 16.6667 3.33329 13.675 3.33329 10C3.33329 6.32502 6.32496 3.33335 9.99996 3.33335C13.675 3.33335 16.6666 6.32502 16.6666 10C16.6666 13.675 13.675 16.6667 9.99996 16.6667Z" fill="#1C1B1F" />
//             </g>
//           </svg>
//           <p className="menu-text" >{t("IbIHelpSupport")}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
