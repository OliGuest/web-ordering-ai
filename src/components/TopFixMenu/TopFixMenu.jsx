import { React, useEffect } from "react";
import "./TopFixMenu.css";
import HeaderMain from "./HeaderMain/HeaderMain";
import OrderMenuTabs from "./OrderMenuTabs/OrderMenuTabs";
import { useGetOrderHistoryDetails } from "../../Hooks/useGetOrderHistoryDetails";
import CoverImgAndLogo from "./CoverImgAndLogo/CoverImgAndLogo";

const TopFixMenu = ({ visible, handleShow, handleShowPayment, logoHead, restaurantName }) => {

  const [getOrderHistoryDetails] = useGetOrderHistoryDetails();

  return (
    <>
      <HeaderMain visible={visible} logoHead={logoHead} />

      <CoverImgAndLogo visible={visible} />

      <div className={`settings-wrapper  ${visible ? " up" : ""}`}>
        <div className="restorant-name">
          <h4>{restaurantName}</h4>
        </div>
        <div className="settings-actions">
          <button className="settings-btn" onClick={handleShow} aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
          </button>
          <button className="settings-btn" data-toggle="modal" data-target="#bill-modal"
            onClick={() => getOrderHistoryDetails()} aria-label="Order history">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </button>
        </div>
      </div>

      <OrderMenuTabs visible={visible} handleShow={handleShow} />

    </>
  );
};

export default TopFixMenu;
