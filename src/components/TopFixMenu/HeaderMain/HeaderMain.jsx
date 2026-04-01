import { React, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import './HeaderMain.css';
import { Context } from "../../../context/kartItemContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HeaderMain = ({ visible, logoHead }) => {

    const {
        activeColor,
        isOpenLanguage,
        orderTheme,
        path
    } = useContext(Context);

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        if (isOpenLanguage) {
            document.querySelector("body").classList.add("service-bar-toggle");
        } else {
            document.querySelector("body").classList.remove("service-bar-toggle");
        }
    }, [isOpenLanguage])

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(now.toLocaleDateString([], { day: '2-digit', month: 'short' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 30000);
        return () => clearInterval(interval);
    }, []);

    const location = useLocation()

    return (
        <div className={`header-main header-height ${visible ? "up" : ""}`}>
            {/* Left: back + logo */}
            <div className="header-left">
                <Link to={`${location.pathname === "/home" ? "/landing" : "/"}`} className="back-icon">
                    <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.65669 0.883401C9.54859 0.790347 9.42017 0.71652 9.27878 0.666146C9.1374 0.615773 8.98583 0.589844 8.83276 0.589844C8.67968 0.589844 8.52812 0.615773 8.38673 0.666146C8.24535 0.71652 8.11693 0.790347 8.00883 0.883401L0.272264 7.52618C0.185957 7.60013 0.117485 7.68798 0.0707664 7.78468C0.0240478 7.88138 0 7.98505 0 8.08974C0 8.19443 0.0240478 8.29809 0.0707664 8.3948C0.117485 8.4915 0.185957 8.57934 0.272264 8.65329L8.00883 15.2961C8.46501 15.6878 9.2005 15.6878 9.65669 15.2961C10.1129 14.9044 10.1129 14.2729 9.65669 13.8812L2.91629 8.08574L9.666 2.2903C10.1129 1.9066 10.1129 1.2671 9.65669 0.883401Z" fill="white" />
                    </svg>
                </Link>
                {logoHead && (
                    <img className="header-logo-img" src={logoHead} alt="logo" />
                )}
            </div>

            {/* Center: time & date */}
            <div className="header-center">
                <span className="header-time">{currentTime}</span>
                <span className="header-date">{currentDate}</span>
            </div>

            {/* Right: table number */}
            <div className="header-right">
                <span className="table-badge" style={{ background: activeColor }}>
                    <span style={{ color: orderTheme?.HeaderTextColor || '#fff' }}>
                        {path?.tableNumber}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default HeaderMain;
