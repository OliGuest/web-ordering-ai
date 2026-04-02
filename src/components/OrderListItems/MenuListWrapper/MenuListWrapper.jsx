import { React, Fragment } from "react";
import "./MenuListWrapper.css";
import MenuListItem from "./MenuListItem/MenuListItem";
import { Context } from "../../../context/kartItemContext";
import { useContext } from "react";
import Promotions from "./MenuListItem/Promotions";

const MenuListWrapper = () => {

    const {
        inititalIndex,
        searchSubCatIndex,
        activeCard,
        activeCardBanner,
        activeButton,
        t
    } = useContext(Context);

    return (
        <div>
            {searchSubCatIndex !== undefined &&
                searchSubCatIndex[inititalIndex]?.SubCategories?.map(
                    (mapSubCatData, catIndex) => (
                        <Fragment key={catIndex}>
                            {
                                <div className="wrapper" key={catIndex} >
                                    {mapSubCatData.Products.length > 0 && (
                                        <div className="subcategory-header section" id={"menu-list-wrapper-" + mapSubCatData.SubCategoryId}>
                                            <h2 className="subcategory-title">
                                                {mapSubCatData.Name}
                                            </h2>
                                            <span className="subcategory-count" id={mapSubCatData.SubCategoryId}>
                                                {mapSubCatData.Products.length}
                                                {mapSubCatData.Products.length > 1
                                                    ? ` ${t("IbIItems")}`
                                                    : ` ${t("IbIItem")}`
                                                }
                                            </span>
                                        </div>
                                    )}

                                    {mapSubCatData !== undefined &&
                                        mapSubCatData.Products.map(
                                            (data, index) => (
                                                <Promotions
                                                    key={index}
                                                    data={data}
                                                    onChange={activeButton}
                                                    activeCardBanner={activeCardBanner}
                                                />

                                                   )
                                        )}{" "}
                                    
                                    <div className="menu-list-wrapper " >
                                        {mapSubCatData !== undefined &&
                                            mapSubCatData.Products.map(
                                                (data, index) => (
                                                    <MenuListItem
                                                        key={index}
                                                        data={data}
                                                        index={index}
                                                        onChange={activeButton}
                                                        activeCard={activeCard}
                                                    />
                                                )
                                            )}{" "}
                                    </div>
                                </div>
                            }
                        </Fragment>
                    )
                )}
            {/* END All Main Categories : Data with Sub Category - products */}
        </div>
    )
}

export default MenuListWrapper;