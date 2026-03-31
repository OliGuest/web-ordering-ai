import { React } from "react";
// import Endofthelist from "../../assets/img/Endofthelist.png";
import "./OrderListItems.css";
// import OrderBanner from "./OrderBanner/OrderBanner";
import MenuListWrapper from "./MenuListWrapper/MenuListWrapper";
import { Context } from "../../context/kartItemContext";
import { useContext } from "react";



const OrderListItems = () => {

    const {

        inititalIndex,
        searchSubCatIndex,

    } = useContext(Context);

    return (
        <div className="order-list-body">
            {/* tabs */}
            <div className="tab-content">
                <div
                    className="fade tab-pane active show"
                    id={1 + "food"}
                    role="tabpanel">

                    {/* <OrderBanner /> */}

                    <div className="menu-item-wrapper">
                        <MenuListWrapper />
                    </div>
                </div>
            </div>
            {/* tabs */}

            {searchSubCatIndex !== undefined &&
                searchSubCatIndex[inititalIndex]?.SubCategories.length > 0 && (
                    <div className="last-img">
                        {/* <img src={Endofthelist} alt="" /> */}
                    </div>
                )}
        </div>
    )
}

export default OrderListItems;