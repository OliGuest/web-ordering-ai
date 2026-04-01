import React, { useEffect }  from "react";
import "./HistoryModal.css";
import { useContext } from "react";
import { Context } from "../../../context/kartItemContext";

const HistoryModal = () => {

    const { kartHistoryStore, t, orderHistory } = useContext(Context);
    // const [history, setHistory] = useState(orderHistory);

    useEffect(()=>{
       
    }, []); 
// console.log("history")
    return (
        <div
            id="bill-modal"
            className="modal full-popup products-modal cart-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="ItemsLabel"
            aria-hidden="true"
        >
            <div className="container ">
                <div className="modal-dialog modal-dialog-zoom" role="document">
                    <div id="modal-content-bill-modal" className="modal-content">
                        <div
                            className="modal-header"
                        >
                            {/* <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}> */}
                            <h4 style={{ color: `black` }}>
                                {kartHistoryStore && kartHistoryStore?.length > 1
                                    ? ` ${t("IbIHistory")}`
                                    : ` ${t("IbIHistory")}`}
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icons/close_24px">
                                        <path id="icon" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#1D1A22" />
                                    </g>
                                </svg>

                            </button>
                        </div>
                        <div
                            className="modal-body"
                        >
                            {/**listing of kartHistory */}

                            <div className="dynamic-list">

                                <div className="items-bill">
                                    {orderHistory?.slice(0, 5).map((data, indx) => (
                                        <div key={indx} className="bill-wrapper">
                                            <div className="roundtext" key={indx}>
                                                <h5>
                                                    {t("IbIRound")} {`${data.Round}`}
                                                </h5>
                                                <p>
                                                    {/* <svg className="clock-Icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="Icons/access_time_24px">
                                                            <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M9.99175 1.66675C5.39175 1.66675 1.66675 5.40008 1.66675 10.0001C1.66675 14.6001 5.39175 18.3334 9.99175 18.3334C14.6001 18.3334 18.3334 14.6001 18.3334 10.0001C18.3334 5.40008 14.6001 1.66675 9.99175 1.66675ZM10.0001 16.6667C6.31675 16.6667 3.33341 13.6834 3.33341 10.0001C3.33341 6.31675 6.31675 3.33341 10.0001 3.33341C13.6834 3.33341 16.6667 6.31675 16.6667 10.0001C16.6667 13.6834 13.6834 16.6667 10.0001 16.6667ZM9.16675 10.8917L13.7417 13.6334L14.5917 12.2001L10.8334 9.94175V5.35008H9.16675V10.8917Z" fill="#403B3B" />
                                                        </g>
                                                    </svg> */}
                                                    {data.RoundTime}
                                                </p>
                                            </div>
                                            
                                            {data?.BillProducts?.map((item, index) => (

                                                <div key={index} className="menu-list-item d-flex" >
                                                    <div className="item-content ">
                                                        <div className="item-inner-content add-qauntity d-flex">
                                                            <div className="item-left-text mr-23 disabled centeredText  ">
                                                                <h6 className="">{item?.ModifierName}</h6>
                                                                <div className="multiply"><span className="x">x</span><span className="number" >{item?.Quantity}</span></div>
                                                            </div>
                                                            {item?.Price !== 0 ?
                                                                <h6 className="item-price ml-auto">
                                                                    {item?.Price !== null
                                                                        && 
                                                                        Number(
                                                                        parseFloat(item?.Price) *
                                                                        parseFloat(item?.Quantity)
                                                                        ).toFixed(2)}
                                                                </h6>
                                                                :
                                                                // eslint-disable-next-line
                                                                <h6 className="item-price ml-auto"></h6>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>)
                                    )}
                                </div>
                            </div>

                            {/* <div className="cart-modal-footer">
                                <div className="tips"></div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HistoryModal;