import { React, Fragment, useEffect } from "react";
import "./Promotions.css";
import { useCheckAvailablityTimesOfProducts } from "../../../../Hooks/useCheckAvailablityTimesOfProducts";
import PromoListbaner from "./PromoListbaner";
import { useContext } from "react";
import { Context } from "../../../../context/kartItemContext";

const Promotions = ({ data, index, activeCardBanner }) => {

    const [checkAvailablityTimesOfProducts] = useCheckAvailablityTimesOfProducts();

    const { activeButtonBanner, noDetailsBannerOpener } = useContext(Context);

    // useEffect(()=>{
    //     noDetailsBannerOpener(data);
    // }, [])

    return (

        <Fragment >
            {data.IsPromotion &&
                checkAvailablityTimesOfProducts({
                    AvailableFromTime:
                        data.AvailableFromTime,
                    AvailableToTime:
                        data.AvailableToTime,
                }) && (

                    <div
                        key={index}
                        className="promotion-background-image"
                        // style={{ backgroundImage: `url(${data.SmallPictureUrl})`, }}
                    onClick={() => {!noDetailsBannerOpener && activeButtonBanner(data.ProductId)}}
                    >
                        {/* <div className="overlay-promo"></div> */}
                    
                        {!data.NoInteraction ?
                        <div
                            key={index}
                            className={`menu-list-item d-flex menu-list-modal menu-product-item`}
                        >
                            <div className="small-list-view" >
                                <PromoListbaner data={data} index={index} activeCardBanner={activeCardBanner} />
                            </div>
                        </div>

                        :
                        <div
                            key={index}
                            className="promotion-background-image"
                            style={{ backgroundImage: `url(${data.SmallPictureUrl})` }}
                        ></div>

                        }
                    </div>
                )}
        </Fragment>

    )
}

export default Promotions;