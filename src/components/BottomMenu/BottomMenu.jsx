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
        <div className={`menu-bottom-bar hideOnScroll ${visibleFooter ? "down" : ""}`} >
            <ul className={`bottom-navbar m-0 p-0 ${serviceCall?.length > 0 ? "bottom-navbar-between" : "bottom-navbar-around"}`}>
                <li className="nav-item">
                    <button
                        className="nav-link btnBottom"
                        onClick={() => { getOrderHistoryDetails(); handleShowPayment();  }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="url(#pattern0)" />
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use href="#image0_1981_8226" transform="scale(0.01)" />
                                </pattern>
                                <image id="image0_1981_8226" width="100" height="100" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nO3dS04CQRSF4RMTRhBX4mPkYxUyYU04VNmCrEkNM92BYiIjNZUUiSkb+1WkjvB/SQ+bkPvT3TC5SAAAAAAAAAAAAABQZyBpImku6VHSu6QvDv01g2Wc1TzOLswwi7GkBcNX3w/gIs6yswNJ14RQzjvBp6RpnG1rxNDWbsshSivjWPPni3xIupF0LmnYpfCeGcZZ3cbZpVfKVdMXGlQ8M54lHW33/e+0Y0kvFc+URg/6ScWVQYw8UVbJbMOsa82Tk8JtCnncJbO9b3LSU3LSWaY3A+kimW2Yda1lctKISWYzqvjxWCv9ioa8Ws+XINtFEDME2bUgHNrqDAgirw8ZQVQ+AkFUfvAEUflhE0TlB0wQlR8qQVR+kARR+eERROUHZhcEeRHEDEHMEMQMQcwQZF+D2H99NEEQMwQxQxAzPNTNEMQMQcwQxAxBzBDEDEHMEMQMQcwQxAxBzBDEDEHMEMQMQcwQxAxBzBDEDEHMEOS/B3lLTmD5TD6HyWxfu6xnCmvqkMdll/VM6QKzsDMQecy6LDCrWvEX1tOhn9OuK/42LcEkSncnfZZgbloTu4o7A8N9kAd9vVGc1aziymi1JnaNRcryWaSsuA57WnGlcKjMqvG1cGmxjF+9P4iLLreppn9XkW4u5dCvGYQZPcSvtln/rgIAAAAAAAAAAACAdtQ36i8ndFiqSXwAAAAASUVORK5CYII=" />
                            </defs>
                        </svg>

                        <p>{t("lblPayment")}</p>
                    </button>
                </li>
                {/* {serviceCall?.length > 0 &&  */}
                <li className="nav-item" style={{ opacity: serviceCall?.length === 0 ? "0.5" : "1" }}>
                    <button className="nav-link service-link btnBottom"
                        data-toggle="modal"
                        data-target={serviceCall?.length === 0 ? "" : "#service-modal"}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1981_8232)">
                                <path d="M0.68286 22C0.488539 22 0.326149 21.9345 0.19569 21.8036C0.06523 21.6727 0 21.5109 0 21.3181C0 21.1235 0.06523 20.9612 0.19569 20.8312C0.326149 20.7012 0.488995 20.6362 0.684229 20.6362H23.3158C23.511 20.6362 23.6739 20.7012 23.8043 20.8312C23.9348 20.9612 24 21.1235 24 21.3181C24 21.5118 23.9348 21.6736 23.8043 21.8036C23.6739 21.9336 23.511 21.9991 23.3158 22H0.68286ZM1.05234 18.7474V18.4337C1.05234 15.7516 1.96921 13.4318 3.80294 11.4743C5.63668 9.51676 7.91288 8.34845 10.6315 7.96932V7.36515C10.6315 6.99966 10.7679 6.68099 11.0407 6.40914C11.3144 6.13638 11.6342 6 12 6C12.3658 6 12.6856 6.13638 12.9593 6.40914C13.2321 6.68099 13.3685 6.9992 13.3685 7.36379V7.96795C16.0917 8.34981 18.3688 9.51858 20.1998 11.4743C22.0317 13.4318 22.9477 15.7516 22.9477 18.4337V18.7474H1.05234ZM2.51659 17.3836H21.4834C21.2699 15.1597 20.245 13.2486 18.4085 11.6502C16.5711 10.0518 14.4349 9.25264 12 9.25264C9.56415 9.25264 7.42935 10.0518 5.59562 11.6502C3.76189 13.2486 2.73555 15.1597 2.51659 17.3836Z" fill="#0D0D0D" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1981_8232">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p>{t("lblServices")}</p>
                    </button>
                </li>
                {/* } */}
                <li className="nav-item count" >
                    {/* {timer &&
                        <p className="close-time">
                            <Timer
                                statusTimer={statusTimer}
                                secondsRemaining={secondsRemaining}
                                setSecondsRemaining={setSecondsRemaining}
                                status={status}
                                setStatus={setStatus}
                                setTimer={setTimer}
                                handleReset={handleReset}
                                handleStop={handleStop}
                                initialCount={initialCount}
                                setInitialCount={setInitialCount}
                                countMin={countMin}
                                setCountMin={setCountMin}
                                countSec={countSec}
                                setCountSec={setCountSec}
                            />
                        </p>
                    } */}

                    <button
                        className="nav-link cart-link btnBottom "
                        data-toggle="modal"
                        data-target={ kartItem?.length === 0 ? "" : "#cart-modal" }
                        style={{ opacity: kartItem?.length === 0 ? "0.5" : "1" }}
                    >
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.99459 8.34749L7.59759 15.5195C7.64159 16.0715 8.09259 16.4855 8.64359 16.4855H8.64759H19.5586H19.5606C20.0816 16.4855 20.5266 16.0975 20.6006 15.5825L21.5506 9.02349C21.5726 8.86749 21.5336 8.71149 21.4386 8.58549C21.3446 8.45849 21.2066 8.37649 21.0506 8.35449C20.8416 8.36249 12.1686 8.35049 6.99459 8.34749ZM8.64159 17.9855C7.32459 17.9855 6.20959 16.9575 6.10259 15.6425L5.18659 4.74849L3.67959 4.48849C3.27059 4.41649 2.99759 4.02949 3.06759 3.62049C3.13959 3.21149 3.53459 2.94549 3.93459 3.00949L6.01459 3.36949C6.34959 3.42849 6.60459 3.70649 6.63359 4.04649L6.86859 6.84749C21.1446 6.85349 21.1906 6.86049 21.2596 6.86849C21.8166 6.94949 22.3066 7.24049 22.6406 7.68849C22.9746 8.13549 23.1146 8.68649 23.0346 9.23849L22.0856 15.7965C21.9066 17.0445 20.8226 17.9855 19.5626 17.9855H19.5576H8.64959H8.64159Z" fill="#0D0D0D" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.9536 12.0439H15.1816C14.7666 12.0439 14.4316 11.7079 14.4316 11.2939C14.4316 10.8799 14.7666 10.5439 15.1816 10.5439H17.9536C18.3676 10.5439 18.7036 10.8799 18.7036 11.2939C18.7036 11.7079 18.3676 12.0439 17.9536 12.0439Z" fill="#0D0D0D" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.21102 20.7021C8.51202 20.7021 8.75502 20.9451 8.75502 21.2461C8.75502 21.5471 8.51202 21.7911 8.21102 21.7911C7.90902 21.7911 7.66602 21.5471 7.66602 21.2461C7.66602 20.9451 7.90902 20.7021 8.21102 20.7021Z" fill="#0D0D0D" />
                            <mask id="mask0_1981_8239"  maskUnits="userSpaceOnUse" x="7" y="20" width="2" height="2">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.66602 21.2452C7.66602 21.5472 7.90902 21.7912 8.21202 21.7912C8.51302 21.7912 8.75602 21.5472 8.75602 21.2452C8.75602 20.9442 8.51302 20.7012 8.21202 20.7012C7.90902 20.7012 7.66602 20.9442 7.66602 21.2452Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_1981_8239)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.66797 26.7902H13.757V15.7012H2.66797V26.7902Z" fill="#0D0D0D" />
                            </g>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.21002 21.0411C8.09702 21.0411 8.00502 21.1331 8.00502 21.2461C8.00502 21.4731 8.41602 21.4731 8.41602 21.2461C8.41602 21.1331 8.32302 21.0411 8.21002 21.0411ZM8.21002 22.5411C7.49602 22.5411 6.91602 21.9601 6.91602 21.2461C6.91602 20.5321 7.49602 19.9521 8.21002 19.9521C8.92402 19.9521 9.50502 20.5321 9.50502 21.2461C9.50502 21.9601 8.92402 22.5411 8.21002 22.5411Z" fill="#0D0D0D" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.4923 20.7021C19.7933 20.7021 20.0373 20.9451 20.0373 21.2461C20.0373 21.5471 19.7933 21.7911 19.4923 21.7911C19.1903 21.7911 18.9473 21.5471 18.9473 21.2461C18.9473 20.9451 19.1903 20.7021 19.4923 20.7021Z" fill="#0D0D0D" />
                            <mask id="mask1_1981_8239"  maskUnits="userSpaceOnUse" x="18" y="20" width="3" height="2">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.9473 21.2452C18.9473 21.5472 19.1903 21.7912 19.4923 21.7912C19.7923 21.7912 20.0373 21.5472 20.0373 21.2452C20.0373 20.9442 19.7923 20.7012 19.4923 20.7012C19.1903 20.7012 18.9473 20.9442 18.9473 21.2452Z" fill="white" />
                            </mask>
                            <g mask="url(#mask1_1981_8239)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.9473 26.7902H25.0373V15.7012H13.9473V26.7902Z" fill="#0D0D0D" />
                            </g>
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.4913 21.0411C19.3793 21.0411 19.2873 21.1331 19.2873 21.2461C19.2883 21.4751 19.6983 21.4731 19.6973 21.2461C19.6973 21.1331 19.6043 21.0411 19.4913 21.0411ZM19.4913 22.5411C18.7773 22.5411 18.1973 21.9601 18.1973 21.2461C18.1973 20.5321 18.7773 19.9521 19.4913 19.9521C20.2063 19.9521 20.7873 20.5321 20.7873 21.2461C20.7873 21.9601 20.2063 22.5411 19.4913 22.5411Z" fill="#0D0D0D" />
                        </svg>
                        {/* <span className="active-oval" /> */}

                        <span style={{ color: activeColor }}> {bascketLenght}</span>
                        {/* <span style={{ color: activeColor }}>{getTotalQuantityInKaart() === 0 ? " " : getTotalQuantityInKaart()}</span> */}
                        <p>{t("lblBasket")}</p>
                    </button>


                </li>
            </ul>
        </div>
    )
}

export default BottomMenu;
