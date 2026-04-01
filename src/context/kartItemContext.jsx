import { createContext, useRef, useState } from "react";
import * as adminServices from "../services/adminService";
import { useTranslation } from "react-i18next";
import { CONSTANTDATA } from "../global/constant";
import moment from "moment";
import showNotification from "../services/notificationService";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { hubConnection } from 'signalr-no-jquery';

export const Context = createContext({});

export const Provider = ({ children }) => {

    const resetModifiers = useRef(null);
    const root = document.documentElement;
    const AppConfig = window.config;
    let closeTemp = false;
    let temp = [];
    let openedConnection = false;
    const history = useHistory();
    const [kartHistoryStore, setKartHistoryStore] = useState([]);

    const { t, i18n } = useTranslation();
    const [curentTime, setcurentTime] = useState();
    // eslint-disable-next-line
    const [slideImages, setslider] = useState([]);
    const [inititalIndex, setinititalIndex] = useState(0);
    const [subCatIndex, setsubCatIndex] = useState([]);
    const [searchSubCatIndex, setSearchSubCatIndex] = useState();
    const [visibility, setvisibility] = useState(true);
    const [serviceCall, setserviceCall] = useState([]);
    // const [logoImage, setlogoImage] = useState();
    // eslint-disable-next-line
    const [active, setactive] = useState(true);
    const [detailsBackButtonColor, setDetailsBackButtonColor] = useState();

    const [quantityToKart, setquantityToKart] = useState(1);
    const [index, setindex] = useState([]);
    const [addRemove, setAddRemove] = useState(false);
    const [addRemoveIndex, setaddRemoveIndex] = useState();
    // eslint-disable-next-line
    const [displayTotalForBottomPopup, setdisplayTotalForBottomPopup] =
        useState();
    const [filterID, setfilterID] = useState([]);
    const [searchText, setsearchText] = useState();
    const [path, setPath] = useState(
        JSON.parse(sessionStorage.getItem("theParams"))
    );
    const [noDescription, setNoDescription] = useState(false);
    const [noBannerDescription, setNoBannerDescription] = useState(false);
    const [error, setError] = useState();
    const [errorModifiers, setErrorModifiers] = useState([]);
    const [clickedCardId, setClickedCardId] = useState();
    const [errorLabel, setErrorLabel] = useState();
    const [aboutUsCover, setAboutUsCover] = useState();
    const [landingPage, setLandingPage] = useState();
    const [isOpen, setIsOpen] = useState();
    const [orderGuid, setOrderGuid] = useState();
    const [numberOfRoudns, setNumberOfRoudns] = useState();
    const [waitGuestToConf, setWaitGuestToConfirm] = useState(0);
    const [senderValue, setSenderValue] = useState();
    const [restaurantName, setRestaurantName] = useState();
    const [showPin, setShowPin] = useState();
    const [showCash, setShowCash] = useState();
    const [showQRpay, setShowQRpay] = useState();
    const [showTimer, setShowTimer] = useState(false);
    const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false)
    const [isOpenAllergens, setIsOpenAllergens] = useState(false);
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [DescriptionData, setDescriptionData] = useState();
    const [isRefreshed, setIsRefreshed] = useState(localStorage.getItem("refresh"))
    const [activeCard, setActiveCard] = useState();
    const [activeCardBanner, setActiveCardBanner] = useState();
    const [initialIndexTab, setinitialIndexTab] = useState(0);
    // eslint-disable-next-line
    const [deviceId, setDeviceid] = useState(localStorage.getItem("deviceId"));
    const [logoHead, setlogoHead] = useState();

    const [tipTotal, setTipTotal] = useState(0);
    const [bannerItems, setBannerItems] = useState([]);
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    const [bascketLenght, setBascketLenght] = useState();
    const [recievedOrder, setRecievedOrder] = useState(false);
    const [paymentReceieved, setPaymentReceived] = useState(false);
    const [kartItem, setkartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [arr, setArr] = useState([]);


    // On loading Login page
    const [coverImage, setCoverImage] = useState();
    const [houseRules, setHouseRules] = useState();
    const [secondScreen, setSecondScreen] = useState(false);
    const [nameValue, setNameValue] = useState("")

    //adding quanting to kart items
    // eslint-disable-next-line
    const [itemsOnTheHistory, setItemsOnTheKartHistory] = useState([]);
    // eslint-disable-next-line
    const [historyTotal, sethistoryTotal] = useState(0.0);
    const [modifiredState, setmodifiredState] = useState([]);
    const [discriptionTotal, setDiscriptionTotal] = useState(0);

    const [defaultLang, setDefaultLang] = useState(
        localStorage?.getItem("languageIndex")
            ? localStorage?.getItem("languageIndex")
            : CONSTANTDATA.LANGUAGE_CODE_NL
    );
    // eslint-disable-next-line
    const [currentLanguage, setCurrentLanguage] = useState("");

    const [currentLanguageCode, setCurrentLanguageCode] = useState(
        localStorage?.getItem("currentLanguageCodeStore")
            ? localStorage?.getItem("currentLanguageCodeStore")
            : "nl"
    );
    const [allLanguageList, setAllLanguageList] = useState("");
    // eslint-disable-next-line
    const [requiredErrorMsg, setRequiredErrorMsg] = useState("");
    // eslint-disable-next-line
    const [note, setNote] = useState("");
    const [orderHistory, setOrderHistory] = useState([]);
    const [subTotalServiceFee, setSubTotalServiceFee] = useState([]);
    const [modifierSelectedTrue, setModifierSelectedTrue] = useState([]);
    const [activeColor, setActiveColor] = useState();
    const [activeTheme, setActiveTheme] = useState();
    const [categoriesScreenLayoutType, setCategoriesScreenLayoutType] = useState();
    const [serviceCallTheme, setServiceCallTheme] = useState();
    const [billTheme, setBillTheme] = useState();
    // const [historyTheme, setHistoryTheme] = useState();
    const [orderTheme, setOrderTheme] = useState();
    const [show, setShow] = useState();
    const [show1, setShow1] = useState(false);
    const [currencyValue, setCurrencyValue] = useState("");
    const [showFbLike, setshowFbLike] = useState(false);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    const [cartResetMode, setCartResetMode] = useState("NORMAL");

    // SingleR connections 
    const [connection, setConnection] = useState();
    const [hubProxy, setHubProxy] = useState();
    // const [users, setUsers] = useState([]);

    // SignalR conecctions
    // eslint-disable-next-line
    const [promptUser, setUser] = useState();
    // const [countdown] = useCountdown();

    const timeSetter = (min, sec) => {
        setMinutes(min);
        setSeconds(sec);
        setShowTimer(true);
    }

    //Clear the localStorage for the next time to load true table / before users cannot enter the menu
    useEffect(() => {
        // window.addEventListener('beforeunload', handleTabClosing)
        window.addEventListener('unload', handleTabClosing)
        return () => {
            // window.removeEventListener('beforeunload', handleTabClosing)
            window.removeEventListener('unload', handleTabClosing)
        }
    })

    const handleTabClosing = () => {
        localStorage.removeItem("theParams");
        // localStorage.removeItem("deviceId");
        //localStorage.removeItem("username");
        localStorage.removeItem("languageIndex");
        localStorage.removeItem("currentLanguageCodeStore");
        localStorage.removeItem("token");
    }

    useEffect(() => {
        // If page will refresh to catch and call Api again
        window.addEventListener("unload", () => {
            setIsRefreshed(localStorage.setItem("refresh", true));
        });

        if (isRefreshed) {
            getResourcesWithParams();
            JoinTable();
            localStorage.removeItem("refresh", true)
        }
        // setUsername(user)
        setInterval(() => {
            var today = new Date(),
                todaytime = today.getHours() + ":" + today.getMinutes();
            setcurentTime(todaytime);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultLang]);

    useEffect(() => {
        setKartHistoryStore(JSON.parse(localStorage.getItem("kaartHistory")));
    }, [orderHistory]);

    useEffect(() => {
        setquantityToKart(quantityToKart);
    }, [quantityToKart])

    const activeButton = (value) => {
        // eslint-disable-next-line
        if (value == activeCard) {
            setActiveCard()
        } else {
            setActiveCard(value)
            setActiveCardBanner()
        }
    }

    const activeButtonBanner = (value) => {
        // eslint-disable-next-line
        if (value == activeCardBanner) {
            setActiveCardBanner()
        } else {
            setActiveCardBanner(value)
            setActiveCard()
        }
    }

    const noDetailsOpener = (data) => {

        data?.ProductDetails?.MenuItems.length > 0 ? setNoDescription(false) : setNoDescription(true);

    }
    const noDetailsBannerOpener = (data) => {
        console.log(data, "data?.ProductDetails?.MenuItems")
        data?.ProductDetails?.MenuItems.length > 0 ? setNoBannerDescription(false) : setNoBannerDescription(true);

    }

    const togglePaymentReceievedModel = () => {
        setPaymentReceived(false);
    };

    const calculateHistoryTotalAmount = (kartItem) => {
        let sum = 0;
        kartItem.forEach((item) => (sum += Number(item?.quantity * item?.Price)));
        sethistoryTotal(sum.toFixed(2));
    };


    const resetCartToInitialMode = () => {

        setTotal(0);

        setKartHistoryStore(JSON.parse(localStorage.getItem("kaartHistory")));

        //reset cart data history
        if (cartResetMode === "HISTORY") {
            setItemsOnTheKartHistory([]);
            localStorage.removeItem("kaartHistory");
        } else {
            //set history data
            setArr([]);
            // eslint-disable-next-line
            kartItem?.map((data) => {
                temp.push(data);
            });
            localStorage.setItem("kaartHistory", JSON.stringify(temp));

            setItemsOnTheKartHistory(kartItem);
            calculateHistoryTotalAmount(kartItem);
            localStorage.removeItem("kaartData");

            setkartItem([]);
            // setTotalSum(0);
            // if(!kartHistoryStore)
            setKartHistoryStore([]);
            setKartHistoryStore(JSON.parse(localStorage.getItem("kaartHistory")));
            // localStorage.removeItem("kaartData");
        }
        setTipTotal(0.0);
    };

    const toogleSubMenu = (ind) => {
        var x = document.getElementsByClassName("touch");
        // eslint-disable-next-line
        if (ind == isOpen) {
            setIsOpen();
        } else {
            setIsOpen(ind)
            for (var i = 0; i < x.length; i++) {
                if (x[i].checked !== true) {
                    x[i].checked = false;
                } else {
                    return;
                }
            }
        }
    }
    const handleClose = () => {
        setShow(false);
    };
    const paymentNextHandler = (MODE = "") => {
        setTimeout(() => {
            history.push('/landing')
        }, 1500);
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
        handleClose();
        resetCartToInitialMode();
        setActiveCard()
    };

    useEffect(() => {
        if (leftMenuIsOpen) {
            document.querySelector("body").classList.add("menu-open");
        } else {
            document.querySelector("body").classList.remove("menu-open");
        }
    }, [leftMenuIsOpen])

    const closeallOpenedModals = () => {
        setLeftMenuIsOpen(false)
        setIsOpenAllergens(false)
        setIsOpenLanguage(false)
        // document.querySelector("body").classList.remove("menu-open");
        // document.querySelector("body").classList.remove("filter-open");
        // document.querySelector("body").classList.remove("service-bar-toggle");
        // document.querySelector("body").classList.remove("service-bar-open");
        // document.querySelector("#navbarNav").classList.remove("menu-show");

    }
    const toogleLeftMenu = () => {
        setLeftMenuIsOpen(!leftMenuIsOpen)
    }

    const toggleAlergens = () => {
        setIsOpenAllergens(!isOpenAllergens);
    }

    const toggleLanguage = () => {
        setIsOpenLanguage(!isOpenLanguage)
    }

    // ________________________ SignalR useEffect 
    const JoinTable = async () => {

        // Skip SignalR in demo mode
        if (window.config?.APP_DEMO_MODE === true) {
            return;
        }

        try {
            hubProxy.invoke("ping").done(function () {
                console.log("Connection still alive!");
            });

            return;
        }
        catch {

        }

        try {
            let connection = hubConnection(AppConfig.APP_CONNECTION);

            const hubProxy = connection.createHubProxy('orderingHub');

            setConnection(connection);
            setHubProxy(hubProxy);
            setDeviceid(localStorage.getItem("deviceId"))
            // connect
            hubProxy.on("UsersInRoom", (users) => {
                setUser(users);
            })

            hubProxy.on('addQuantityViaSignalRListener', function (message) {

                let objectData = JSON.parse(message);
                setkartItem(objectData);
            });

            hubProxy.on('getTimerViaSignalRListener', function (data) {
                const classTimer = data?.split(":");

                const signalRMinutes = classTimer ? classTimer[0] : 0;
                const signalRSeconds = classTimer ? classTimer[1] : 0;
                timeSetter(signalRMinutes, signalRSeconds);

            });

            hubProxy.on("ReceiveMessage", (user, message) => {
                let objectData = JSON.parse(message);
                setkartItem(objectData);
            });

            hubProxy.on("AreYouAlive", (orderGuid, senderName, deviceSessionId) => {
                console.log("Alive", orderGuid);
                if (deviceSessionId != localStorage.getItem("deviceId")) {
                    hubProxy.invoke("iAmAlive", sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"), orderGuid).done(function () {
                        setTimeout(() => {
                            document.querySelector("#modalDoneOrdering").style.visibility = "hidden";
                            document.querySelector("#modalReadyToOrder").style.visibility = "visible";
                            setOrderGuid(orderGuid);
                            setSenderValue(senderName);
                        }, 2000);
                    });
                }
            });

            hubProxy.on("waitingBeforeOrder", (numberOfConfirmed) => {
                console.log("Invoked waitingBeforeOrder", numberOfConfirmed);
                document.querySelector("#modalDoneOrdering").style.visibility = "visible";
                setWaitGuestToConfirm(numberOfConfirmed);

                blockTouchEvents();
            });

            hubProxy.on("setBasketLength", (basketCount) => {
                console.log("Invoked setBasketLength", basketCount);
                setBascketLenght(basketCount);
            });

            hubProxy.on("checkForSolo", (orderGuid) => {
                setOrderGuid(orderGuid);
                setTimeout(() => {
                    hubProxy.invoke("confirmTheOrder", sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"), orderGuid).done(function (result) {
                        console.log(result);
                        if (result.Success === false) {
                            showNotification("danger", result.ErrorMessage);
                        } else {
                            console.log("Order confirmed", orderGuid);
                        }
                    });
                }, 2000);
            });


            hubProxy.on("sendingCanceled", () => {
                document.querySelector("#modalReadyToOrder").style.visibility = "hidden";
                document.querySelector("#modalDoneOrdering").style.visibility = "hidden";
                unblockTouchEvents();
            });

            hubProxy.on("orderSentNotification", () => {

                showNotification("success", `${t("lblmodalOrderIsSend")}`);

                setTimeout(() => {
                    document.querySelector("#modalDoneOrdering").style.visibility = "hidden";
                    unblockTouchEvents();
                }, 1000);


                paymentNextHandler();

                //todo MMO dali e potrebno ova voopsto?
                hubProxy.invoke("clearBasketData", sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"))
                    .done(function (result) {

                    }).fail(function (error) {
                        console.log(error, "Error happened while adding item to the basket");
                        showNotification("danger", "Something Went wrong");

                    });
            });

            hubProxy.on("closeInactiveTab", () => {
                // TODO function for Marko
                // setLoading(true); or setLoading(false); will toggle the <Loader /> Component like on the bottom of the  <home /> component on line 403
            });

            connection.connectionSlow(function () {
                console.log('We are currently experiencing difficulties with the connection.')
            });

            connection.disconnected(function () {
                setTimeout(function () {
                    var datetime = new Date();
                    connection.start({ transport: 'webSockets' }, function () {
                        hubProxy.invoke("joinGroup", sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"), localStorage.getItem("username")).done(function () {
                            hubProxy.invoke("getCurrentBasket");
                        });
                        console.log('Now reconnected, new connection ID=' + connection.id + " " + datetime);
                    })
                        .fail(function () { console.log('Could not connect'); });
                }, 5000);
            });

            connection.reconnected(function () {
                hubProxy.invoke("joinGroup", sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"), localStorage.getItem("username")).done(function () {
                    hubProxy.invoke("getCurrentBasket", sessionStorage.getItem("theParams"));
                });

                var datetime = new Date();
                console.log('Now reconNnected, connection ID=' + connection.id + " " + datetime);
            });

            connection.start({ transport: 'webSockets' }, function () {
                if (!openedConnection) {
                    hubProxy.invoke("joinGroup", sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"), localStorage.getItem("username")).done(function () {
                        hubProxy.invoke("getCurrentBasket", sessionStorage.getItem("theParams"));
                    });

                    var datetime = new Date();
                    console.log('Now connected, connection ID=' + connection.id + " " + datetime);
                    openedConnection = true;
                }
            })
                .fail(function () { console.log('Could not connect'); });
        } catch (error) {
            console.log(error + "Error in KartItemContext");
        }
    };

    const blockTouchEvents = () => {
        document.querySelector(".modal-empty-wrapper").style.pointerEvents = "all";
        document.querySelector("body").style.pointerEvents = "none";
    }

    const unblockTouchEvents = () => {
        document.querySelector(".modal-empty-wrapper").style.pointerEvents = "";
        document.querySelector("body").style.pointerEvents = "";
    }

    const sendDataToServer = async (data) => {
        // Demo mode: update cart locally without SignalR
        if (window.config?.APP_DEMO_MODE === true) {
            try {
                // Merge new items into existing cart
                let updatedCart = [...kartItem];
                data.forEach(newItem => {
                    const existingIndex = updatedCart.findIndex(item =>
                        item.ProductId === newItem.ProductId &&
                        JSON.stringify(item.selectedModifiersData) === JSON.stringify(newItem.selectedModifiersData)
                    );
                    if (newItem.quantity <= 0) {
                        // Remove item
                        if (existingIndex >= 0) {
                            updatedCart.splice(existingIndex, 1);
                        }
                    } else if (existingIndex >= 0) {
                        // Update quantity
                        updatedCart[existingIndex] = {
                            ...updatedCart[existingIndex],
                            quantity: updatedCart[existingIndex].quantity + newItem.quantity
                        };
                    } else {
                        // Add new
                        updatedCart.push(newItem);
                    }
                });
                setkartItem(updatedCart);
                setBascketLenght(updatedCart.reduce((sum, item) => sum + item.quantity, 0));
                localStorage.setItem("kaartData", JSON.stringify(updatedCart));
            } catch (error) {
                console.log(error);
            }
            return;
        }

        try {
            let jsonData = JSON.stringify(data);

            hubProxy.invoke("addQuantityViaSignalRForServer", jsonData, sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"))
                .done(function (result) {
                    if (result.Success === false) {
                        showNotification("warning", result.ErrorMessage);
                    }
                }).fail(function (error) {
                    console.log(error, "Error happened while adding item to the basket");
                    showNotification("danger", "Something Went wrong");
                });

        } catch (error) {
            console.log(error);
        }
    }

    const deleteProductBasket = async (data) => {
        if (window.config?.APP_DEMO_MODE === true) {
            return;
        }
        try {
            let jsonData = JSON.stringify(data);

            hubProxy.invoke("deleteProductBasket", jsonData, sessionStorage.getItem("theParams"), localStorage.getItem("deviceId"))
                .done(function (result) {
                }).fail(function (error) {
                    console.log(error, "Error happened while adding item to the basket");
                    showNotification("danger", "Something Went wrong");
                });

        } catch (error) {
            console.log(error);
        }
    }

    const addQuantityViaSignalR = (data) => {

        //send the order to the server
        let body = {
            data: data,
            idProduct: data?.ProductId,
            quantity: 1,
        };

        adminServices.postSignalR(body).then((resp) => {
            if (resp?.status === 200) {
                setvisibility(false)
                showNotification("success", "Objecthas been successfully send");
            } else {
                setvisibility(false);
                showNotification("danger", "Something Went wrong");
            }
        });
    };

    // __________________ End SignalR useEffect 

    const handleRecievedOrderClose = () => setRecievedOrder(false);
    // const handleRecievedOrderOpen = () => setRecievedOrder(true);

    const getResourcesWithParams = () => {
        setvisibility(true)
        let resourceFromParams = JSON.parse(sessionStorage.getItem("theParams"));
        setPath(resourceFromParams);
        setDefaultLang(CONSTANTDATA.LANGUAGE_CODE_NL);
        adminServices.getResourcesWithParams(resourceFromParams, deviceId).then((resp) => {
            if (resp) {
                // setLoading(false);
                setvisibility(false);
                // THEME
                setlogoHead(resp?.data?.ThemeResponse.LogoImage.Url);
                setActiveColor(resp?.data?.ThemeResponse?.ActiveColor);
                setActiveTheme(resp?.data?.ThemeResponse?.ThemeType);
                setServiceCallTheme(resp?.data?.ThemeResponse?.ServiceCallTheme);
                setBillTheme(resp?.data?.ThemeResponse?.BillTheme);
                setRestaurantName(resp?.data?.ThemeResponse?.RestaurantName);
                setShowPin(resp?.data?.ThemeResponse?.PaymentMethods?.Pin);
                setShowCash(resp?.data?.ThemeResponse?.PaymentMethods?.Cash);
                setShowQRpay(resp?.data?.ThemeResponse?.PaymentMethods?.QRCode);

                // setHistoryTheme(resp?.data?.ThemeResponse?.HistoryTheme);
                setOrderTheme(resp?.data?.ThemeResponse?.OrderTheme);
                // setAboutUsCover(resp?.data?.TMKData?[0].AdditionalItems?.Url)
                setLandingPage(resp?.data?.TMKData[0].CategoriesScreen?.PictureUrl)
                setAboutUsCover(resp?.data?.TMKData[0].AdditionalItems[0]?.ImagePath)
                setCategoriesScreenLayoutType(resp?.data?.TMKData[0].CategoriesScreen?.LayoutType)
                setCurrencyValue(
                    resp?.data?.ThemeResponse?.CurrencySettings?.CurrencySymbol
                );
                setCurrentLanguage(resp?.data?.ThemeResponse?.LanguagesList[0]?.Name);
                // setCurrentLanguageCode(resp?.data?.ThemeResponse?.LanguagesList[0]?.Locale);

                setAllLanguageList(resp?.data?.ThemeResponse?.LanguagesList);

                // As per  - 16 Aug 2022 - BackButton BG color update from BillTheme
                setDetailsBackButtonColor(
                    resp?.data?.ThemeResponse?.BillTheme?.HeaderBackgroundColor
                );

                // setlogoImage(resp?.data?.ThemeResponse.LogoImage.Url);
                setCoverImage(resp?.data?.ThemeResponse.CoverImage.Url)
                setActiveColor(resp?.data?.ThemeResponse?.ActiveColor);
                setActiveTheme(resp?.data?.ThemeResponse?.ThemeType);
                setHouseRules(resp?.data?.ThemeResponse?.LanguagesList[0]?.HouseRules?.Url);
                i18n.changeLanguage(`${currentLanguageCode}`)
                //root.style.setProperty('--background-color', resp?.data?.ThemeResponse?.ServiceCallTheme?.BackgroundColor);

                root.style.setProperty(
                    "--activeColor",
                    resp?.data?.ThemeResponse?.ActiveColor
                );

                // As per  - 16 Aug 2022 - Back Button arrow HeaderTextColor.
                root.style.setProperty(
                    "--arrowBackButtonColor",
                    resp?.data?.ThemeResponse?.BillTheme?.HeaderTextColor
                );

                // END THEME
                // setlogoImage(resp?.data?.ThemeResponse.LogoImage.Url);
                setserviceCall(resp?.data?.TMKData[defaultLang]?.ServiceCallsGroups);
                setsubCatIndex(
                    resp?.data?.TMKData[defaultLang].MainCategories[0].SubCategories[0]
                        .Products
                );
                // setSearchSubCatIndex(
                //   resp?.data?.TMKData[0].MainCategories[0].SubCategories[0].Products
                // );
                // setCategory(resp?.data?.TMKData[defaultLang]?.MainCategories);
                // setmenuHeader(resp?.data?.TMKData[defaultLang]?.MainCategories[0].Name);
                resp?.data?.TMKData[defaultLang]?.Screensaver?.Slides !== undefined
                    ? setslider(resp?.data?.TMKData[defaultLang]?.Screensaver?.Slides)
                    : setslider([]);
                let output = [];
                // let arr = [];
                for (
                    let index = 0;
                    index < resp?.data?.TMKData[defaultLang]?.MainCategories.length;
                    index++
                ) {
                    let startdateget = moment(new Date()).format(`YYYY:MM:DD`);
                    let startimeget =
                        resp?.data?.TMKData[defaultLang]?.MainCategories[index]
                            .AvailableFromTime;
                    let startdatearr = startdateget.split(":");
                    let starttimearr = startimeget.split(":");
                    let startfinal = startdatearr.concat(starttimearr);
                    let starttimestemp = new Date(
                        startfinal[0],
                        Number(startfinal[1]) - 1,
                        startfinal[2],
                        startfinal[3],
                        startfinal[4]
                    );
                    let enddateget = moment(new Date()).format("YYYY:MM:DD");
                    let endtimeget =
                        resp?.data?.TMKData[defaultLang]?.MainCategories[index]
                            .AvailableToTime;
                    let enddatearr = enddateget.split(":");
                    let endtimearr = endtimeget.split(":");
                    let endfinal = enddatearr.concat(endtimearr);
                    let endtimestemp = new Date(
                        endfinal[0],
                        Number(endfinal[1]) - 1,
                        endfinal[2],
                        endfinal[3],
                        endfinal[4]
                    );
                    if (
                        new Date(starttimestemp).valueOf() <= new Date().valueOf() &&
                        new Date().valueOf() <= new Date(endtimestemp).valueOf()
                    ) {
                        output.push(
                            resp?.data?.TMKData[defaultLang]?.MainCategories[index]
                        );
                    }
                    // output.push(resp?.data?.TMKData[1]?.MainCategories[index]);
                }
                if (output !== undefined) {
                    setindex(output);
                    setSearchSubCatIndex(output);
                }
                // banner work
                let bannerItemsArr = [];
                for (
                    let i = 0;
                    i < resp?.data?.TMKData[defaultLang]?.MainCategories.length;
                    i++
                ) {
                    let data = resp?.data?.TMKData[defaultLang]?.MainCategories[i];

                    for (let j = 0; j < data.SubCategories.length; j++) {
                        let productData = data.SubCategories[j];

                        for (let k = 0; k < productData.Products.length; k++) {
                            let bannerData = productData.Products[k];
                            if (bannerData.IsPromotion) {
                                bannerItemsArr.push(bannerData);
                            }
                        }
                    }
                }
                setBannerItems(bannerItemsArr);
            } else {
                setvisibility(false);
                showNotification("danger", "Something Went wrong");
            }
        });
    };

    useEffect(() => {
        filterAllergen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterID]);

    const filterAllergen = () => {
        let allergensNotExist = true;

        let filteredProducts = index?.map((mainCategories) => {
            return {
                ...mainCategories,
                SubCategories: mainCategories.SubCategories?.map((subCategory) => {
                    return {
                        ...subCategory,
                        Products: subCategory.Products.filter((product) => {
                            let menuItems = product.ProductDetails?.MenuItems;

                            if (menuItems && menuItems.length > 0) {
                                return menuItems.every((menuItem) => {
                                    if (menuItem.AllergensScreen) {
                                        let allergens = menuItem.AllergensScreen.Allergens;

                                        if (allergens && allergens.length > 0) {
                                            const hasFilteredAllergens = allergens.some((allergen) => {
                                                return filterID.includes(allergen.AllergenTypeId) && allergen.IsActive;
                                            });

                                            if (hasFilteredAllergens) {
                                                allergensNotExist = false;
                                                return false; // Exclude the product in the filter
                                            }
                                        }
                                    }

                                    return true; // Include the product
                                });
                            }

                            return true; // Include the product
                        }),
                    };
                }),
            };
        });

        setSearchSubCatIndex(filteredProducts);
        if (filterID.length === 0) { return; }
        if (allergensNotExist) {
            showNotification("info", "Products with those allergens are not included in the menu");
        } else {
            showNotification("info", "Products filtered successfully");
        }
    };


    const setIdToFilter = (ID) => {
        setfilterID(ID);
    }

    const filterCheckeduncheck = (data) => {
        //check
        filterID.includes(data) ? filterChecked(data) : setIdToFilter(data);
    };

    const filterChecked = (data) => {
        let filterItemIndex = filterID.indexOf(data);
        //find index and remove
        setfilterID([
            ...filterID.slice(0, filterItemIndex),
            ...filterID.slice(filterItemIndex + 1),
        ]);
    };

    const onModifireState = (data) => {
        setmodifiredState({ ...modifiredState, Price: + data.Price });
    };

    const getTotalQuantityInKaart = () => {
        let sum = 0;

        kartItem.forEach((num) => {
            sum += num.quantity;
        });
        return sum;
    };
    // // API END
    return <Context.Provider value={{
        arr,
        temp,
        hubProxy,
        closeTemp,
        quantityToKart,
        defaultLang,
        modifiredState,
        cartResetMode,
        orderHistory,
        activeColor,
        curentTime,
        index,
        activeTheme,
        adminServices,
        deviceId,
        logoHead,
        showPin,
        showCash,
        showQRpay,
        resetModifiers,
        inititalIndex,
        initialIndexTab,
        path,
        searchText,
        show,
        show1,
        currentLanguageCode,
        kartHistoryStore,
        searchSubCatIndex,
        bannerItems,
        addRemove,
        addRemoveIndex,
        billTheme,
        currencyValue,
        active,
        DescriptionData,
        discriptionTotal,
        detailsBackButtonColor,
        total,
        serviceCallTheme,
        serviceCall,
        allLanguageList,
        kartItem,
        orderTheme,
        tipTotal,
        note,
        recievedOrder,
        showFbLike,
        connection,
        paymentReceieved,
        minutes,
        loading,
        filterID,
        subCatIndex,
        seconds,
        moment,
        modifierSelectedTrue,
        visibility,
        requiredErrorMsg,
        activeCard,
        error,
        errorLabel,
        aboutUsCover,
        landingPage,
        isOpen,
        leftMenuIsOpen,
        categoriesScreenLayoutType,
        isOpenAllergens,
        isOpenLanguage,
        coverImage,
        nameValue,
        houseRules,
        secondScreen,
        orderGuid,
        waitGuestToConf,
        senderValue,
        numberOfRoudns,
        bascketLenght,
        showTimer,
        noDescription,
        activeCardBanner,
        noBannerDescription,
        errorModifiers,
        restaurantName,
        subTotalServiceFee,
        clickedCardId,
        setClickedCardId,
        setSubTotalServiceFee,
        setErrorModifiers,
        setNoBannerDescription,
        activeButtonBanner,
        noDetailsOpener,
        noDetailsBannerOpener,
        setNoDescription,
        setBascketLenght,
        setNumberOfRoudns,
        deleteProductBasket,
        blockTouchEvents,
        JoinTable,
        setOrderGuid,
        setHouseRules,
        setCoverImage,
        setSecondScreen,
        setNameValue,
        timeSetter,
        setIsOpenLanguage,
        setIsOpenAllergens,
        toggleLanguage,
        toggleAlergens,
        setCategoriesScreenLayoutType,
        closeallOpenedModals,
        toogleLeftMenu,
        toogleSubMenu,
        setIsOpen,
        setLandingPage,
        setAboutUsCover,
        setErrorLabel,
        setError,
        setsearchText,
        setShow1,
        setShow,
        setTotal,
        setSearchSubCatIndex,
        onModifireState,
        setDiscriptionTotal,
        setOrderHistory,
        getTotalQuantityInKaart,
        setDefaultLang,
        setvisibility,
        setKartHistoryStore,
        setTipTotal,
        t,
        setCartResetMode,
        setArr,
        setkartItem,
        setItemsOnTheKartHistory,
        togglePaymentReceievedModel,
        sethistoryTotal,
        setmodifiredState,
        setquantityToKart,
        getResourcesWithParams,
        setCurrentLanguage,
        setCurrentLanguageCode,
        setcurentTime,
        setPath,
        setPaymentReceived,
        handleRecievedOrderClose,
        setRecievedOrder,
        setshowFbLike,
        setinitialIndexTab,
        setinititalIndex,
        setsubCatIndex,
        setaddRemoveIndex,
        setAddRemove,
        filterAllergen,
        filterCheckeduncheck,
        filterChecked,
        setMinutes,
        setSeconds,
        setShowTimer,
        setfilterID,
        setModifierSelectedTrue,
        setDescriptionData,
        setdisplayTotalForBottomPopup,
        addQuantityViaSignalR,
        setConnection,
        setHubProxy,
        sendDataToServer,
        activeButton,
        setActiveCard,
        calculateHistoryTotalAmount,
        paymentNextHandler

    }} > {children}</Context.Provider>
}

