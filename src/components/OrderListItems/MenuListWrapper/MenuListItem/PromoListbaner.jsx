import { React, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { Context } from "../../../../context/kartItemContext";
import { useGetProductQuantityInCart } from "../../../../Hooks/useGetProductQuantityInCart";
import { useAddQuantityRemoveClass } from "../../../../Hooks/useAddQuantityRemoveClass";
import AlergenIcons from "./AlergenIcons";
import { useMinusQuantityKart } from "../../../../Hooks/useMinusQuantityKart";
import ModifiresList from "../../../Modifires/Modifires";
import { useCalculateTotalAccToWizard } from "../../../../Hooks/useCalculateTotalAccToWizard";
import { useOnHandleModifires } from "../../../../Hooks/useOnHandleModifires";
import DescriptionItem from "../../../DescriptionItem/DescriptionItem";
import { useGetSelectedModifierItem } from "../../../../Hooks/useGetSelectedModifierItem";
import DescriptionTitle from "../../../DescriptionItem/DescriptionTitle";

const PromoListbaner = ({ data, index, activeCardBanner }) => {

    const {

        currencyValue,
        active,
        kartItem,
        orderTheme,
        activeColor,
        resetModifiers,
        onModifireState,
        requiredErrorMsg,
        noBannerDescription
        
    } = useContext(Context);


    const [getProductQuantityInCart] = useGetProductQuantityInCart();
    // const [menuWarapper] = useMenuWarapper();
    const [addQuantityAndRemoveClass] = useAddQuantityRemoveClass();
    const [minusQuantityKart] = useMinusQuantityKart();
    const [calculateTotalAccToWizard] = useCalculateTotalAccToWizard();
    /** Check Modifier Selected */
    const [getSelectedModifierItem] = useGetSelectedModifierItem();
    const [onHandleModifires] = useOnHandleModifires();

    const ref = useRef(null);
    // const [heart, setHeart] = useState(false);
    const [details, setDetails] = useState();

    useEffect(()=>{
        if (data?.ProductDetails?.MenuItems.length > 0){
            setDetails(true)
        }else{
            setDetails(false)
        }
    }, [setDetails])


    const removItems = (clickedItem) => {
        let finddata = kartItem.find((item) => item.ProductId === clickedItem.ProductId);
        minusQuantityKart(finddata);
    }

    // const toggleHeart = () => {
    //     setHeart(!heart);
    // }

    return (
        // eslint-disable-next-line
        <div className={`${activeCardBanner == data.ProductId && !noBannerDescription && activeCardBanner !== undefined || data.ProdictId !== undefined ? "accordion promotion-background-image open" : "accordion promotion-background-image "}`}>
            {/* eslint-disable-next-line */}
            <div ref={ref} className={`${activeCardBanner == data.ProductId && !noBannerDescription && activeCardBanner !== undefined || data.ProdictId !== undefined ? "promo-img open" : "promo-img "}`} >
                <div className="item-img img"  >
                    <div className="overlay"></div>
                    <img src={
                        data?.SmallPictureUrl
                    }
                        alt="menu-item-img"
                        loading="lazy"
                    />

                </div>
                <div className="details-bottom" >
                    <div className="item-content ">
                        {/* <a id={`documentClick${data.ProductId}`}
                             href="#javascript"
                             className="item-inner-content add-qauntity d-flex"
                         > */}
                        <div
                            className="item-inner-content add-qauntity d-flex"
                        >
                            <div className="item-left-text media-body count-bottom">
                                <div className="left-text-block" >
                                    <div className="title-price">
                                        <h5 className="mb-0" style={{ color: `${orderTheme?.ProductTextColor}` }}>
                                            {data?.Name}
                                        </h5>
                                        {data?.Price !== 0 ? 
                                            <h6 className="item-price ml-auto mr-0">
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
                                            : 
                                            <h6 className="item-price item-margin ml-auto"></h6>}

                                         </div>

                                        <div className="text-container description-cnt">
                                        {" "}
                                        {data?.ProductDetails
                                            ?.MenuItems.map((product) => {
                                                // product.[0]?.HtmlContent
                                                if (product.LayoutType === 1 && product.HtmlContent !== "" ) {
                                                    return true;
                                                }
                                            }) ? <DescriptionItem description={data
                                                ?.ProductDetails
                                                ?.MenuItems.map((product) => {
                                                    // product.[0]?.HtmlContent
                                                    let text = ""
                                                    if (product.LayoutType === 1) {
                                                        text = product?.HtmlContent;
                                                    }
                                                    return text;
                                                })}  />
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
                                                            data?.ModifierWizards
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
                                                </div>
                                            )}
                                    </div>

                                    <div className="alergens-addBtn">
                                        <AlergenIcons data={data} />
                                        <div className="addimage text-center">
                                            {getProductQuantityInCart(data) === "" ?
                                                active && (
                                                    <div  className="item-count-wrapper d-flex">
                                                        <svg className="big-plus-btn " onClick={(e) => {
                                                            e.stopPropagation();
                                                            addQuantityAndRemoveClass(
                                                                data
                                                            );

                                                        }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                                                            <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill="#E7A536" />
                                                        </svg>
                                                    </div>
                                                )

                                                :

                                                active && (
                                                    <div className="item-count-wrapper d-flex">
                                                        {/* <svg className="blue-buttons"
                                                            onClick={(e) => { e.stopPropagation(); removItems(data) }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                                                            <path d="M11.5 17H25.5V19H11.5V17Z" fill="#E7A536" />
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            contentEditable={false}
                                                            value={getProductQuantityInCart(data) === "" ? "0" : getProductQuantityInCart(data)}
                                                            readOnly
                                                            className="qty quantity-value"
                                                            style={{ color: activeColor, backgroundColor: "transparent" }}
                                                        /> */}
                                                        <svg className="blue-buttons" onClick={(e) => {
                                                            e.stopPropagation();
                                                            addQuantityAndRemoveClass(
                                                                data,
                                                                index
                                                            );

                                                        }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                                                            <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill="#E7A536" />
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
{/* 
            {getProductQuantityInCart(data) ?
                <span className="count-number" style={{backgroundColor: activeColor}}>
                    {getProductQuantityInCart(
                        data
                    )}
                </span>
                : ""
            } */}

            <div className="detail-right promo-right">
                <div className="item-content ">
                    <div className="item-inner-content  d-flex">
                        {/* <div className="item-left-text media-body">
                            <DescriptionTitle description={data?.Name} orderTheme={orderTheme} bold={"600"} />
                       </div> */}

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
                                })} /> : "" }


                    </div>
                    <div className="promo-text">
                        <div>
                            <DescriptionTitle description={data?.Name} orderTheme={orderTheme} bold={"600"} classProp={"classProp"} />
                            <p>Get the best deal this month</p>
                            {data?.Price !== 0 ?
                                <h6 className="item-price ml-auto mr-0" style={{ color: `white` }}>
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
                                :
                                <h6 className="item-price item-margin ml-auto"></h6>}
                        </div>
                    
                        {!details ?
                            <div className="addimage text-center">
                                {getProductQuantityInCart(data) === "" ?
                                    active && (
                                        <div className="item-count-wrapper d-flex">
                                            <svg className="big-plus-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                addQuantityAndRemoveClass(
                                                    data
                                                );

                                            }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                                                <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill="#E7A536" />
                                            </svg>
                                        </div>
                                    )

                                    :

                                    active && (
                                        <div className="item-count-wrapper d-flex">
                                            {data.ModifierWizards.length <= 0 && (<>
                                            <svg className="blue-buttons"
                                                onClick={(e) => { e.stopPropagation(); removItems(data) }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                                                <path d="M11.5 17H25.5V19H11.5V17Z" fill="#E7A536" />
                                            </svg>
                                            <input
                                                type="text"
                                                name="quantity"
                                                contentEditable={false}
                                                value={getProductQuantityInCart(data) === "" ? "0" : getProductQuantityInCart(data)}
                                                readOnly
                                                className="qty quantity-value"
                                                style={{  backgroundColor: "transparent" }}
                                            />
                                            </>)}
                                            <svg className="blue-buttons" onClick={(e) => {
                                                e.stopPropagation();
                                                addQuantityAndRemoveClass(
                                                    data,
                                                    index
                                                );
                                            }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                                                <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill="#E7A536" />
                                            </svg>
                                        </div>
                                    )
                                }
                            </div>
                        : 
                        <button className="">See More</button>
                        }
                        
                    </div>
                </div>

            </div>

        </div>

    )
}
export default PromoListbaner;