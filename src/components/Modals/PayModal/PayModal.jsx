import { React, Fragment } from "react";
import "./PayModal.css";
import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";
import { useMinusQuantityKart } from "../../../Hooks/useMinusQuantityKart";
import { useAddQuantityKArt } from "../../../Hooks/useAddQuantityKArt";

const PayModal = () => {

    const { show, billTheme, kartHistoryStore, setRecievedOrder, kartItem, t, tipTotal, total, handleClose } = useContext(Context);
    const [minusQuantityKart ] = useMinusQuantityKart();
    const [addQuantityKArt ] = useAddQuantityKArt();

    return (
        <Modal
            id="pay-modal"
            className="modal fade full-popup products-modal cart-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <div className="container h-100">
                <div className="modal-dialog modal-dialog-zoom" role="document">
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{
                                backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                            }}
                        >
                            <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                                {kartHistoryStore && kartHistoryStore?.length > 1
                                    ? ` ${t("IbIItems")}`
                                    : ` ${t("IbIItem")}`}
                            </h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    handleClose();
                                    setRecievedOrder(false);
                                }}
                            >
                                <img src="assets/img/x.svg" alt="filter-img" />
                            </button>
                        </div>
                        <Modal.Body>
                            <div className="modal-body">
                                <div className="all-items">
                                    {kartItem && kartItem?.length > 0 ? (
                                        kartItem?.map((data, index) => (
                                            <div className="menu-list-item d-flex" key={index}>
                                                <div className="item-img mr-11">
                                                    <img
                                                        src={data?.SmallPictureUrl}
                                                        alt="menu-item-img"
                                                    />
                                                </div>
                                                
                                                <div className="item-content ">
                                                    <div className="item-inner-content add-qauntity d-flex">
                                                        <div className="item-left-text mr-23">
                                                            <h6 className="mb-15">
                                                                {data?.Name}
                                                                {data?.selectedModifiersData &&
                                                                    data?.selectedModifiersData?.map(
                                                                        (data, index) => {
                                                                            return (
                                                                                <p
                                                                                    style={{
                                                                                        fontSize: "10px",
                                                                                        margin: "0",
                                                                                        padding: "2px",
                                                                                    }}
                                                                                    key={index}
                                                                                >
                                                                                    {data.mName}  
                                                                                </p>
                                                                            );
                                                                        }
                                                                    )}
                                                            </h6>
                                                            <div className="item-count-wrapper d-flex mr-auto">
                                                                <button
                                                                    type="button"
                                                                    className="minus qty-btn"
                                                                    onClick={() => minusQuantityKart(data)}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="quantity"
                                                                    defaultValue={data.quantity}
                                                                    className="qty"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="plus qty-btn"
                                                                    onClick={() => addQuantityKArt(data)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <h6 className="item-price ml-auto">
                                                            €{" "}
                                                            {Number(
                                                                data.quantity *
                                                                (data.basePrice
                                                                    ? data?.basePrice
                                                                    : data.Price) +
                                                                (data.quantity * data.modifierPrice.length
                                                                    ? data?.modifierPrice.reduce(
                                                                        (partialSum, a) => partialSum + a,
                                                                        0
                                                                    )
                                                                    : 0)
                                                            ).toFixed(2)}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            {kartHistoryStore && kartHistoryStore?.length > 0 ? (
                                                <Fragment key={kartHistoryStore?.length}>
                                                    {kartHistoryStore?.map((data, index) => (
                                                        <div
                                                            className="menu-list-item d-flex"
                                                            key={index}
                                                        >
                                                            <div className="item-img mr-11">
                                                                <img
                                                                    src={data?.SmallPictureUrl}
                                                                    alt="menu-item-img"
                                                                />
                                                            </div>

                                                            <div className="item-content ">
                                                                <div className="item-inner-content add-qauntity d-flex">
                                                                    <div className="item-left-text mr-23">
                                                                        <h6 className="mb-15">{data?.Name}</h6>
                                                                        <div className="item-count-wrapper d-flex mr-auto">
                                                                            <button
                                                                                type="button"
                                                                                className="minus qty-btn"
                                                                                onClick={() =>
                                                                                    minusQuantityKart(data)
                                                                                }
                                                                            />
                                                                            <input
                                                                                type="text"
                                                                                name="quantity"
                                                                                defaultValue={data?.Item?.Quantity}
                                                                                className="qty"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="plus qty-btn"
                                                                                onClick={() => addQuantityKArt(data)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {/* <h6 className="item-price ml-auto"></h6> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Fragment>
                                            ) : (
                                                <>
                                                    {" "}
                                                    <div className="modal-body text-center empty-cart-img">
                                                        <img src="assets/img/order.png" alt="img" />
                                                        <h6>{t("lblYourCartIsEmpty")}</h6>
                                                        <p>
                                                            {t("lblYourCartIsEmpty")}
                                                            <br />
                                                            {t("lblPleaseSelectItemsFromMenu")}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>


                            <div className="cart-modal-footer">
                                <div className="payment-method"></div>
                                {kartItem && kartItem?.length > 0 ? (
                                <div className="total-amounts">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="total-hd">{t("lblTotal")}</p>
                                        <p className="total-price" style={{ color: "black" }}>
                                            {"€" +
                                                (parseFloat(tipTotal) + parseFloat(total)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                ) : " " }
                                <div className="pb-20 pl-20 pr-20"></div>
                            </div>
                        </Modal.Body>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PayModal;