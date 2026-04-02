import React from "react";
import "./CardList.css";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/kartItemContext";
import { useMinusQuantityKart } from "../../../Hooks/useMinusQuantityKart";
import { useAddQuantityKArt } from "../../../Hooks/useAddQuantityKArt";
import DescriptionTitle from "../../DescriptionItem/DescriptionTitle";



const CardList = () => {

  const { kartItem, orderTheme, deleteProductBasket, activeColor } = useContext(Context);
  const [showData, setshowData] = useState(kartItem);
  const [addQuantityKArt] = useAddQuantityKArt();
  const [minusQuantityKart] = useMinusQuantityKart();

  useEffect(() => {
    setshowData(kartItem)
  }, [kartItem])

  const removItems = (clickedItem) => {
    let finddata = kartItem.find(item => {
      if (clickedItem.selectedModifiersData.length > 0) {
        return clickedItem.selectedModifiersData.some(modifier => item.selectedModifiersData.includes(modifier))
      } else {
        return item.ProductId === clickedItem.ProductId;
      }
    }
    )
    deleteProductBasket(new Array(finddata));
  }
  const minusRemoveItems = (clickedItem) => {
    let finddata = kartItem.find(item => {
      if (clickedItem.selectedModifiersData.length > 0) {
        return clickedItem.selectedModifiersData.some(modifier => item.selectedModifiersData.includes(modifier))
      } else {
        return item.ProductId === clickedItem.ProductId;
      }
    }
    )
    // If qty is 1, delete the item instead of decrementing
    if (finddata && finddata.quantity === 1) {
      deleteProductBasket(new Array(finddata));
    } else {
      minusQuantityKart(finddata);
    }
  }

  return (
    <div className="card-list">
      {showData?.map((data, index) => (
        <div className="all-items menu-list" key={index}>
          <div className="cart-card">
            <div className="cart-card__img">
              <img src={data?.SmallPictureUrl} alt="menu-item-img" loading="lazy" />
            </div>
            <div className="cart-card__body">
              {/* Row 1: Title + Quantity stepper */}
              <div className="cart-card__top-row">
                <div className="cart-card__title" style={{ color: orderTheme?.ProductTextColor }}>
                  <DescriptionTitle description={data?.Name} orderTheme={orderTheme} bold={"400"} />
                </div>
                <div className="cart-card__stepper">
                  <button className="cart-qty-btn"
                    onClick={(e) => { e.stopPropagation(); minusRemoveItems(data) }}
                    style={{ background: data?.quantity === 1 ? 'rgba(229,72,77,0.08)' : `${activeColor}15` }}>
                    {data?.quantity === 1 ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                          stroke="#e5484d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10h12" stroke={activeColor || "#E7A536"} strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </button>
                  <span className="cart-card__qty">{data?.quantity}</span>
                  <button className="cart-qty-btn"
                    onClick={(e) => { e.stopPropagation(); addQuantityKArt(data, index); }}
                    style={{ background: `${activeColor}15` }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M10 4v12M4 10h12" stroke={activeColor || "#E7A536"} strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modifiers */}
              {data?.selectedModifiersData && data.selectedModifiersData.length > 0 && (
                <div className="cart-card__modifiers">
                  {data.selectedModifiersData.map((mod, i) => (
                    <span key={i} className="cart-card__mod">{mod.mName}</span>
                  ))}
                </div>
              )}

              {/* Price */}
              {Number(
                data.quantity * parseFloat(data?.basePrice) +
                (data.quantity * data?.modifierPrice.length
                  ? data?.modifierPrice?.reduce((s, a) => parseFloat(s) + parseFloat(a), 0)
                  : 0)
              ) ? (
                <p className="cart-card__price" style={{ color: orderTheme?.ProductTextColor }}>
                  {data?.PriceValue != null
                    ? data?.PriceValue
                    : data?.basePrice
                      ? "€ " + Number(
                          data.quantity * parseFloat(data?.basePrice) +
                          (data.quantity * data?.modifierPrice.length
                            ? data?.modifierPrice?.reduce((s, a) => parseFloat(s) + parseFloat(a), 0)
                            : 0)
                        ).toFixed(2)
                      : "€ " + Number(data.quantity * data.Price)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )
      )}

    </div>
  );
}

export default CardList;
