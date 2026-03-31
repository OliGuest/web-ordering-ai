// import { Fragment } from "react";
// import { useClickSubmenuFromDrawer } from "../../Hooks/useClickSubmenuFromDrawer";

// const SubCatList = ({ indexSub, SubCategorydata, data, index, closeallOpenedModals }) => {

//     const [ClickSubmenuFromDrawer] = useClickSubmenuFromDrawer();

//     return (
//         <li className="main-menu-item" onClick={() => closeallOpenedModals()} >
//             {SubCategorydata.Products.length > 0 ? (
//                 <Fragment key={SubCategorydata.Products.length}>
//                     <button className="main-menu-link d-flex align-items-center">
//                         <h6
//                             onClick={() =>
//                                 ClickSubmenuFromDrawer(
//                                     indexSub,
//                                     SubCategorydata?.Products,
//                                     data,
//                                     index,
//                                     SubCategorydata
//                                 )
//                             }
//                             className="mb-0"
//                         >
//                             {SubCategorydata?.Products?.length > 0
//                                 ? SubCategorydata?.Name
//                                 : ""}
//                         </h6>
//                     </button>
//                 </Fragment>
//             ) : (
//                 <></>
//             )}
//         </li>
//     )
// }
// export default SubCatList;