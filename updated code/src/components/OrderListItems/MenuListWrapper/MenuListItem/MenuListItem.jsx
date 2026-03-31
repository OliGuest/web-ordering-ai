import { React, Fragment } from "react";
import "./MenuListItem.css";
import { useCheckAvailablityTimesOfProducts } from "../../../../Hooks/useCheckAvailablityTimesOfProducts";
import SmallListView from "./SmallListView";

const MenuListItem = ({ data, index, onChange, activeCard }) => {

  
    const [checkAvailablityTimesOfProducts] = useCheckAvailablityTimesOfProducts();

    // useEffect(() => {

    //     console.log(data?.Name, data?.ProductDetails?.MenuItems, "product.HtmlContent")
    //     if (data?.ProductDetails?.MenuItems === undefined && data?.ProductDetails?.MenuItems === "") {
    //         descriptionSet(true);
    //         return;
    //     }
    //     console.log(data?.Name, data?.ProductDetails?.MenuItems, "data?.Name, data?.ProductDetails?.MenuItems ,")
    //     // eslint-disable-next-line
    //     data?.ProductDetails?.MenuItems.map((product) => {

    //         if (product.LayoutType === 1 && product.HtmlContent !== "") {
    //             console.log(product, "product2")
    //             return true;
    //         }
    //     }) ? descriptionSet(false) : descriptionSet(true);
    //     // eslint-disable-next-line
    // }, [data])

    return (

        <Fragment>
            {!data.IsPromotion &&
                checkAvailablityTimesOfProducts({
                    AvailableFromTime:
                        data.AvailableFromTime,
                    AvailableToTime:
                        data.AvailableToTime,
                }) && (

                    <div
                        key={index}
                    className={`menu-list-item d-flex menu-list-modal card-index-${data.ProductId}`}
                    >
                        <ul className="small-list-view item-list pl-0"  >  
                        <SmallListView data={data} index={index} onChange={onChange} activeCard={activeCard} propClass={`card-index-${data.ProductId}`} />
                        </ul>

                    </div>
                )}
        </Fragment>

    )
}

export default MenuListItem;