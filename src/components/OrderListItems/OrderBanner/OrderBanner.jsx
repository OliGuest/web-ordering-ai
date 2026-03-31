import { React, Fragment } from "react";
import { Slide } from "react-slideshow-image";
import './OrderBanner.css';
import { Context } from "../../../context/kartItemContext";
import { useContext } from "react";
import { useGetBannerItems } from "../../../Hooks/useGetBannerItems";
import { useMinusQuantity } from "../../../Hooks/useMinusQuantity";
import { useAddQuantity } from "../../../Hooks/useAddQuantity";
import { useAddQuantityRemoveClass } from "../../../Hooks/useAddQuantityRemoveClass";

const OrderBanner = () => {

    const [getBannerItemsAccToCategories] = useGetBannerItems();
    const [minusQuantity] = useMinusQuantity();
    const [addQuantity] = useAddQuantity();
    const [addQuantityAndRemoveClass] = useAddQuantityRemoveClass();

    const {

        quantityToKart,
        activeColor,
        t

    } = useContext(Context);
    return (
        <>
            {
                getBannerItemsAccToCategories().length > 0 ? (
                    getBannerItemsAccToCategories().length === 1 ? (
                        <div className="order-banner ">
                            {getBannerItemsAccToCategories()?.map(
                                (banner, index) => (
                                    <div
                                        className="order-banner qty-open  menu-list-modal"
                                        key={index} >
                                        <img
                                            src={banner?.SmallPictureUrl}
                                            alt="food-banner"
                                        />
                                        {banner?.NoInteraction === true ? (
                                            <></>
                                        ) : (
                                            <Fragment key={index}>
                                                <div className="item-cart-wrapper">
                                                    <div className="item-cart-content d-flex flex-wrap align-items-center">
                                                        <h6 className="mr-auto mb-0">
                                                            {banner?.ProductDetails.ProductName}
                                                        </h6>
                                                        <p className="mb-0">
                                                            {"€" + parseFloat(banner?.Price)}
                                                        </p>
                                                    </div>
                                                    {banner?.NoInteraction && (
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <div className="item-count-wrapper d-flex mr-auto">
                                                                <button
                                                                    type="button"
                                                                    className="minus qty-btn"
                                                                    onClick={() =>
                                                                        minusQuantity(banner)
                                                                    }
                                                                ></button>
                                                                <input
                                                                    type="text"
                                                                    name="quantity"
                                                                    defaultValue={quantityToKart}
                                                                    className="qty"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="plus qty-btn"
                                                                    onClick={() => addQuantity(banner)}
                                                                ></button>
                                                            </div>
                                                            <button
                                                                className="butn-sm butn-orange add-cart-btn remove-qty"
                                                                onClick={() => {
                                                                    addQuantityAndRemoveClass(banner);
                                                                }}
                                                                style={{
                                                                    backgroundColor: `${activeColor}`,
                                                                }}
                                                            >
                                                                {t("IbIAddOrderBanner")} 
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </Fragment>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="order-banner ">
                            <Slide>
                                {getBannerItemsAccToCategories().map(
                                    (banner, index) => (
                                        <div
                                            className="order-banner qty-open  menu-list-modal"
                                            key={index}
                                        >
                                            <img
                                                src={banner?.SmallPictureUrl}
                                                alt="food-banner"
                                            />
                                            <div className="item-cart-wrapper">
                                                <div className="item-cart-content d-flex flex-wrap align-items-center">
                                                    <h6 className="mr-auto mb-0">
                                                        {banner?.ProductDetails.ProductName}
                                                    </h6>
                                                    <p className="mb-0">
                                                        {"€" + parseFloat(banner?.Price)}
                                                    </p>
                                                </div>
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <div className="item-count-wrapper d-flex mr-auto">
                                                        <button
                                                            type="button"
                                                            className="minus qty-btn"
                                                            onClick={() => minusQuantity(banner)}
                                                        ></button>
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            defaultValue={quantityToKart}
                                                            className="qty"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="plus qty-btn"
                                                            onClick={() => addQuantity(banner)}
                                                        ></button>
                                                    </div>
                                                    <button
                                                        className="butn-sm butn-orange add-cart-btn remove-qty"
                                                        onClick={() => {
                                                            addQuantityAndRemoveClass(banner);
                                                        }}
                                                        style={{
                                                            backgroundColor: `${activeColor}`,
                                                        }}
                                                    >
                                                       {t("IbIAddOrderBanner")} 
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Slide>
                        </div>
                    )
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default OrderBanner;