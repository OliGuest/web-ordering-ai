import React from "react";
import "./CardList.css";
import { useEffect, useContext, useState } from "react";
import { Context } from "../../../context/kartItemContext";
import { useMinusQuantityKart } from "../../../Hooks/useMinusQuantityKart";
import { useAddQuantityKArt } from "../../../Hooks/useAddQuantityKArt";
import DescriptionTitle from "../../DescriptionItem/DescriptionTitle";



const CardList = () => {

  const { kartItem, orderTheme, deleteProductBasket } = useContext(Context);
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
    minusQuantityKart(finddata);
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
                <div className="addimage item-delet">
                  <span onClick={() => { removItems(data); }}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12.2466 22.5001C10.8916 22.5001 9.5706 22.4852 8.2636 22.4581C6.5916 22.4251 5.4346 21.3411 5.2456 19.6291C4.9306 16.7891 4.3916 10.0951 4.3866 10.0281C4.3526 9.61515 4.6606 9.25315 5.0736 9.22015C5.4806 9.20915 5.8486 9.49515 5.8816 9.90715C5.8866 9.97515 6.4246 16.6461 6.7366 19.4641C6.8436 20.4371 7.3686 20.9391 8.2946 20.9581C10.7946 21.0112 13.3456 21.0141 16.0956 20.9641C17.0796 20.9451 17.6116 20.4531 17.7216 19.4571C18.0316 16.6631 18.5716 9.97515 18.5776 9.90715C18.6106 9.49515 18.9756 9.20715 19.3846 9.22015C19.7976 9.25415 20.1056 9.61515 20.0726 10.0281C20.0666 10.0961 19.5246 16.8071 19.2126 19.6221C19.0186 21.3691 17.8646 22.4321 16.1226 22.4641C14.7896 22.4871 13.5036 22.5001 12.2466 22.5001Z" fill="black" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M20.708 7.48926H3.75C3.336 7.48926 3 7.15326 3 6.73926C3 6.32526 3.336 5.98926 3.75 5.98926H20.708C21.122 5.98926 21.458 6.32526 21.458 6.73926C21.458 7.15326 21.122 7.48926 20.708 7.48926Z" fill="black" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.4403 7.489C16.3023 7.489 15.3143 6.678 15.0903 5.562L14.8473 4.346C14.7963 4.161 14.5853 4 14.3453 4H10.1123C9.87233 4 9.66133 4.161 9.60033 4.392L9.36733 5.562C9.14433 6.678 8.15533 7.489 7.01733 7.489C6.60333 7.489 6.26733 7.153 6.26733 6.739C6.26733 6.325 6.60333 5.989 7.01733 5.989C7.44333 5.989 7.81333 5.685 7.89733 5.267L8.14033 4.051C8.38733 3.119 9.19433 2.5 10.1123 2.5H14.3453C15.2633 2.5 16.0703 3.119 16.3073 4.006L16.5613 5.267C16.6443 5.685 17.0143 5.989 17.4403 5.989C17.8543 5.989 18.1903 6.325 18.1903 6.739C18.1903 7.153 17.8543 7.489 17.4403 7.489Z" fill="black" />
                    </svg>
                  </span>

                  <div className="item-count-wrapper d-flex mr-auto">
                    <svg className="blue-buttons"
                      onClick={(e) => { e.stopPropagation(); minusRemoveItems(data) }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                      <path d="M11.5 17H25.5V19H11.5V17Z" fill="#E7A536" />
                    </svg>

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
                    <svg className="blue-buttons"
                      onClick={(e) => {
                        e.stopPropagation();
                        addQuantityKArt(
                          data,
                          index
                        );

                      }} width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" width="36" height="36" rx="8" fill="#FAEEE9" />
                      <path d="M25.5 17H19.5V11H17.5V17H11.5V19H17.5V25H19.5V19H25.5V17Z" fill="#E7A536" />
                    </svg>
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
