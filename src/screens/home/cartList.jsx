import React from 'react'

function CartList({cartItemList, menuWarapperNew, orderTheme, minusQuantityKart, addQuantityKArt, removeProductFromCart }) {
  
   

    return (
    <>
        {cartItemList?.map((data, index) => { 
            
        return (
        <div className="all-items menu-list" key={index}>
            <div className="menu-list-item d-flex align-items-start">
            <div className="item-img mr-11 ">
                <button type="button" className="item-edit-btn"
                onClick={() => (menuWarapperNew(
                    data,
                    index
                ))}
                data-dismiss="modal"
                aria-label="Edit item"
                >
                <img src="assets/img/edit.svg" alt="edit"/>
                </button>
                <img src={data?.SmallPictureUrl} alt="menu-item-img"/>
            </div>
            <div className="item-content ">
                <div className="item-inner-content add-qauntity d-flex">
                <div className="item-left-text mr-23">
                    <h6
                    className="mb-15"
                    style={{
                        color: `${orderTheme?.ProductTextColor}`,
                    }}
                    >
                    {data?.Name}
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
                    </h6>
                    <div className="item-count-wrapper d-flex mr-auto">
                    <button
                        type="button"
                        className="minus qty-btn"
                        onClick={() => minusQuantityKart(data)}
                    // style={{borderColor:`${orderTheme?.ButtonBackgroundColor}`}}
                    />
                    <input
                        type="text"
                        name="quantity"
                        contentEditable={false}
                        value={data?.quantity}
                        className="qty"
                        style={{
                        backgroundColor: `${orderTheme?.BackgroundColor}`,
                        }}
                    />

                    <button
                        type="button"
                        className="plus qty-btn"
                        onClick={() => addQuantityKArt(data)}
                    />
                    </div>
                </div>
                <div className="addimage item-delet">
                    <h6
                    className="item-price ml-auto"
                    style={{
                        color: `${orderTheme?.ProductTextColor}`,
                    }}
                    >
                    
                    {
                        data?.PriceValue != null
                        ? 
                            data?.PriceValue
                        : 
                        
                        data?.basePrice 

                        ? 
                        "€ " + Number(
                        (data.quantity * parseFloat(data?.basePrice)) +
                        (data.quantity *
                        data?.modifierPrice.length 
                        ? 
                            data?.modifierPrice?.reduce((partialSum, a) => {
                                return parseFloat(partialSum) + parseFloat(a);
                            }, 0) 
                        : 0)
                        ).toFixed(2)
                        : "€ " + Number(data.quantity * data.Price)
                    }
                    </h6>
                    <span
                    onClick={() =>
                        removeProductFromCart(data.ProductId)
                    }
                    >
                    <img
                        src="assets/img/delet.svg"
                        alt="filter-img"
                    />
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
        ) }) }
    </>
  )
}

export default CartList