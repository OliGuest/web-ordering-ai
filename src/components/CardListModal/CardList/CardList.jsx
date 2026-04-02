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
          <div className="menu-list-item d-flex align-items-start">
            <div className="item-img">

              <img src={data?.SmallPictureUrl} alt="menu-item-img" loading="lazy" />
            </div>
            <div className="item-content ">
              <div className="item-inner-content add-qauntity d-flex">
                <div className="item-left-text ">
                  <div
                    className="mb-15 ml-0"
                    style={{
                      color: `${orderTheme?.ProductTextColor}`,
                    }}
                  >
                    {/* {data?.Name} */}
                    <DescriptionTitle description={data?.Name} orderTheme={orderTheme} bold={"400"} />

                    {data?.selectedModifiersData &&
                      data?.selectedModifiersData?.map((data, index) => {
                        return (
                          <p
                            key={index}
                            style={{
                              fontSize: "10px",
                              margin: "0",
                              padding: "2px",
                            }}
                          >
                            {data.mName}
                          </p>

                        );
                      })}
                  </div>
                  {Number(
                    data.quantity * parseFloat(data?.basePrice) +
                    (data.quantity * data?.modifierPrice.length
                      ? data?.modifierPrice?.reduce(
                        (partialSum, a) => {
                          return (
                            parseFloat(partialSum) + parseFloat(a)
                          );
                        },
                        0
                      )
                      : 0)
                  ) ? <p
                    className="item-price mr-auto ml-0"
                    style={{
                      color: `${orderTheme?.ProductTextColor}`,
                      // background: `var(--gradient, linear-gradient(180deg, #A0DAFB - 22.93 %, ${orderTheme?.ProductTextColor} 131.41 %))`,
                      backgroundClip: "text"
                    }}
                  >
                    {data?.PriceValue != null
                      ? data?.PriceValue
                      : data?.basePrice
                        ? "€ " +
                        Number(
                          data.quantity * parseFloat(data?.basePrice) +
                          (data.quantity * data?.modifierPrice.length
                            ? data?.modifierPrice?.reduce(
                              (partialSum, a) => {
                                return (
                                  parseFloat(partialSum) + parseFloat(a)
                                );
                              },
                              0
                            )
                            : 0)
                        ).toFixed(2)
                        : "€ " + Number(data.quantity * data.Price)}
                  </p> :
                    // eslint-disable-next-line
                    <p
                      className="item-price ml-auto"
                      style={{
                        color: `${orderTheme?.ProductTextColor}`,
                        height: `22px`, width: `62px`,
                      }}
                    ></p>}

                </div>
                <div className="addimage">
                  <div className="item-count-wrapper d-flex mr-auto">
                    <button className="cart-qty-btn"
                      onClick={(e) => { e.stopPropagation(); minusRemoveItems(data) }}
                      style={{ background: data?.quantity === 1 ? 'rgba(229,72,77,0.08)' : `${activeColor}15` }}>
                      {data?.quantity === 1 ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                            stroke="#e5484d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10h12" stroke={activeColor || "#E7A536"} strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>

                    <input
                      type="text"
                      name="quantity"
                      contentEditable={false}
                      value={data?.quantity}
                      readOnly
                      className="qty quantity-value"
                      style={{
                        color: "black",
                      }}
                    />
                    <button className="cart-qty-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addQuantityKArt(data, index);
                      }}
                      style={{ background: `${activeColor}15` }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke={activeColor || "#E7A536"} strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      )}

    </div>
  );
}

export default CardList;
