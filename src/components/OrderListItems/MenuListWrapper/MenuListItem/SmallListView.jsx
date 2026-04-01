import { React, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { Context } from "../../../../context/kartItemContext";
import { useGetProductQuantityInCart } from "../../../../Hooks/useGetProductQuantityInCart";
import { useMenuWarapper } from "../../../../Hooks/useMenuWarapper";
import { useAddQuantityRemoveClass } from "../../../../Hooks/useAddQuantityRemoveClass";
import AlergenIcons from "./AlergenIcons";
import { useMinusQuantityKart } from "../../../../Hooks/useMinusQuantityKart";
import ModifiresList from "../../../Modifires/Modifires";
import { useCalculateTotalAccToWizard } from "../../../../Hooks/useCalculateTotalAccToWizard";
import { useOnHandleModifires } from "../../../../Hooks/useOnHandleModifires";
import { useGetSelectedModifierItem } from "../../../../Hooks/useGetSelectedModifierItem";
import DescriptionItemAllText from "../../../DescriptionItem/DescriptionItemAllText";
import DescriptionTitle from "../../../DescriptionItem/DescriptionTitle";
import DescriptionItem from "../../../DescriptionItem/DescriptionItem";

const SmallListView = ({ data, index, activeCard, propClass }) => {

    const {

        billTheme,
        currencyValue,
        active,
        kartItem,
        orderTheme,
        activeColor,
        resetModifiers,
        onModifireState,
        requiredErrorMsg,
        noDetailsOpener,
        noDescription,
        setClickedCardId,
        t

    } = useContext(Context);


    const [getProductQuantityInCart] = useGetProductQuantityInCart();
    const [menuWarapper] = useMenuWarapper();
    const [addQuantityAndRemoveClass] = useAddQuantityRemoveClass();
    const [minusQuantityKart] = useMinusQuantityKart();
    const [calculateTotalAccToWizard] = useCalculateTotalAccToWizard();
    /** Check Modifier Selected */
    const [getSelectedModifierItem] = useGetSelectedModifierItem();
    const [onHandleModifires] = useOnHandleModifires();
    const [modifires, setModifires] = useState(data?.ModifierWizards)


    const ref = useRef(null);
    // const [heart, setHeart] = useState(false);

    // const toggleHeart = () => {
    //     setHeart(!heart);
    // }

    const removItems = (clickedItem) => {
        let finddata = kartItem.find((item) => item.ProductId === clickedItem.ProductId);
        minusQuantityKart(finddata);
    }

    return (
        // eslint-disable-next-line
        <div className={`${activeCard == data.ProductId && !noDescription && activeCard !== undefined || data.ProdictId !== undefined ? "accordion open" : "accordion "}`}>
            {/* eslint-disable-next-line */}
            <div ref={ref} className={`${activeCard == data.ProductId && !noDescription && activeCard !== undefined || data.ProdictId !== undefined ? "tab open" : "tab "}`} >
                <div className="item-img img" onClick={() => { noDetailsOpener(data); menuWarapper(data, index) }}>
                    <div className={activeCard == data.ProductId && !noDescription && activeCard !== undefined || data.ProdictId !== undefined ? `overlay open-overlay` : `overlay`}></div>
                    <img src={activeCard == data.ProductId && !noDescription && activeCard !== undefined || data.ProdictId !== undefined
                        ? data?.ProductDetails.ProductPictureUrl
                        : data?.SmallPictureUrl
                    }
                        alt="menu-item-img"
                        loading="lazy"
                    />
                    {/* <div className={`${activeCard == data.ProductId && activeCard !== undefined || data.ProdictId !== undefined ? "heart-img open" : "tab "}`}
                        onClick={(e) => { e.stopPropagation(); toggleHeart() }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill={`${heart ? "#ea0303" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                            <g id="HeartStraight">
                                <path id="Vector" d="M8.35356 13.2426L13.4181 8.17813C14.6625 6.93373 14.8461 4.88651 13.6684 3.57874C13.3735 3.25022 13.0146 2.98524 12.6139 2.79998C12.2131 2.61471 11.7788 2.51304 11.3374 2.50117C10.8961 2.48931 10.4569 2.56749 10.0468 2.73095C9.63665 2.8944 9.26411 3.13971 8.95191 3.45191L8 4.40381L7.17813 3.58194C5.93374 2.33753 3.88651 2.15394 2.57874 3.33157C2.25022 3.62654 1.98524 3.98536 1.79998 4.38613C1.61471 4.78689 1.51304 5.2212 1.50117 5.66256C1.48931 6.10392 1.56749 6.54307 1.73094 6.95321C1.8944 7.36335 2.13971 7.73589 2.45191 8.0481L7.64645 13.2426C7.74022 13.3364 7.86739 13.3891 8 13.3891C8.13261 13.3891 8.25979 13.3364 8.35356 13.2426V13.2426Z" stroke={`${heart ? "#ea0303" : "white"}`} strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </div> */}
                    {data?.IsPromotion && (
                        <span
                            className="promo-tag promo-tag-blue"
                            style={{
                                color: `#da1a35`,
                                backgroundColor: `${billTheme?.TextColor}`,
                            }}
                        >
                            {t("IbIPromo")}
                        </span>
                    )}
                </div>
                <div className="details-bottom" onClick={() => { noDetailsOpener(data); menuWarapper(data, index) }} >
                    <div className="item-content ">
                        {/* <a id={`documentClick${data.ProductId}`}
                             href="#javascript"
                             className="item-inner-content add-qauntity d-flex"
                         > */}
                        <div
                            className="item-inner-content add-qauntity d-flex"
                        >
                            <div
                                onClick={() => menuWarapper(data, index)}
                                className="item-left-text media-body count-bottom"
                            >
                                <div className="left-text-block" >
                                    <div className="title-price">
                                        <h5 className="mb-0" style={{ color: `${orderTheme?.ProductTextColor}` }}>
                                            {data?.Name}
                                        </h5>
                                        {activeCard == data.ProductId && !noDescription && activeCard !== undefined || data.ProdictId !== undefined &&
                                            data?.Price !== 0 ?
                                            <h6 className="item-price m-0">
                                                {currencyValue
                                                    ? currencyValue
                                                    : "€" +
                                                    " " +
                                                    parseFloat(
                                                        data?.Price
                                                    )}
                                                {parseFloat(
                                                    data?.Price
                                                )}
                                            </h6>
                                            // eslint-disable-next-line 
                                            : <h6 className="item-price item-margin ml-auto"></h6>}

                                    </div>

                                    <div className="text-container description-cnt">
                                        {" "}

                                        {data?.ProductDetails
                                            ?.MenuItems.map((product) => {
                                                // product.[0]?.HtmlContent
                                                if (product.LayoutType === 1 && product.HtmlContent !== "") {
                                                    return true;
                                                }
                                            }) ? <DescriptionItemAllText description={data
                                                ?.ProductDetails
                                                ?.MenuItems.map((product) => {
                                                    // product.[0]?.HtmlContent
                                                    let text = ""
                                                    if (product.LayoutType === 1) {
                                                        text = product?.HtmlContent;
                                                        // return product?.HtmlContent;
                                                    }
                                                    return text;
                                                })} />
                                            : ""}


                                    </div>
                                    <div className={data?.ModifierWizards.length > 1 ? "scrollerdiv" : "scrollerrdiv"}>
                                        {/* promo content */}
                                        {data?.ModifierWizards.length >
                                            0 && (
                                                <div className="promo-body-wrapper">

                                                    <ModifiresList
                                                        resetModifiers={
                                                            resetModifiers
                                                        }
                                                        DescriptionData={
                                                            data
                                                        }
                                                        modifires={
                                                            modifires
                                                        }
                                                        onModifireState={
                                                            onModifireState
                                                        }
                                                        activeColor={activeColor}
                                                        onCalculateTotalAccToWizard={
                                                            calculateTotalAccToWizard
                                                        }
                                                        requiredErrorMsg={
                                                            requiredErrorMsg
                                                        }
                                                        getSelectedModifierItem={getSelectedModifierItem.bind(
                                                            this
                                                        )}
                                                        onHandleModifires={
                                                            onHandleModifires
                                                        }
                                                    />
                                                    {/* <div className="photo">
                                                        <div className="glow-wrap">
                                                            <i className="glow"></i>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            )}

                                    </div>

                                    <div className="alergens-addBtn">
                                        <AlergenIcons data={data} />
                                        <div className="addimage text-center">
                                            {getProductQuantityInCart(data) === "" ?
                                                active && (
                                                    <div className="item-count-wrapper d-flex">
                                                        <svg className="big-plus-btn "
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addQuantityAndRemoveClass(
                                                                    data
                                                                );

                                                            }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" width="36" height="36" rx="8" fill={activeColor ? `${activeColor}20` : "#FAEEE920"} />
                                                            <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill={activeColor || "#E7A536"} />
                                                        </svg>
                                                    </div>
                                                )

                                                :

                                                active && (
                                                    <div className="item-count-wrapper d-flex">
                                                        {/* <svg className="blue-buttons"
                                                            onClick={(e) => { e.stopPropagation(); removItems(data) }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" width="36" height="36" rx="8" fill={activeColor ? `${activeColor}20` : "#FAEEE920"} />
                                                            <path d="M11.5 17H25.5V19H11.5V17Z" fill={activeColor || "#E7A536"} />
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            contentEditable={false}
                                                            value={getProductQuantityInCart(data) === "" ? "0" : getProductQuantityInCart(data)}
                                                            readOnly
                                                            className="qty quantity-value"
                                                            style={{ color: "black" }}
                                                        /> */}
                                                        <svg className="blue-buttons"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addQuantityAndRemoveClass(
                                                                    data,
                                                                    index
                                                                );

                                                            }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" width="36" height="36" rx="8" fill={activeColor ? `${activeColor}20` : "#FAEEE920"} />
                                                            <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill={activeColor || "#E7A536"} />
                                                        </svg>

                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        {/* </a> */}
                    </div>
                </div>

            </div>

            {/* {getProductQuantityInCart(data) ?
                <span className="count-number" style={{ backgroundColor: activeColor }}>
                    {getProductQuantityInCart(
                        data
                    )}
                </span>
                : ""
            } */}

            <div className="detail-right" onClick={() => { noDetailsOpener(data); menuWarapper(data, index) }}>
                <div className="item-content ">
                    <div className="item-inner-content  d-flex">
                        <div className="item-left-text media-body">
                            <DescriptionTitle description={data?.Name} orderTheme={orderTheme} bold={"600"} />
                        </div>
                    </div>

                    {/* DEscription text */}
                    <div className="text-container description-cnt">
                        {" "}

                        {data?.ProductDetails
                            ?.MenuItems.map((product) => {
                                // product.[0]?.HtmlContent
                                if (product.LayoutType === 1 && product.HtmlContent !== "") {
                                    return true;
                                }
                            }) ? <DescriptionItem description={data
                                ?.ProductDetails
                                ?.MenuItems.map((product) => {
                                    // product.[0]?.HtmlContent
                                    let text = ""
                                    if (product.LayoutType === 1) {
                                        text = product?.HtmlContent;
                                        // return product?.HtmlContent;
                                    }
                                    return text;
                                })} /> : 'No description'}


                    </div>
                </div>
                <div className="right">
                    {data?.Price !== 0 ?
                        <h6 className="item-price m-0">
                            {currencyValue
                                ? currencyValue
                                : "€" +
                                " " +
                                parseFloat(
                                    data?.Price
                                )}
                            {parseFloat(
                                data?.Price
                            )}
                        </h6>
                        // eslint-disable-next-line 
                        : <h6 className="item-price item-margin ml-auto"></h6>}
                    <div className="addimage text-center">
                        {getProductQuantityInCart(data) === "" ?
                            active && (
                                <div className="item-count-wrapper d-flex">
                                    <svg className={`big-plus-btn`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            data?.ModifierWizards
                                                .length > 0
                                                ? menuWarapper(
                                                    data,
                                                    index
                                                )
                                                :
                                                addQuantityAndRemoveClass(
                                                    data,
                                                    index
                                                );
                                            setClickedCardId(propClass)
                                        }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" width="36" height="36" rx="8" fill={activeColor ? `${activeColor}20` : "#FAEEE920"} />
                                        <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill={activeColor || "#E7A536"} />
                                    </svg>

                                </div>
                            )
                            :
                            active && (
                                <div className="item-count-wrapper d-flex">
                                    {data.ModifierWizards.length <= 0 && (<>
                                        <svg className="blue-buttons"
                                            onClick={(e) => { e.stopPropagation(); removItems(data) }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" width="36" height="36" rx="8" fill={activeColor ? `${activeColor}20` : "#FAEEE920"} />
                                            <path d="M11.5 17H25.5V19H11.5V17Z" fill={activeColor || "#E7A536"} />
                                        </svg>
                                        <input
                                            type="text"
                                            name="quantity"
                                            contentEditable={false}
                                            value={getProductQuantityInCart(data) === "" ? "0" : getProductQuantityInCart(data)}
                                            readOnly
                                            className="qty quantity-value"
                                            style={{ color: "black" }}
                                        /></>
                                    )}
                                    <svg className="blue-buttons"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            data?.ModifierWizards
                                                .length > 0
                                                ? menuWarapper(
                                                    data,
                                                    index
                                                )
                                                : addQuantityAndRemoveClass(
                                                    data,
                                                    index
                                                );

                                        }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" width="36" height="36" rx="8" fill={activeColor ? `${activeColor}20` : "#FAEEE920"} />
                                        <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill={activeColor || "#E7A536"} />
                                    </svg>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>

    )
}
export default SmallListView;