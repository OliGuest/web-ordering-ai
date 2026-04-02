import { React, useContext } from "react";
import "./BottomMenu.css";
import { Context } from "../../context/kartItemContext";
import { useGetOrderHistoryDetails } from "../../Hooks/useGetOrderHistoryDetails";
// import { useGetOrderHistoryDetails } from "../../Hooks/useGetOrderHistoryDetails";
// import Timer from "../Timer/Timer";

const BottomMenu = ({ countMin, setCountMin, countSec, setCountSec, visibleFooter, setTimer, timer, handleShowPayment  }) => {

    const { t, activeColor, bascketLenght,
        //  minutes, 
        //  seconds, 
        //  timeSetter, 
        //  setShowTimer, 
         serviceCall, kartItem } = useContext(Context);

    const [getOrderHistoryDetails] = useGetOrderHistoryDetails();

    // const [getOrderHistoryDetails] = useGetOrderHistoryDetails();


    // Coundtown Timer
    
    // const statusTimer = {
    //     STARTED: 'Started',
    //     STOPPED: 'Stopped',
    // }
    // const [status, setStatus] = useState(statusTimer.STOPPED);
    // const [initialCount, setInitialCount] = useState();



    // const [initialCount, setInitialCount] = useState();
    // const [secondsRemaining, setSecondsRemaining] = useState(initialCount);

    // useEffect(()=> {

    //     window.addEventListener("unload", () => {
    //         setIsRefreshed(localStorage.setItem("refresh", true));
    //     });

    //     if (isRefreshed) {
    //         localStorage.removeItem("refresh", true)
    //         const countdownLocalStorageLeft = localStorage.getItem("timeBeforeRefresh");
    //         const classTimer = countdownLocalStorageLeft?.split(":");
    //         const localMinutes = classTimer ? classTimer[0] : 0;
    //         const localSeconds = classTimer ? classTimer[1] : 0;
    //         setInitialCount((Number(localMinutes) * 60) + Number(localSeconds));
    //         setSecondsRemaining((Number(localMinutes) * 60) + Number(localSeconds));
    //         console.log(isRefreshed, "isRefreshed");
    //         handleStart();
    //     }
    // }, [])

    // useEffect(() => {
        // This block will be executed whenever minutes or seconds change
            // setInitialCount((Number(minutes) * 60) + Number(seconds));
            // setSecondsRemaining((Number(minutes) * 60) + Number(seconds));
        // if (((Number(minutes) * 60) + Number(seconds)) !== 0){
            // handleStart();
        // }
        // setShowTimer(false);
        // eslint-disable-next-line
    // }, [timeSetter]);

    // const handleStart = () => {
    //     setStatus(statusTimer.STARTED)
    //     setTimer(true);
    // }
    // const handleStop = () => {
    //     setStatus(statusTimer.STOPPED)
    // }
    // const handleReset = () => {
    //     setStatus(statusTimer.STOPPED)
    //     setSecondsRemaining(initialCount)
    // }

    //End countdown Timer
    return (
        <div className="menu-bottom-bar" role="navigation" aria-label="Main navigation">
            <ul className="bottom-navbar m-0 p-0">
                {/* Payment */}
                <li className="nav-item">
                    <button
                        className="nav-link btnBottom"
                        onClick={() => { getOrderHistoryDetails(); handleShowPayment(); }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="2"/>
                            <line x1="2" y1="10" x2="22" y2="10"/>
                        </svg>
                        <p>{t("lblPayment")}</p>
                    </button>
                </li>

                {/* Services */}
                <li className="nav-item" style={{ opacity: serviceCall?.length === 0 ? "0.4" : "1" }}>
                    <button className="nav-link service-link btnBottom"
                        data-toggle="modal"
                        data-target={serviceCall?.length === 0 ? "" : "#service-modal"}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 01-3.46 0"/>
                        </svg>
                        <p>{t("lblServices")}</p>
                    </button>
                </li>

                {/* Basket */}
                <li className="nav-item count">
                    <button
                        className="nav-link cart-link btnBottom"
                        data-toggle="modal"
                        data-target={kartItem?.length === 0 ? "" : "#cart-modal"}
                        style={{ opacity: kartItem?.length === 0 ? "0.4" : "1" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                        {bascketLenght > 0 && (
                            <span className="cart-badge" style={{ backgroundColor: activeColor }}>{bascketLenght}</span>
                        )}
                        <p>{t("lblBasket")}</p>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default BottomMenu;
