import { React, Fragment } from "react";
import "./MenuListItem.css";
import { useCheckAvailablityTimesOfProducts } from "../../../../Hooks/useCheckAvailablityTimesOfProducts";
import ProductCard from "../../../ProductCard/ProductCard";

const MenuListItem = ({ data, index, onChange, activeCard }) => {

    const [checkAvailablityTimesOfProducts] = useCheckAvailablityTimesOfProducts();

    return (
        <Fragment>
            {!data.IsPromotion &&
                checkAvailablityTimesOfProducts({
                    AvailableFromTime:
                        data.AvailableFromTime,
                    AvailableToTime:
                        data.AvailableToTime,
                }) && (
                    <ProductCard
                        data={data}
                        index={index}
                        propClass={`card-index-${data.ProductId}`}
                    />
                )}
        </Fragment>
    )
}

export default MenuListItem;