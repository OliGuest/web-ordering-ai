import React, { useEffect, useState, useRef } from "react";
import * as adminServices from "../../services/adminService";
import showNotification from "../../services/notificationService";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import moment from "moment";
import { Modal } from "react-bootstrap";
import ModifiresList from "./Modifires";
import { CONSTANTDATA } from "../../global/constant";
import DescriptionItem from "./descriptionItem";
import Endofthelist from "../../assets/img/Endofthelist.png";
import ReactFBLike from 'react-fb-like';

import CartList from './cartList';
import Loader from "../common/Loader";

import { useTranslation } from "react-i18next";

import ServiceBar from './components/ServiceBar/ServiceBar';
import LanguageBar from './components/LanguageBar/LanguageBar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import { GridIcon, ListIcon, HistoryIcon, BellIcon, CartIcon, CloseIcon } from './components/Icons';

const root = document.documentElement;

let closeTemp = false;
let arr = [];
let newTempHistoryData = [];
let temp = [];
const FILTERCONSTANTS = {
  GLUTTEN: 1,
  CRUSTACEANS: 2,
  EGGS: 3,
  FISH: 4,
  PEANUTS: 5,
  SOYBEANS: 6,
  MILK: 7,
  NUTS: 8,
  CELERY: 9,
  MUSTARD: 10,
  SESAMESEEDS: 11,
  SULPHURDIOXIDEANDSULPHITES: 12,
  LUPIN: 13,
  MOLLUSCS: 14,
};
let tempArr = [];
let kartHistoryStore = [];

/**
 * Helper to strip HTML tags and return plain text.
 * Replaces all jQuery(html).text() calls.
 */
const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const Home = (props) => {
  const { t, i18n } = useTranslation();

  const resetModifiers = useRef(null);
  const tabClickActiveRef = useRef(false);

  const [Category, setCategory] = useState();
  const [curentTime, setcurentTime] = useState();
  const [menuHeader, setmenuHeader] = useState();
  const [slideImages, setslider] = useState([]);
  const [inititalIndex, setinititalIndex] = useState(0);
  const [subCatIndex, setsubCatIndex] = useState([]);
  const [searchSubCatIndex, setsearchSubCatIndex] = useState();
  const [visibility, setvisibility] = useState(true);
  const [serviceCall, setserviceCall] = useState([]);
  const [logoImage, setlogoImage] = useState();
  const [active, setactive] = useState(true);
  const [quantityClass, setQuantityclass] = useState();
  const [detailsBackButtonColor, setDetailsBackButtonColor] = useState();

  const [active1, setactive1] = useState(true);
  const [quantityToKart, setquantityToKart] = useState(1);
  const [index, setindex] = useState([]);
  const [addRemove, setAddRemove] = useState(false);
  const [addRemoveIndex, setaddRemoveIndex] = useState();
  const [displayTotalForBottomPopup, setdisplayTotalForBottomPopup] =
    useState();
  const [filterID, setfilterID] = useState([]);
  const [kartItem, setkartItem] = useState([]);
  const [searchText, setsearchText] = useState();
  const [productPriceArray, setproductPriceArray] = useState();
  const [path, setpath] = useState(
    JSON.parse(localStorage.getItem("theParams"))
  );
  const [DescriptionData, setDescriptionData] = useState();
  const [initialIndexTab, setinitialIndexTab] = useState(0);
  const [deviceId, setDeviceid] = useState(localStorage?.getItem("deviceId"));
  const [logoHead, setlogoHead] = useState();
  const [total, setTotal] = useState(0);

  const [tipTotal, setTipTotal] = useState(0);
  const [bannerItems, setBannerItems] = useState([]);
  const [timer, setTimer] = useState(10);
  const [menuToggle, setmenuToggle] = useState(true);
  const [show, setShow] = useState(false);
  const [paymentReceieved, setPaymentReceived] = useState(false);
  const [recievedOrder, setRecievedOrder] = useState(false);
  const [itemsOnTheHistory, setItemsOnTheKartHistory] = useState([]);

  const [historyTotal, sethistoryTotal] = useState(0.0);
  const [modifiredState, setmodifiredState] = useState([]);
  const [discriptionTotal, setDiscriptionTotal] = useState(0);

  const [defaultLang, setDefaultLang] = useState(localStorage?.getItem("languageIndex") ? localStorage?.getItem("languageIndex") : CONSTANTDATA.LANGUAGE_CODE_NL);
  const [currentLanguage, setCurrentLanguage] = useState("");

  const [currentLanguageCode, setCurrentLanguageCode] = useState(localStorage?.getItem("currentLanguageCodeStore") ? localStorage?.getItem("currentLanguageCodeStore") : 'nl');
  const [allLanguageList, setAllLanguageList] = useState("");

  const [note, setNote] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);

  const [requiredErrorMsg, setRequiredErrorMsg] = useState("");
  const [modifierSelectedTrue, setModifierSelectedTrue] = useState([]);

  const [activeColor, setActiveColor] = useState();
  const [activeTheme, setActiveTheme] = useState();
  const [serviceCallTheme, setServiceCallTheme] = useState();
  const [billTheme, setBillTheme] = useState();
  const [historyTheme, setHistoryTheme] = useState();
  const [orderTheme, setOrderTheme] = useState();

  const [display, setDisplay] = useState(false);
  const [show1, setShow1] = useState(false);
  const [currencyValue, setCurrencyValue] = useState("");
  const [showModalHandler, SetShowModalHandler] = useState(false);
  const [showFbLike, setshowFbLike] = useState(false);

  const [loading, setLoading] = useState(false);

  // New React state replacing jQuery body class toggles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState(null);
  const [showEndOfList, setShowEndOfList] = useState(false);

  // Countdown timer state (replaces jQuery .js-timeout html manipulation)
  const [countdown, setCountdown] = useState("00:10");

  const handleClose = () => { setShow(false); };
  const handleShow = () => {
    if (showModalHandler) { setShow(false); } else {
      setShow(true);
    }
  };

  const togglePaymentReceievedModel = () => {
    setPaymentReceived(false);
  };
  const handleRecievedOrderClose = () => setRecievedOrder(false);
  const handleRecievedOrderOpen = () => setRecievedOrder(true);

  const [cartResetMode, setCartResetMode] = useState("NORMAL");

  // Handle popstate (back button)
  useEffect(() => {
    const handlePopstate = () => {
      if (isDetailOpen) {
        setIsCartOpen(true);
      }
      // Clean up bootstrap modal artifacts
      document.body.classList.remove("modal-open");
      let backdropElem = document.getElementsByClassName("modal-backdrop")[0];
      if (backdropElem) {
        backdropElem.classList.remove("modal-backdrop");
      }
    };

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isDetailOpen]);

  const modalClose = () => {
    document.getElementById("modalEmpty").style.visibility = "hidden";
  };

  // Load resources on mount and language change
  useEffect(() => {
    getResourcesData();

    const clockInterval = setInterval(() => {
      var today = new Date(),
        todaytime = today.getHours() + ":" + today.getMinutes();
      setcurentTime(todaytime);
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [defaultLang]);

  const getThemeResponses = () => {
    adminServices.getResources().then((resp) => {
      if (resp) {
        // placeholder
      }
    });
  };

  // Scroll-based tab activation (replaces jQuery $(document).ready scroll handler)
  useEffect(() => {
    const container = document.querySelector('.order-list-body');
    if (!container) return;

    const handleScroll = () => {
      if (tabClickActiveRef.current) return;
      const topMenu = document.getElementById('top-menu');
      if (!topMenu) return;
      const topMenuHeight = topMenu.offsetHeight + 15;

      const sections = container.querySelectorAll('[id^="menu-list-wrapper-"]');
      let currentId = null;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.top - containerRect.top <= topMenuHeight + rect.height / 3) {
          currentId = section.id.replace('menu-list-wrapper-', '');
        }
      });

      if (currentId) {
        setActiveTabId(currentId);
        const tabEl = document.getElementById('clickTab_' + currentId);
        if (tabEl) tabEl.scrollIntoView({ block: 'nearest', inline: 'center' });
        setShowEndOfList(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [index, inititalIndex]);

  // Auto-close qty-open after 7 seconds
  useEffect(() => {
    if (addRemove && addRemoveIndex !== undefined) {
      const timer = setTimeout(() => {
        setaddRemoveIndex(undefined);
        setAddRemove(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [addRemove, addRemoveIndex]);

  // Handle tab click with smooth scroll
  const handleTabClick = (subCategoryId) => {
    tabClickActiveRef.current = true;
    setActiveTabId(subCategoryId);

    const container = document.querySelector('.order-list-body');
    const target = document.getElementById('menu-list-wrapper-' + subCategoryId);
    const topMenu = document.getElementById('top-menu');
    if (container && target && topMenu) {
      container.scrollTo({
        top: container.scrollTop + target.getBoundingClientRect().top - topMenu.getBoundingClientRect().bottom,
        behavior: 'smooth'
      });
    }

    // Clear the tab-click lock after scroll settles
    setTimeout(() => {
      tabClickActiveRef.current = false;
    }, 800);
  };

  function clearIntervalFun() {
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  }

  // get kartdata from local storage
  useEffect(() => {
    let kartItem = JSON.parse(localStorage.getItem("kaartData"));
    let kartHistory = JSON.parse(localStorage.getItem("kaartHistory"));

    if (kartItem) {
      setkartItem(kartItem);
      calculateTotalCartAmount(kartItem);
    } else {
      setkartItem([]);
    }
    if (kartHistory) {
      setItemsOnTheKartHistory(kartHistory);
      calculateHistoryTotalAmount(kartHistory);
    } else {
      setItemsOnTheKartHistory([]);
    }
  }, []);

  useEffect(() => {
    kartHistoryStore = JSON.parse(localStorage.getItem("kaartHistory"));
  }, [orderHistory]);

  const setState = () => {
    setactive(!active);
  };

  const getResourcesData = () => {
    setLoading(true);

    adminServices.getResources().then((resp) => {
      if (resp) {
        setLoading(false);
        setvisibility(false);

        // THEME
        setlogoHead(resp?.data?.ThemeResponse.LogoImage.Url);
        setActiveColor(resp?.data?.ThemeResponse?.ActiveColor);
        setActiveTheme(resp?.data?.ThemeResponse?.ThemeType);
        setServiceCallTheme(resp?.data?.ThemeResponse?.ServiceCallTheme);
        setBillTheme(resp?.data?.ThemeResponse?.BillTheme);
        setHistoryTheme(resp?.data?.ThemeResponse?.HistoryTheme);
        setOrderTheme(resp?.data?.ThemeResponse?.OrderTheme);
        setCurrencyValue(resp?.data?.ThemeResponse?.CurrencySettings?.CurrencySymbol);
        setCurrentLanguage(resp?.data?.ThemeResponse?.LanguagesList[0]?.Name);
        setAllLanguageList(resp?.data?.ThemeResponse?.LanguagesList);

        // BackButton BG color update from BillTheme
        setDetailsBackButtonColor(
          resp?.data?.ThemeResponse?.BillTheme?.HeaderBackgroundColor
        );

        root.style.setProperty('--activeColor', resp?.data?.ThemeResponse?.ActiveColor);
        root.style.setProperty('--arrowBackButtonColor', resp?.data?.ThemeResponse?.BillTheme?.HeaderTextColor);

        // END THEME

        setlogoImage(resp?.data?.ThemeResponse.LogoImage.Url);
        setserviceCall(resp?.data?.TMKData[defaultLang].ServiceCallsGroups);
        setsubCatIndex(
          resp?.data?.TMKData[defaultLang].MainCategories[0].SubCategories[0]
            .Products
        );
        setCategory(resp?.data?.TMKData[defaultLang]?.MainCategories);
        setmenuHeader(resp?.data?.TMKData[defaultLang]?.MainCategories[0].Name);

        {
          resp?.data?.TMKData[defaultLang]?.Screensaver?.Slides !== undefined
            ? setslider(resp?.data?.TMKData[defaultLang]?.Screensaver?.Slides)
            : setslider([]);
        }

        let output = [];
        let arr = [];

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
        }
        if (output !== undefined) {
          setindex(output);
          setsearchSubCatIndex(output);
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

  const indexClick = (index, data) => {
    setinitialIndexTab(index);
    setTimeout(() => {
      setsubCatIndex([]);
    }, 100);
    setTimeout(() => {
      setsubCatIndex(data);
      setaddRemoveIndex(-1);
    }, 200);
    setsearchSubCatIndex(data);
    setsearchText("");
  };

  const ClickSubmenuFromDrawer = (
    indexSub,
    SubCatdata,
    data,
    index,
    mapData
  ) => {
    setinitialIndexTab(indexSub);

    // Close the sidebar drawer
    setIsMenuOpen(false);
    setinititalIndex(index);

    setTimeout(() => {
      setsubCatIndex([]);

      // Scroll to the subcategory section
      setActiveTabId(mapData.SubCategoryId);
      const container = document.querySelector('.order-list-body');
      const scrollTo = document.getElementById('menu-list-wrapper-' + mapData.SubCategoryId);
      const topMenu = document.getElementById('top-menu');

      if (container && scrollTo && topMenu) {
        container.scrollTo({
          top: container.scrollTop + scrollTo.getBoundingClientRect().top - topMenu.getBoundingClientRect().bottom,
          behavior: 'smooth'
        });
      }
    }, 100);

    setTimeout(() => {
      setsubCatIndex(SubCatdata);
      setaddRemoveIndex(-1);
    }, 200);

    setsearchText("");
  };

  let searchResult;
  const menuItemClick = (index, data) => {
    // Close the sidebar drawer
    setIsMenuOpen(false);
    setinititalIndex(index);
    setsubCatIndex(data?.SubCategories[0].Products);
  };

  const searchdata = (text) => {
    let searchdata = index;

    searchResult = index?.map((mainCategories) => {
      return {
        ...mainCategories,
        SubCategories: mainCategories.SubCategories?.map((item) => {
          return {
            ...item,
            Products: item.Products.filter((product) =>
              product.Name.toLowerCase().includes(text.toLowerCase())
            ),
          };
        }),
      };
    });
    setsearchSubCatIndex(searchResult);
  };

  const filterChecked = (data) => {
    let filterItemIndex = filterID.indexOf(data);
    setfilterID([
      ...filterID.slice(0, filterItemIndex),
      ...filterID.slice(filterItemIndex + 1),
    ]);
    filterAllergen();
  };

  const filterCheckeduncheck = (data) => {
    filterID.includes(data)
      ? filterChecked(data)
      : setfilterID([...filterID, data]);
    filterAllergen();
  };

  const addClassToAddQuantity = (data) => {
    setaddRemoveIndex(data);
    setAddRemove(true);
  };

  const onModifireState = (data) => {
    setmodifiredState(data);
  };

  /** Check Modifier Selected */
  const getSelectedModifierItem = (data) => {
    var lastVal = modifierSelectedTrue;
    lastVal.push(data);
    setModifierSelectedTrue(lastVal);
  };

  let tempReturn = false;

  function areEqual(arr1, arr2) {
    let n = arr1.length;
    let m = arr2.length;
    if (n != m) return false;
    for (let i = 0; i < n; i++)
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
    return true;
  }

  let flag = false;

  const addQuantityAndRemoveClass = (data) => {
    var selectedModifierIds = [];
    var selectedModifierIdOtherPos = 0;
    var isRequiredTrue = false;
    var requiredModifiersName = " ";

    // get selected Modifeirs ids
    if (data?.ModifierWizards) {
      var AllModifierWizards = data?.ModifierWizards;

      AllModifierWizards?.map((modif) => {
        if (modif?.IsMandatory) {
          if (modifierSelectedTrue.includes(modif.ModifierId)) {
          } else {
            isRequiredTrue = true;
            requiredModifiersName += modif?.Title + "\n";
          }
        }
      });
    }

    if (isRequiredTrue) {
      document.getElementById("modalEmpty").style.visibility = "visible";
      return;
    }

    // Read modifiers from the DOM using standard JS (replaces jQuery .modifiersbox.each)
    var selectedModifiers = [];
    var checkAnyRadioButtonSelected = 0;

    document.querySelectorAll('.modifiersbox:checked').forEach(el => {
      selectedModifiers.push({
        mModifiersWizardId: el.getAttribute('mdata-modifierswizardid'),
        mIdOtherPos: el.getAttribute('mdata-idotherpos'),
        mProductId: el.getAttribute('mdata-productid'),
        mPrice: el.getAttribute('mdata-price'),
        mName: el.getAttribute('mdata-name'),
      });
    });

    // end

    var dataAddToCart = data;

    let modIndex;
    // quantitiy to
    if (quantityToKart !== "" && quantityToKart > 0) {
      let finddata = kartItem.find((item) => item.ProductId === data.ProductId);

      if (finddata) {
        let findIndex = kartItem.indexOf(finddata);
        let isSelectionExist = false;
        let existingMod = false;

        if (finddata?.selectedModifiersData) {
          let currentSelection = selectedModifiers;
          let prevSelection = [];
          let flag = false;

          for (let i = 0; i < kartItem.length; i++) {
            if (kartItem[i]?.selectedModifiersData) {
              isSelectionExist = areEqual(
                kartItem[i]?.selectedModifiersData.flat(),
                selectedModifiers.flat()
              );

              if (isSelectionExist) {
                let existingKArtItemdata = [
                  ...kartItem.slice(0, i),
                  {
                    ...data,
                    quantity: quantityToKart,
                    selectedModifiersData: selectedModifiers,
                    modifierPrice: selectedModifiers.map((obj) => {
                      return parseFloat(obj.mPrice);
                    }),
                  },
                  ...kartItem.slice(i + 1),
                ];

                setkartItem(existingKArtItemdata);
                calculateTotalCartAmount(existingKArtItemdata);
                localStorage.setItem(
                  "kaartData",
                  JSON.stringify(existingKArtItemdata)
                );
                break;
              } else {
                let addKartItemforNonMod = [
                  {
                    ...finddata,
                    quantity: quantityToKart,
                    selectedModifiersData: selectedModifiers,
                    modifierPrice: selectedModifiers.map((obj) => {
                      return parseFloat(obj.mPrice);
                    }),
                  },
                  ...kartItem,
                ];

                setkartItem(addKartItemforNonMod);
                calculateTotalCartAmount(addKartItemforNonMod);
                localStorage.setItem(
                  "kaartData",
                  JSON.stringify(addKartItemforNonMod)
                );
              }
            }
          }
        }
      } else {
        // otherwise add new
        dataAddToCart.quantity = quantityToKart;
        dataAddToCart.basePrice = dataAddToCart.Price;
        dataAddToCart.modifierPrice = selectedModifiers?.map((obj) => {
          return parseFloat(obj.mPrice);
        });
        dataAddToCart.selectedModifierIdOtherPos = selectedModifierIdOtherPos;
        dataAddToCart.selectedModifiersData = selectedModifiers;

        let saveKartItem = [{ ...dataAddToCart }, ...kartItem];

        setkartItem(saveKartItem);
        calculateTotalCartAmount(saveKartItem);

        localStorage.setItem("kaartData", JSON.stringify(saveKartItem));
      }

      setTimeout(function () {
        setaddRemoveIndex(undefined);
        setquantityToKart(1);
        setAddRemove(false);
      }, 1000);

      // open cart - via React state
      setIsCartOpen(true);
      setIsDetailOpen(false);

      //changed for radio button if clicked again it shows one value checked but not showing price so changed
      setDiscriptionTotal(0);
    }
  };

  /**
   *  End Add to cart
   **/

  const addQuantity = (data) => {
    setquantityToKart(quantityToKart + 1);
    setdisplayTotalForBottomPopup((quantityToKart + 1) * data?.Price);
  };

  const minusQuantity = (data) => {
    if (quantityToKart === 1) {
      setquantityToKart(1);
    } else {
      setquantityToKart(quantityToKart - 1);
      setdisplayTotalForBottomPopup((quantityToKart - 1) * data);
    }
  };

  const removeProductFromKArt = (data, index) => {
    const reducedArr = [...productPriceArray];
    reducedArr.splice(index, 1);
  };

  //adding quanting to kart items
  const addQuantityKArt = (data) => {
    if (kartItem.length > 0) {
      let finddata = kartItem.find((item) => item === data);
      let newIndex = kartItem.indexOf(finddata);
      let kartItemAdd = [];
      kartItemAdd = [
        ...kartItem.slice(0, newIndex),
        { ...kartItem[newIndex], quantity: data.quantity + 1 },
        ...kartItem.slice(newIndex + 1),
      ];
      setkartItem(kartItemAdd);
      localStorage.setItem("kaartData", JSON.stringify(kartItem));
      calculateTotalCartAmount(kartItemAdd);
    } else {
      let nfinddata = kartHistoryStore.find(
        (item) => item.ProductId == data.ProductId
      );
      let nindex = kartHistoryStore?.indexOf(nfinddata);
      kartHistoryStore[nindex].quantity = kartHistoryStore[nindex].quantity + 1;
      localStorage.setItem("kaartHistory", JSON.stringify(kartHistoryStore));
      calculateTotalCartAmount(kartHistoryStore);
    }
  };

  const minusQuantityKart = (data) => {
    if (kartItem.length > 0) {
      let finddata = kartItem.find((item) => item === data);
      let newIndex = kartItem.indexOf(finddata);
      let kaartItemArr = [];
      if (kartItem[newIndex] !== undefined) {
        if (
          kartItem[newIndex] !== undefined &&
          kartItem[newIndex].quantity === 1
        ) {
          kaartItemArr = [
            ...kartItem.slice(0, newIndex),
            ...kartItem.slice(newIndex + 1),
          ];
        } else {
          kaartItemArr = [
            ...kartItem.slice(0, newIndex),
            { ...kartItem[newIndex], quantity: data.quantity - 1 },
            ...kartItem.slice(newIndex + 1),
          ];
        }

        arr = kaartItemArr;
        setkartItem(kaartItemArr);
        calculateTotalCartAmount(kaartItemArr);

        localStorage.setItem("kaartData", JSON.stringify(kartItem));
      }
    } else {
      let nfinddata = kartHistoryStore.find(
        (item) => item.ProductId == data.ProductId
      );
      let nNewindex = kartHistoryStore.indexOf(nfinddata);

      if (kartHistoryStore[nNewindex] !== undefined) {
        if (
          kartHistoryStore[nNewindex] !== undefined &&
          kartHistoryStore[nNewindex].quantity === 1
        ) {
          kartHistoryStore = [
            ...kartHistoryStore.slice(0, nNewindex),
            ...kartHistoryStore.slice(nNewindex + 1),
          ];
          localStorage.setItem(
            "kaartHistory",
            JSON.stringify(kartHistoryStore)
          );
        } else {
          kartHistoryStore = [
            ...kartHistoryStore.slice(0, nNewindex),
            { ...kartHistoryStore[nNewindex], quantity: data.quantity - 1 },
            ...kartHistoryStore.slice(nNewindex + 1),
          ];
          localStorage.setItem(
            "kaartHistory",
            JSON.stringify(kartHistoryStore)
          );
        }

        calculateTotalCartAmount(kartHistoryStore);
        setItemsOnTheKartHistory(kartHistoryStore);
      }
    }
  };

  const sendServiceRequest = (data) => {
    let body = {
      idMessage: data?.Id,
      messageUuid: data?.MessageUuid,
    };

    setLoading(true);

    adminServices.postService(path, deviceId, body).then((resp) => {
      if (resp?.status === 200) {
        setLoading(false);
        showNotification("success", "Service has been successfully send");
      } else {
        setLoading(false);
        setvisibility(false);
        showNotification("danger", "Something Went wrong");
      }
    });
  };

  //func for edit details
  const menuWarapperNew = (data, index) => {
    setquantityToKart(data.quantity);
    if (data?.ProductDetails?.MenuItems.length > 0) {
      setDescriptionData(data);
      setIsDetailOpen(true);
    } else {
      addClassToAddQuantity(index);
    }
  };

  const menuWarapper = (data, index) => {
    // set Blank - during selection of other product : because reset -Required Modifire check
    setModifierSelectedTrue([]);
    setquantityToKart(1);

    if (data?.ProductDetails?.MenuItems.length > 0) {
      setDescriptionData(data);
      setIsDetailOpen(true);
    } else {
      addClassToAddQuantity(data.ProductId);
    }
  };

  const menuWarapper_next = (data, index) => {
    setquantityToKart(1);
    addClassToAddQuantity(data?.ProductId);
  };

  const calculateTotalCartAmount = (kartItem) => {
    let sum = 0;
    kartItem?.forEach(
      (item) => {
        let modifierPrice = (item.quantity * item?.modifierPrice.length ? item?.modifierPrice?.reduce((partialSum, a) => partialSum + a, 0) : 0);
        let tot = Number((item?.basePrice ? (item.quantity * item?.basePrice) : (item.quantity * item?.Price)) + modifierPrice);
        (sum += tot);
      }
    );
    setTotal(sum.toFixed(2));
  };

  const calculateHistoryTotalAmount = (kartItem) => {
    let sum = 0;
    kartItem.forEach((item) => (sum += Number(item?.quantity * item?.Price)));
    sethistoryTotal(sum.toFixed(2));
  };

  const handleTipAddClick = (e, tipValue) => {
    e.preventDefault();
    let sum = 0;
    switch (tipValue) {
      case 1:
        sum = parseFloat(tipTotal) + parseFloat(1);
        setTipTotal(sum.toFixed(2));
        break;
      case 20:
        sum = parseFloat(tipTotal) + parseFloat(0.2);
        setTipTotal(sum.toFixed(2));
        break;
      case 50:
        sum = parseFloat(tipTotal) + parseFloat(0.5);
        setTipTotal(sum.toFixed(2));
        break;
      default:
        break;
    }
  };

  const handleTipMinusClick = (e) => {
    if (tipTotal > 0.0) {
      if (tipTotal === parseFloat(0.2)) {
        setTipTotal(0.0);
      } else {
        setTipTotal(
          (parseFloat(Math.round(tipTotal)) - parseFloat(1)).toFixed(2)
        );
      }
    }
  };

  // Countdown using React state (replaces jQuery .js-timeout html manipulation)
  const countdownIntervalRef = useRef(null);

  function startCountdown() {
    setCountdown("00:10");
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        const parts = prev.split(":");
        let minutes = parseInt(parts[0]) || 0;
        let seconds = parseInt(parts[1]) || 0;
        seconds -= 1;
        if (minutes < 0) return prev;
        if (seconds < 0 && minutes !== 0) {
          minutes -= 1;
          seconds = 59;
        } else if (seconds < 0) {
          clearInterval(countdownIntervalRef.current);
          return "0:00";
        }
        const secStr = seconds < 10 ? "0" + seconds : "" + seconds;
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdownIntervalRef.current);
        }
        return minutes + ":" + secStr;
      });
    }, 1000);

    // Also handle popstate clearing
    const clearOnPop = () => {
      clearInterval(countdownIntervalRef.current);
      window.removeEventListener("popstate", clearOnPop);
    };
    window.addEventListener("popstate", clearOnPop);
  }

  //place order
  const placeOrderHandler = () => {
    if (kartItem && kartItem.length > 0) {
      setCartResetMode("NORMAL");
      let body = {
        OrderGuid: uuid(),
        SessionGuid: path?.validation,
        Items: kartItem?.map((item, index) => {
          return {
            Item: {
              id: item?.ProductId,
              PluCode: item.ProductDetails?.IdOtherPos,
            },
            Modifiers:
              item?.ModifierWizards && item?.ModifierWizards?.length > 0
                ? item?.selectedModifiersData?.map((data, index) => {
                  return {
                    ModifierGroupId: data?.mModifiersWizardId,
                    Id: data?.mProductId,
                    PluCode: data?.mIdOtherPos,
                  };
                })
                : [],
            Quantity: item?.quantity,
            ItemGuid: uuid(),
            CoursePosition: 1,
            Note: note.length > 0 ? note : "",
          };
        }),
      };
      adminServices.postOrder(path, deviceId, body).then((res) => {
        if (res?.data?.IsSuccess === true) {
          paymentNextHandler();
          setshowFbLike(false);

          setRecievedOrder(true);
          startCountdown();
          if (!closeTemp) {
            setTimeout(function () {
              handleShow();
            }, 11300);
          }
        } else {
          showNotification("danger", "can't send request at this moment");
        }
      });
    } else {
      setCartResetMode("HISTORY");
      postHistoryOrder();
    }
  };

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const postHistoryOrder = () => {
    setCartResetMode("HISTORY");
    let kartHistory = JSON.parse(localStorage.getItem("kaartHistory"));
    let body = {
      OrderGuid: uuid(),
      SessionGuid: path?.validation,
      Items: kartHistory?.map((item, index) => {
        return {
          Item: {
            id: item?.ProductId,
            PluCode: item.ProductDetails?.IdOtherPos,
          },
          Modifiers:
            item?.ModifierWizards && item?.ModifierWizards?.length > 0
              ? item?.selectedModifiersData?.map((data, index) => {
                return {
                  ModifierGroupId: data?.mModifiersWizardId,
                  Id: data?.mProductId,
                  PluCode: data?.mIdOtherPos,
                };
              })
              : [],
          Quantity: item?.quantity,
          ItemGuid: uuid(),
          CoursePosition: 1,
          Note: note.length > 0 ? note : "",
        };
      }),
    };

    if (kartHistory && kartHistory?.length > 0) {
      adminServices.postOrder(path, deviceId, body).then((res) => {
        if (res?.data?.IsSuccess === true) {
          setRecievedOrder(true);
          setCartResetMode("HISTORY");
          startCountdown();
          setTimeout(function () {
            handleShow();
          }, 11300);
        } else {
          showNotification("danger", "Something went wrong ");
        }
      });
    } else {
      showNotification("danger", "no order found ");
    }
  };

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const paymentNextHandler = (MODE = "") => {
    handleClose();
    togglePaymentReceievedModel();
    resetCartToInitialMode();
  };

  const clearPreviousSteps = () => {
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    togglePaymentReceievedModel();
    handleClose();
    setRecievedOrder(false);
    setCountdown("00:05");
  };

  const resetCartToInitialMode = () => {
    if (cartResetMode == "HISTORY") {
      setItemsOnTheKartHistory([]);
      localStorage.removeItem("kaartHistory");
    } else {
      arr = [];
      kartItem?.map((data) => {
        temp.push(data);
      });
      localStorage.setItem("kaartHistory", JSON.stringify(temp));
      setItemsOnTheKartHistory(kartItem);
      calculateHistoryTotalAmount(kartItem);
      localStorage.removeItem("kaartData");
      setkartItem([]);
      kartHistoryStore = JSON.parse(localStorage.getItem("kaartHistory"));
    }
    setTipTotal(0.0);
  };

  const getProductQuantityInCart = (data) => {
    let qunatityToDisplay = kartItem.find(
      (kartItem) => kartItem?.ProductId === data?.ProductId
    )?.quantity;
    return qunatityToDisplay ? qunatityToDisplay : "";
  };

  //get banner items according to categories
  const getBannerItemsAccToCategories = () => {
    const result = bannerItems.filter((banner) =>
      subCatIndex.find(
        (catgory) => catgory?.SubCategoryId === banner?.SubCategoryId
      )
        ? true
        : false
    );
    return result;
  };

  // build modifired wizard list
  const calculateTotalAccToWizard = (selectedModifierItemElements) => {
    let sum = 0;
    selectedModifierItemElements.forEach((modifire) => {
      modifire.ModifierItemElements.forEach((item) => {
        if (item?.selected) {
          sum += item?.Price;
        }
      });
    });
    setDiscriptionTotal(sum);
  };

  /**
   * Showing total quantity - on Footer Bluebar
   */
  const getTotalQuantityInKaart = () => {
    let sum = 0;
    kartItem.forEach((num) => {
      sum += num.quantity;
    });
    return sum;
  };

  const checkAvailablityTimesOfProducts = ({
    AvailableFromTime,
    AvailableToTime,
  }) => {
    var format = "HH:mm";
    const current_time_24 = moment(new Date()).format("HH:mm");
    var time = moment(current_time_24, format),
      beforeTime = moment(AvailableFromTime, format),
      afterTime = moment(AvailableToTime, format);
    if (time.isBetween(beforeTime, afterTime)) {
      return true;
    } else {
      return false;
    }
  };

  const filterAllergen = () => {
    let filterdProducts = index?.map((mainCategories) => {
      return {
        ...mainCategories,
        SubCategories: mainCategories.SubCategories?.map((subCategory) => {
          return {
            ...subCategory,
            Products: subCategory.Products.filter((product) => {
              let menuItems = product.ProductDetails?.MenuItems;
              if (menuItems.length > 0) {
                for (let i = 0; i < menuItems.length; i++) {
                  if (menuItems[i]?.AllergensScreen) {
                    let allergens = menuItems[i].AllergensScreen.Allergens;
                    for (let j = 0; j < allergens.length; j++) {
                      for (let k = 0; k < filterID.length; k++) {
                        if (
                          parseInt(filterID[k]) === allergens[j].AllergenType &&
                          allergens[j].IsActive
                        ) {
                          return false;
                        } else {
                          return true;
                        }
                      }
                    }
                  } else {
                    return true;
                  }
                }
              } else {
                return true;
              }
            }),
          };
        }),
      };
    });
    setsearchSubCatIndex(filterdProducts);
  };

  const removeProductFromCart = (productId) => {
    if (kartItem && kartItem.length > 0) {
      let removeIndex = kartItem?.findIndex(
        (item) => item?.ProductId === productId
      );
      setmodifiredState([]);
      if (removeIndex !== -1) {
        let updatedArr = [
          ...kartItem.slice(0, removeIndex),
          ...kartItem.slice(removeIndex + 1),
        ];
        arr = [...updatedArr];
        setkartItem(updatedArr);
        calculateTotalCartAmount(updatedArr);
        localStorage.setItem("kaartData", JSON.stringify(updatedArr));
      }
    } else {
      let removeIndex = kartHistoryStore?.findIndex(
        (item) => item?.ProductId === productId
      );
      setmodifiredState([]);
      if (removeIndex !== -1) {
        let updatedArr = [
          ...kartHistoryStore.slice(0, removeIndex),
          ...kartHistoryStore.slice(removeIndex + 1),
        ];
        kartHistoryStore = [...updatedArr];
        calculateTotalCartAmount(updatedArr);
        localStorage.setItem("kaartHistory", JSON.stringify(updatedArr));
      }
    }
  };

  {
    /**to get history details */
  }
  const getOrderHistoryDetails = () => {
    adminServices.getOrderHistory(path, deviceId).then((res) => {
      if (res?.data?.IsSuccess === true) {
        setOrderHistory(res?.data?.Data);
      } else {
        setOrderHistory([]);
      }
    });
  };

  // getting array of object from the api
  const [state, setMState] = useState(false);
  const onHandleModifires = (e) => {
    let modifiresResults = searchSubCatIndex?.map((mainCategories) => {
      return {
        ...mainCategories,
        SubCategories: mainCategories.SubCategories?.map((item) => {
          return {
            ...item,
            Products: item.Products.map((product) => {
              return {
                ...product,
                ModifierWizards: product.ModifierWizards.map((modfireItem) => {
                  return {
                    ...modfireItem,
                    ModifierItemElements: modfireItem.ModifierItemElements.map(
                      (m_item) => {
                        const isChecked = m_item.Name === e.target.value;
                        return {
                          ...m_item,
                          selected: m_item?.selected
                            ? m_item?.selected
                            : isChecked,
                        };
                      }
                    ),
                  };
                }),
              };
            }),
          };
        }),
      };
    });
    setsearchSubCatIndex(modifiresResults);
  };

  const closeTimerHandler = () => {
    closeTemp = true;
    setRecievedOrder(false);
    handleClose();
  };

  const reveresedOrderHistory = [...orderHistory].reverse();

  /**
   * Language Selection
   */
  const selectLanguage = (index, langData_Locale, langData_Name, langData) => {
    i18n.changeLanguage(langData_Locale);
    setDefaultLang(index);
    setCurrentLanguage(langData_Name);
    setCurrentLanguageCode(langData_Locale);

    localStorage.setItem("languageIndex", index);
    localStorage.setItem("currentLanguageCodeStore", langData_Locale);

    // Close language selection via React state
    setIsLanguageOpen(false);
  };

  // Handle overlay click - close all drawers
  const handleOverlayClick = () => {
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsServiceOpen(false);
    setIsLanguageOpen(false);
  };

  // API END

  return (
    <div id="main" className={`
      ${isMenuOpen ? 'menu-open' : ''}
      ${isFilterOpen ? 'filter-open' : ''}
      ${isServiceOpen ? 'service-bar-open' : ''}
      ${isLanguageOpen ? 'service-bar-toggle' : ''}
      ${!active ? 'now-tile' : ''}
      ${isDetailOpen ? 'open-detail' : ''}
      ${isCartOpen ? 'open-cart open' : ''}
    `.trim()} style={{ minHeight: '100vh' }}>
      <div className="modal-empty-wrapper" id="modalEmpty">
        <div className="modal-empty">
          <div className="modal-close" onClick={modalClose}>
            <span>&times;</span>
          </div>
          {t('lblPleaseSelectAllRequiredOptions!')}
        </div>
      </div>

      <div id="main-wrapper">
        <div className="container p-0">
          <div className="order-listing position-relative overflow-hidden">
            <div className="nav_overlay" onClick={handleOverlayClick} />
            {/* Navbar links */}
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'menu-show' : ''}`} id="navbarNav">
              <div
                className="main-menu-header"
                style={{ backgroundColor: `${activeColor}` }}
              >
                <h6>
                  <span className="mr-17">{curentTime}</span>
                </h6>
              </div>
              <div className="main-menu-body">
                {index !== undefined && index && index.length > 0 ? (
                  <ul
                    className="main-menu-list mb-0"
                    style={{ backgroundColor: `${activeTheme}` }}
                  >
                    {index?.map((data, idx) => (
                      <React.Fragment key={idx}>
                        <button
                          className="main-menu-heading mb-15 "
                          onClick={() => menuItemClick(idx, data)}
                          style={{
                            color: `${activeTheme === "1" ? "black" : "white"}`,
                          }}
                        >
                          {data?.Name}
                        </button>
                        <div className="scroll-list">
                          {data.SubCategories.map(
                            (SubCategorydata, indexSub) => (
                              <li className="main-menu-item" key={indexSub}>
                                {SubCategorydata.Products.length > 0 ? (
                                  <>
                                    <a
                                      className="main-menu-link d-flex align-items-center"
                                    >
                                      <div className="main-menu-img mr-15">
                                        <img src={data?.PictureUrl} alt="" />
                                      </div>
                                      <h6
                                        onClick={() =>
                                          ClickSubmenuFromDrawer(
                                            indexSub,
                                            SubCategorydata?.Products,
                                            data,
                                            idx,
                                            SubCategorydata
                                          )
                                        }
                                        className="mb-0"
                                      >
                                        {SubCategorydata?.Products?.length > 0
                                          ? SubCategorydata?.Name
                                          : ""}
                                      </h6>
                                    </a>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </li>
                            )
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </ul>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="main-menu-footer mt-20">
                <a
                  className="feedback-wrapper"
                  data-toggle="modal"
                  data-target="#feedback-modal"
                >
                  <span className="menulink-img mr-12">
                    <img src="assets/img/request-arrow.svg" alt="" />
                  </span>
                  Feedback
                </a>
                <div className="side-menuitem-outer mt-20">
                  <a
                    className="side-menulink"
                    data-toggle="modal"
                    data-target="#about-modal"
                  >
                    <span className="menulink-img mr-12">
                      <img src="assets/img/question-mark.svg" alt="" />
                    </span>
                    About
                  </a>
                  <a
                    className="side-menulink"
                    data-toggle="modal"
                    data-target="#rules-modal"
                  >
                    <span className="menulink-img mr-12">
                      <img src="assets/img/check.svg" alt="" />
                    </span>
                    Rules &amp; Etiquette
                  </a>
                  <a
                    className="side-menulink"
                    data-toggle="modal"
                    data-target="#tablet-modal"
                  >
                    <span className="menulink-img mr-12">
                      <img src="assets/img/request-arrow.svg" alt="" />
                    </span>
                    Tabletmenukaart.nl
                  </a>
                </div>
              </div>
            </div>

            {/* filter sidebar - replaced with FilterSidebar component */}
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onFilterToggle={filterCheckeduncheck}
              selectedFilters={filterID}
            />

            <div className="top-fix">
              <div className="header-main">
                <div className="nav-toggle">
                  <nav className="navbar navbar-expand-* p-0">
                    <button
                      className={`navbar-toggler ${isMenuOpen ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <span className="navbar-toggler-icon" />
                    </button>
                  </nav>
                </div>
                <div className="hm-logo">
                  <a className>
                    <img src={`${logoHead}`} alt="" />
                  </a>
                </div>
                <div className="language-flag" onClick={() => setIsLanguageOpen(true)}>
                  <img src={process.env.PUBLIC_URL + "/assets/icons/" + currentLanguageCode + ".png"} alt="" />
                </div>
              </div>

              <div className="order-list-tab-wrapper pt-25 position-relative">
                {index !== undefined && index && index.length > 0 ? (
                  <ul
                    className="nav nav-tabs order-menu-tabs nav-link-active"
                    id="top-menu"
                  >
                    {index[inititalIndex].SubCategories.map((data, idx) => (
                      <React.Fragment key={idx}>
                        {data?.Products.length > 0 ? (
                          <li className="nav-item ">
                            <a
                              className={
                                activeTabId
                                  ? (activeTabId === data.SubCategoryId ? "nav-link active" : "nav-link")
                                  : (idx !== undefined && idx !== initialIndexTab
                                    ? "nav-link"
                                    : "nav-link active ")
                              }
                              id={"clickTab_" + data.SubCategoryId}
                              href="#0"
                              onClick={(e) => {
                                e.preventDefault();
                                handleTabClick(data.SubCategoryId);
                              }}
                            >
                              {data?.Name}
                            </a>{" "}
                          </li>
                        ) : (
                          <></>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                ) : (
                  <div></div>
                )}
                <div className="menu-search d-flex align-items-center mt-20">
                  <h6
                    className="menu-search-text mb-0 mr-13"
                    style={{ color: `${activeColor}` }}
                  >
                    Table {path?.tableNumber}
                  </h6>
                  <div className="search-outer mr-13">
                    <form
                      className="search-form"
                      onSubmit={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    >
                      <input
                        type="text"
                        onKeyPress={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        onChange={(e) => {
                          searchdata(e.target.value);
                          setsearchText(e.target.value);
                          setShow1(!show);
                        }}
                        value={searchText}
                        placeholder="Search"
                      />
                      <span className="search-ic">
                        <img src="assets/img/search.svg" alt="search-ic" />
                      </span>
                      <span className="close-ic">
                        {show1 ? (
                          <>
                            {" "}
                            <img
                              src="assets/img/x.svg"
                              alt="close-ic"
                              onClick={() => {
                                setsearchSubCatIndex(index);
                                setsearchText("");
                                setShow1(!show1);
                              }}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </span>
                    </form>
                  </div>
                  <div className="filter-toggle">
                    <a className="filter-icon" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                      <img src="assets/img/filter-ic.svg" alt="filter-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-list-body pl-20 pr-20">
              {/* tabs */}
              <div className="tab-content">
                <div
                  className="fade tab-pane active show"
                  id={1 + "food"}
                  role="tabpanel"
                >
                  {getBannerItemsAccToCategories().length > 0 ? (
                    getBannerItemsAccToCategories().length === 1 ? (
                      <div className="order-banner ">
                        {getBannerItemsAccToCategories()?.map(
                          (banner, bannerIdx) => (
                            <div
                              className="order-banner qty-open  menu-list-modal"
                              key={bannerIdx}
                            >
                              <img
                                src={banner?.SmallPictureUrl}
                                alt="food-banner"
                              />
                              {banner?.NoInteraction === true ? (
                                <></>
                              ) : (
                                <>
                                  <div className="item-cart-wrapper">
                                    <div className="item-cart-content d-flex flex-wrap align-items-center">
                                      <h6 className="mr-auto mb-0">
                                        {banner?.ProductDetails.ProductName}
                                      </h6>
                                      <p className="mb-0">
                                        {"€" + parseFloat(banner?.Price)}
                                      </p>
                                    </div>
                                    {banner?.NoInteraction && (
                                      <div className="d-flex flex-wrap align-items-center">
                                        <div className="item-count-wrapper d-flex mr-auto">
                                          <button
                                            type="button"
                                            className="minus qty-btn"
                                            onClick={() =>
                                              minusQuantity(banner)
                                            }
                                          ></button>
                                          <input
                                            type="text"
                                            name="quantity"
                                            defaultValue={1}
                                            value={quantityToKart}
                                            className="qty"
                                          />
                                          <button
                                            type="button"
                                            className="plus qty-btn"
                                            onClick={() => addQuantity(banner)}
                                          ></button>
                                        </div>
                                        <a
                                          className="butn-sm butn-orange add-cart-btn remove-qty"
                                          onClick={() => {
                                            addQuantityAndRemoveClass(banner);
                                          }}
                                          style={{
                                            backgroundColor: `${activeColor}`
                                          }}
                                        >
                                          Add
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="order-banner ">
                        <Slide>
                          {getBannerItemsAccToCategories().map(
                            (banner, bannerIdx) => (
                              <div
                                className="order-banner qty-open  menu-list-modal"
                                key={bannerIdx}
                              >
                                <img
                                  src={banner?.SmallPictureUrl}
                                  alt="food-banner"
                                />
                                <div className="item-cart-wrapper">
                                  <div className="item-cart-content d-flex flex-wrap align-items-center">
                                    <h6 className="mr-auto mb-0">
                                      {banner?.ProductDetails.ProductName}
                                    </h6>
                                    <p className="mb-0">
                                      {"€" + parseFloat(banner?.Price)}
                                    </p>
                                  </div>
                                  <div className="d-flex flex-wrap align-items-center">
                                    <div className="item-count-wrapper d-flex mr-auto">
                                      <button
                                        type="button"
                                        className="minus qty-btn"
                                        onClick={() => minusQuantity(banner)}
                                      ></button>
                                      <input
                                        type="text"
                                        name="quantity"
                                        defaultValue={1}
                                        value={quantityToKart}
                                        className="qty"
                                      />
                                      <button
                                        type="button"
                                        className="plus qty-btn"
                                        onClick={() => addQuantity(banner)}
                                      ></button>
                                    </div>
                                    <a
                                      className="butn-sm butn-orange add-cart-btn remove-qty"
                                      onClick={() => {
                                        addQuantityAndRemoveClass(banner);
                                      }}
                                      style={{
                                        backgroundColor: `${activeColor}`,
                                      }}
                                    >
                                      Add
                                    </a>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </Slide>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                  <div className="menu-item-wrapper mt-20">
                    <div>
                      {searchSubCatIndex !== undefined &&
                        searchSubCatIndex[inititalIndex].SubCategories?.map(
                          (mapSubCatData, catIndex) => (
                            <React.Fragment key={catIndex}>
                              {
                                <div className="wrapper">
                                  <h2
                                    className="menu-main-heading mb-0 subcateclass"
                                    id={mapSubCatData.SubCategoryId}
                                  >
                                    {mapSubCatData.Products.length > 0
                                      ? mapSubCatData.Name +
                                      " " +
                                      mapSubCatData.Products.length +
                                      `${mapSubCatData.Products.length > 1
                                        ? " items"
                                        : " item"
                                      }`
                                      : ""}
                                  </h2>
                                  <div
                                    id={
                                      "menu-list-wrapper-" +
                                      mapSubCatData.SubCategoryId
                                    }
                                    className="menu-list-wrapper mb-20"
                                  >
                                    {mapSubCatData !== undefined &&
                                      mapSubCatData.Products.map(
                                        (data, prodIdx) => (
                                          <React.Fragment key={prodIdx}>
                                            {!data.IsPromotion &&
                                              checkAvailablityTimesOfProducts({
                                                AvailableFromTime:
                                                  data.AvailableFromTime,
                                                AvailableToTime:
                                                  data.AvailableToTime,
                                              }) && (
                                                <a
                                                  className={`menu-list-item d-flex menu-list-modal  ${addRemoveIndex ===
                                                    data.ProductId
                                                    ? addRemove
                                                      ? "qty-open"
                                                      : ""
                                                    : ""
                                                    } ${getProductQuantityInCart(
                                                      data
                                                    ) !== ""
                                                      ? "show"
                                                      : ""
                                                    }  `}
                                                >
                                                  <div className="item-img mr-11">
                                                    <span className="count-number">
                                                      {getProductQuantityInCart(
                                                        data
                                                      )}
                                                    </span>
                                                    <img
                                                      src={
                                                        data?.SmallPictureUrl
                                                      }
                                                      alt="menu-item-img"
                                                    />

                                                    {data?.IsPromotion && (
                                                      <span
                                                        className="promo-tag promo-tag-blue"
                                                        style={{
                                                          color: `#da1a35`,
                                                          backgroundColor: `${billTheme?.TextColor}`,
                                                        }}
                                                      >
                                                        Promo
                                                      </span>
                                                    )}
                                                  </div>
                                                  <div className="item-content ">
                                                    <a
                                                      id={`documentClick${prodIdx}`}
                                                      href="javascript:void(0)"
                                                      className="item-inner-content add-qauntity d-flex"
                                                    >
                                                      <div
                                                        onClick={() =>
                                                          menuWarapper(
                                                            data,
                                                            prodIdx
                                                          )
                                                        }
                                                        className="item-left-text mr-23 media-body"
                                                      >
                                                        <h6
                                                          className="mb-15"
                                                          onClick={() => {
                                                            data
                                                              ?.ModifierWizards
                                                              .length > 0
                                                              ?
                                                              menuWarapper(
                                                                data,
                                                                prodIdx
                                                              )
                                                              : addQuantityAndRemoveClass(
                                                                data,
                                                                prodIdx
                                                              );
                                                          }}
                                                        >
                                                          {data?.Name}
                                                        </h6>
                                                        {/* commented out h6 block */}
                                                        <p>
                                                          {data?.ProductDetails
                                                            ?.MenuItems.length >
                                                            0
                                                            ? stripHtml(
                                                              data
                                                                ?.ProductDetails
                                                                ?.MenuItems[0]
                                                                .HtmlContent
                                                            )
                                                            : ""}
                                                        </p>
                                                      </div>
                                                      <div className="addimage text-center">
                                                        <h6 className="item-price ml-auto">

                                                          {currencyValue
                                                            ? currencyValue
                                                            : "€" +
                                                            " " +
                                                            parseFloat(data?.Price)}
                                                          {parseFloat(data?.Price)}
                                                        </h6>

                                                        {active && (
                                                          <i
                                                            className="fal fa-plus-circle"
                                                            onClick={() => {
                                                              data
                                                                ?.ModifierWizards
                                                                .length > 0
                                                                ? menuWarapper(data, prodIdx)
                                                                : addQuantityAndRemoveClass(data, prodIdx);
                                                            }}
                                                          ></i>
                                                        )}
                                                      </div>
                                                    </a>
                                                    {/* Commented out item-cart-wrapper block */}
                                                  </div>
                                                </a>
                                              )}

                                            <div className="promo-collapse-wrapper product-detail-wrapper">
                                              <div className="promo-banner">
                                                <div
                                                  className="promo-back"
                                                  onClick={() => {
                                                    if (
                                                      DescriptionData
                                                        ?.ModifierWizards
                                                        .length > 0
                                                    ) {
                                                      resetModifiers.current();
                                                    }
                                                    setIsCartOpen(true);
                                                    setDiscriptionTotal(0);
                                                    setIsDetailOpen(false);
                                                  }}
                                                >
                                                  <span
                                                    className="fal fa-long-arrow-left arrow-background"
                                                    style={{
                                                      padding: "20px",
                                                      fontSize: "25px",
                                                      position: "absolute",
                                                      color: `${detailsBackButtonColor}`,
                                                    }}
                                                  ></span>
                                                </div>
                                                <img
                                                  src={
                                                    DescriptionData?.SmallPictureUrl
                                                  }
                                                  alt="filter-img"
                                                />
                                                <div
                                                  className="banner-content pb-20"
                                                  style={{
                                                    backgroundColor: `${DescriptionData?.ProductDetails?.MenuBackgroundColor}`,
                                                  }}
                                                >
                                                  <div className="d-flex align-items-center justify-content-between width_head mb-14">
                                                    <h2
                                                      className="menu-main-heading mb-0"
                                                      style={{
                                                        color: `${DescriptionData?.ProductDetails?.MenuTextColorActive}`,
                                                      }}
                                                    >
                                                      {DescriptionData?.Name}
                                                    </h2>

                                                    <span className="text-white">
                                                      {" "}
                                                      {data?.PriceValue != null
                                                        ? data?.PriceValue
                                                        : "€ " +
                                                        " " +
                                                        parseFloat(DescriptionData?.Price)}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className={DescriptionData
                                                ?.ModifierWizards.length > 1 ? "scrollerdiv" : "scrollerrdiv"}>
                                                {/* promo content */}
                                                {DescriptionData
                                                  ?.ModifierWizards.length >
                                                  0 && (
                                                    <div className="promo-body-wrapper">

                                                      <ModifiresList
                                                        resetModifiers={
                                                          resetModifiers
                                                        }
                                                        DescriptionData={
                                                          DescriptionData
                                                        }
                                                        modifires={
                                                          DescriptionData?.ModifierWizards
                                                        }
                                                        onModifireState={
                                                          onModifireState
                                                        }
                                                        activeColor={activeColor}
                                                        onCalculateTotalAccToWizard={
                                                          calculateTotalAccToWizard
                                                        }
                                                        requiredErrorMsg={
                                                          requiredErrorMsg
                                                        }
                                                        getSelectedModifierItem={getSelectedModifierItem.bind(
                                                          this
                                                        )}
                                                        onHandleModifires={
                                                          onHandleModifires
                                                        }
                                                      />

                                                    </div>
                                                  )}

                                              </div>

                                              {DescriptionData
                                                ?.ModifierWizards.length >
                                                0 ? (<div className="text-container description-cnt">
                                                  {" "}

                                                  {DescriptionData ? <DescriptionItem description={DescriptionData
                                                    ?.ProductDetails
                                                    ?.MenuItems[0].HtmlContent} /> : 'No description'}


                                                </div>) : (<div className="text-container description-cnt">
                                                  {" "}
                                                  <p className="pl-20 pr-20 ">
                                                    {stripHtml(
                                                      DescriptionData
                                                        ?.ProductDetails
                                                        ?.MenuItems[0]
                                                        .HtmlContent
                                                    )}
                                                    {" "}

                                                  </p>

                                                </div>)}

                                              <div className="promo-footer">
                                                <div className="item-cart-wrapper d-flex flex-wrap align-items-center justify-content-between">
                                                  <div className="item-count-wrapper d-flex">
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        minusQuantity(
                                                          DescriptionData?.Price
                                                        )
                                                      }
                                                      className="minus qty-btn"
                                                    />
                                                    <input
                                                      type="text"
                                                      name="quantity"
                                                      defaultValue={0}
                                                      className="qty"
                                                      contentEditable={false}
                                                      value={quantityToKart}
                                                    />
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        addQuantity(
                                                          DescriptionData
                                                        )
                                                      }
                                                      className="plus qty-btn"
                                                    />
                                                  </div>
                                                  <a
                                                    className="butn-sm butn-orange add-cart-btn promo-cart-btn"
                                                    onClick={() => {
                                                      addQuantityAndRemoveClass(
                                                        DescriptionData
                                                      );
                                                      setIsDetailOpen(false);
                                                    }}
                                                    style={{
                                                      backgroundColor: `${activeColor}`,
                                                      color: "white"
                                                    }}
                                                  >
                                                    <span className="d-flex " >
                                                      {`${DescriptionData?.PriceValue !=
                                                        null
                                                        ? DescriptionData?.PriceValue
                                                        : "€ "
                                                        } ${parseFloat(DescriptionData?.Price) *
                                                        parseFloat(quantityToKart) +
                                                        parseFloat(discriptionTotal) *
                                                        parseFloat(quantityToKart)
                                                        }`}
                                                    </span>
                                                    <span
                                                      data-toggle="modal"
                                                      data-target=".bd-example-modal-sm"
                                                      className="ml-auto"
                                                      style={{
                                                        color: `white`,
                                                      }}
                                                    >
                                                      Add
                                                    </span>
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                              <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Product Description</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">&times;</span>
                                                    </button>
                                                  </div>
                                                  <div className="modal-body">
                                                    <p className="pl-20 pr-20">
                                                      {stripHtml(
                                                        DescriptionData
                                                          ?.ProductDetails
                                                          ?.MenuItems[0]
                                                          .HtmlContent
                                                      )}
                                                    </p>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </React.Fragment>
                                        )
                                      )}{" "}
                                  </div>
                                </div>
                              }
                            </React.Fragment>
                          )
                        )}
                      {/* END All Main Categories : Data with Sub Category - products */}
                    </div>
                  </div>
                </div>
              </div>
              {/* tabs */}


              {searchSubCatIndex !== undefined &&
                searchSubCatIndex[inititalIndex]?.SubCategories.length > 0 && (
                  <div className="last-img" style={{ display: showEndOfList ? 'block' : 'none' }}>
                    <img src={Endofthelist} alt="" />
                  </div>
                )}
            </div>
            <div className="menu-bottom-bar">
              <ul className="bottom-navbar m-0 p-0">
                <li className="nav-item">
                  <a
                    className="nav-link tile-link"
                    onClick={() => setState()}
                  >
                    {active ? (
                      <GridIcon size={19} color="#9E9E9E" />
                    ) : (
                      <ListIcon size={19} color="#9E9E9E" />
                    )}

                    <p>{t('lblLayout')}</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="modal"
                    data-target="#bill-modal"
                    onClick={() => getOrderHistoryDetails()}
                  >
                    <HistoryIcon size={24} color="#9E9E9E" />
                    <p>{t('lblHistory')}</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#;" className="nav-link service-link" onClick={(e) => { e.preventDefault(); setIsServiceOpen(true); }}>
                    <BellIcon size={24} color="#9E9E9E" />
                    <p>{t('lblServices')}</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link cart-link"
                    data-toggle="modal"
                    data-target="#cart-modal"
                  >
                    <CartIcon size={24} color="#9E9E9E" />
                    <span>{getTotalQuantityInKaart()}</span>
                    <p>{t('lblBasket')}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {getTotalQuantityInKaart() > 0 && (
        <div
          className="cart-bar "
          style={{
            opacity: 1,
            visibility: "visible",
            backgroundColor: `${activeColor}`,
          }}
        >
          <div className="cart-bar-content text-white d-flex align-items-center justify-content-between">
            <span className="cart-img">
              <CartIcon size={24} color="#fff" />
            </span>
            <h4 className="font_500 mb-0">
              {getTotalQuantityInKaart() > 1
                ? getTotalQuantityInKaart() + " Items"
                : getTotalQuantityInKaart() + " Item"}
            </h4>
            <h4 className="cart-price mb-0">€ {total == 'NaN' ? 0 : parseFloat(total)}</h4>
          </div>
        </div>
      )}

      {/**services open - replaced with ServiceBar component */}
      <ServiceBar
        isOpen={isServiceOpen}
        onClose={() => setIsServiceOpen(false)}
        serviceCallGroups={serviceCall}
        serviceCallTheme={serviceCallTheme}
        onServiceRequest={sendServiceRequest}
        t={t}
      />

      {/* Language bar - replaced with LanguageBar component */}
      <LanguageBar
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        languages={allLanguageList}
        currentLanguageCode={currentLanguageCode}
        serviceCallTheme={serviceCallTheme}
        onSelectLanguage={selectLanguage}
      />

      <div
        id="service-sent"
        className="modal fade full-popup sent-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ServiceSentLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={clearIntervalFun}
                >
                  <img src="assets/img/x.svg" alt="" />
                </button>
              </div>
              <div className="modal-body text-center">
                <img src="assets/img/service-sent.svg" alt="img" />
                <h6>{t('lblMSG3')}</h6>
                <p>
                  {t('lblMSG1')}
                  <br />
                  {t('lblMSG2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="cart-modal"
        className="modal fade full-popup products-modal cart-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ItemsLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <h4 style={{ color: `${orderTheme?.HeaderTextColor}` }}>
                  {kartItem?.length > 1 ? "Items" : "Item"}
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <CloseIcon size={24} color="#fff" />
                </button>
              </div>

              {kartItem && kartItem?.length > 0 ? (
                <div
                  className="modal-body"
                  style={{
                    backgroundColor: `${orderTheme?.BackgroundColor}`,
                    margin: "0 -15px",
                  }}
                >
                  <CartList
                    cartItemList={kartItem}
                    menuWarapperNew={menuWarapperNew}
                    orderTheme={orderTheme}
                    minusQuantityKart={minusQuantityKart}
                    addQuantityKArt={addQuantityKArt}
                    removeProductFromCart={removeProductFromCart}
                  />

                  <div className="cart-modal-footer">
                    {/* Payment method sections commented out - kept for app history */}
                    {/* <div className="payment-method"> */}
                    {/* <h6 className="sm-heading">Payment Method</h6> */}
                    {/* ... commented out payment methods ... */}
                    {/* </div> */}
                    {/* <div className="note-wrapper">
                      <label>Note</label>
                      <input onChange={handleChange} type="text" className="form-control" />
                    </div> */}
                    {/* <div className="tips">...</div> */}
                    <div className="total-amounts px-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="total-hd">{t('lblTotal')}</p>
                        <p className="total-price" style={{ color: "black" }}>
                          {"€" + (parseFloat(tipTotal) + parseFloat(total)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="pb-20">
                      <a
                        href="#;"
                        className="butn butn w-100"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#received-order"
                        id="placeOrderBtn"
                        style={{
                          backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                          textDecoration: "none",
                          borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                          borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                        }}
                        onClick={placeOrderHandler}
                      >
                        <span
                          style={{ color: `${orderTheme?.ButtonTextColor}` }}
                        >
                          {" "}
                          {t('lblPlaceOrder')}{" "}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="modal-body text-center empty-cart-img">
                  <img src="assets/img/order.png" alt="img" />
                  <h6>{t('lblYourCartIsEmpty')}</h6>
                  <p>
                  {t('lblYourCartIsEmpty')}
                    <br />
                    {t('lblPleaseSelectItemsFromMenu')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Like us  */}

      <Modal
        id="fb-modal"
        className="modal fade full-popup sent-modal"
        show={recievedOrder}
        onHide={handleRecievedOrderClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div className="modal-close-btn mt-3">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                  handleClose();
                  setRecievedOrder(false);
                  clearIntervalFun();
                  setshowFbLike(false);
                }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-header">
                <p className="close-time">
                  {t('lblClosingIn')}{" "}
                  <span
                    id="seconds"
                    className="js-timeout"
                    style={{ color: `${activeColor}` }}
                  >
                    {countdown}
                  </span>
                </p>
              </div>
              <div className="modal-body text-center">
                <img className="mt-auto" src="assets/img/order.png" alt="img" />
                <h6>{t('lblMSG4')}</h6>
                <p>
                  {t('lblMSG5')}
                  <br />
                  {t('lblMSG6')}
                </p>
                {showFbLike ? (<div className="p-4 mt-auto w-100">
                  <a
                    href="#myModal1"
                    className="facebok-butn butn butn-blue disable-btn w-100"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#myModal1"
                    id="placeOrderBtn"
                  >
                    <span
                      style={{ color: `${orderTheme?.ButtonTextColor}` }}
                    >
                      <svg
                        width={28}
                        height={27}
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12.0124V24.4035C1 25.0609 1.53901 25.5981 2.19858 25.5981H6.59575C7.03546 25.5981 7.42553 25.3578 7.63121 25.0043C8.2766 25.6193 9.15603 26.001 10.1206 26.001H21.2128C23.6667 26.001 25.227 24.7216 25.5035 22.4879L26.9929 13.0373C27 13.002 27 12.9737 27 12.9383C27 10.9521 25.3759 9.34046 23.3901 9.34046H17.7801V5.31139C17.7801 3.61494 17.2837 2.38502 16.2979 1.67109C14.7447 0.53306 12.6028 1.18337 12.5106 1.21164C12.2411 1.29646 12.0638 1.54386 12.0638 1.81953V6.33633C12.0638 9.89887 7.91489 11.1147 7.74468 11.1641C7.65957 11.1853 7.58865 11.2278 7.52482 11.2772C7.30496 11.0016 6.96454 10.8249 6.58865 10.8249H2.19149C1.53901 10.8178 1 11.355 1 12.0124ZM8.09929 12.3941C8.31206 12.3375 13.3617 10.8743 13.3617 6.33633V2.33554C13.9149 2.25071 14.8652 2.20123 15.5532 2.7031C16.1844 3.16962 16.5106 4.04612 16.5106 5.31139V9.9837C16.5106 10.3371 16.8014 10.6269 17.156 10.6269H23.4043C24.6738 10.6269 25.7092 11.6448 25.7305 12.903L24.2482 22.3112C24.2482 22.3183 24.2482 22.3254 24.2482 22.3324C24.0567 23.9228 23.0355 24.7287 21.227 24.7287H10.1277C8.84397 24.7287 7.80142 23.6896 7.80142 22.4102V12.4011C7.89362 12.4223 8 12.4223 8.09929 12.3941ZM2.28369 12.0972H6.51064V24.3187H2.28369V12.0972Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </svg>
                      {" "}
                      {t('lblThankYouForLikingUs!')}{" "}
                    </span>
                  </a>

                  <button
                    onClick={() => {
                      handleClose();
                      setRecievedOrder(false);
                      clearIntervalFun();
                    }}
                    className="facebok-butn butn butn-blue w-100 mt-4 order-close-btn"
                    style={{
                      backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                      textDecoration: "none",
                      borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                      borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                    }}
                  >
                    {t('lblClose')}
                  </button>

                </div>) : (<div className="p-4 mt-auto w-100">
                  <a
                    href="#myModal1"
                    className="facebok-butn butn butn-blue w-100"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#myModal1"
                    id="placeOrderBtn"
                    style={{
                      backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                      textDecoration: "none",
                      borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                      borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                    }}
                    onClick={() => setshowFbLike(true)}
                  >
                    <span
                      style={{ color: `${orderTheme?.ButtonTextColor}` }}
                    >
                      <svg
                        width={28}
                        height={27}
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12.0124V24.4035C1 25.0609 1.53901 25.5981 2.19858 25.5981H6.59575C7.03546 25.5981 7.42553 25.3578 7.63121 25.0043C8.2766 25.6193 9.15603 26.001 10.1206 26.001H21.2128C23.6667 26.001 25.227 24.7216 25.5035 22.4879L26.9929 13.0373C27 13.002 27 12.9737 27 12.9383C27 10.9521 25.3759 9.34046 23.3901 9.34046H17.7801V5.31139C17.7801 3.61494 17.2837 2.38502 16.2979 1.67109C14.7447 0.53306 12.6028 1.18337 12.5106 1.21164C12.2411 1.29646 12.0638 1.54386 12.0638 1.81953V6.33633C12.0638 9.89887 7.91489 11.1147 7.74468 11.1641C7.65957 11.1853 7.58865 11.2278 7.52482 11.2772C7.30496 11.0016 6.96454 10.8249 6.58865 10.8249H2.19149C1.53901 10.8178 1 11.355 1 12.0124ZM8.09929 12.3941C8.31206 12.3375 13.3617 10.8743 13.3617 6.33633V2.33554C13.9149 2.25071 14.8652 2.20123 15.5532 2.7031C16.1844 3.16962 16.5106 4.04612 16.5106 5.31139V9.9837C16.5106 10.3371 16.8014 10.6269 17.156 10.6269H23.4043C24.6738 10.6269 25.7092 11.6448 25.7305 12.903L24.2482 22.3112C24.2482 22.3183 24.2482 22.3254 24.2482 22.3324C24.0567 23.9228 23.0355 24.7287 21.227 24.7287H10.1277C8.84397 24.7287 7.80142 23.6896 7.80142 22.4102V12.4011C7.89362 12.4223 8 12.4223 8.09929 12.3941ZM2.28369 12.0972H6.51064V24.3187H2.28369V12.0972Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </svg>
                      {" "}
                      {t('lblLikeUsOnFacebook')}{" "} <ReactFBLike layout="button" share="false" version="v2.12" />
                    </span>
                  </a>

                  <button
                    onClick={() => {
                      handleClose();
                      setRecievedOrder(false);
                      clearIntervalFun();
                    }}
                    className="facebok-butn butn butn-blue w-100 mt-4 order-close-btn"
                    style={{
                      backgroundColor: `${orderTheme?.ButtonBackgroundColor}`,
                      textDecoration: "none",
                      borderColor: `${orderTheme?.ButtonBackgroundColor}`,
                      borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                    }}
                  >
                    {t('lblClose')}
                  </button>

                </div>)}

                <a
                  id="open-modal"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* payment Screen */}

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
              <div className="modal-header"
                style={{
                  backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                  margin: "0 -15px",
                }}>
                <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                  {kartHistoryStore && kartHistoryStore?.length > 1
                    ? " Items"
                    : "Item"}
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
                      kartItem?.map((data, idx) => (
                        <div className="menu-list-item d-flex" key={idx}>
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
                                    data?.selectedModifiersData?.map((modData, modIdx) => {
                                      return (
                                        <p
                                          style={{
                                            fontSize: "10px",
                                            margin: "0",
                                            padding: "2px",
                                          }}
                                          key={modIdx}
                                        >
                                          {modData.mName}
                                        </p>
                                      );
                                    })}
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
                                    value={data.quantity}
                                    defaultValue={0}
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

                                € {
                                  Number(
                                    (data.quantity * (data.basePrice ? data?.basePrice : data.Price)) +
                                    (data.quantity * data.modifierPrice.length ? data?.modifierPrice.reduce((partialSum, a) => partialSum + a, 0) : 0)
                                  ).toFixed(2)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        {kartHistoryStore && kartHistoryStore?.length > 0 ? (
                          <>
                            {kartHistoryStore?.map((data, idx) => (

                              <div
                                className="menu-list-item d-flex"
                                key={idx}
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
                                          value={data?.Item?.Quantity}
                                          defaultValue={0}
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
                                      {/* commented out price display */}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="modal-body text-center empty-cart-img">
                              <img src="assets/img/order.png" alt="img" />
                              <h6>{t('lblYourCartIsEmpty')}</h6>
                              <p>
                              {t('lblYourCartIsEmpty')}
                                <br />
                                {t('lblPleaseSelectItemsFromMenu')}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="cart-modal-footer">
                  <div className="payment-method">
                    {/* Payment method commented out - kept for app history */}
                  </div>
                  {/* Tips section commented out - kept for app history */}
                  <div className="total-amounts">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="total-hd">{t('lblTotal')}</p>
                      <p className="total-price" style={{ color: "black" }}>
                        {"€" + (parseFloat(tipTotal) + parseFloat(total)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="pb-20 pl-20 pr-20">

                    {
                    /* <a
                      href="#;"
                      id="place-order"
                      className="butn butn w-100"
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#payment-successful"
                      onClick={() => (paymentNextHandler(), setshowFbLike(false))}
                      style={{
                        backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                        borderRadius: `${orderTheme?.ButtonBackgroundColor}`,
                        margin: "0 -15px",
                      }}

                    >
                      Checkout
                    </a>  */}

                  </div>
                </div>
              </Modal.Body>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className="modal fade full-popup sent-modal"
        show={paymentReceieved}
        onHide={togglePaymentReceievedModel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="container h-100">
            <div className="modal-dialog modal-dialog-zoom" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={clearPreviousSteps}
                  >
                    <img src="assets/img/x.svg" alt="" />
                  </button>
                </div>
                <div className="modal-body text-center">
                  <img src="assets/img/thankyou.png" alt="img" />
                  <h6>{t('lblYeah,PaymentSuccessful')}!</h6>
                  <p>
                    {t('lblYour paymentWasSuccessful,Now')}
                    <br />
                    {t('lblSitAndWaitForYourFood ToArrive')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div
        id="bill-modal"
        className="modal fade full-popup products-modal cart-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ItemsLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                  {kartHistoryStore && kartHistoryStore?.length > 1
                    ? "History"
                    : "History"}
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <CloseIcon size={24} color="#fff" />
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  backgroundColor: `${billTheme?.BackgroundColor}`,
                  margin: "0 -15px",
                }}
              >

                {/**listing of kartHistory */}
                <div className="dynamic-list">
                  {reveresedOrderHistory?.slice(0, 5)?.map((data) =>
                    data?.Order?.Items.map((item, idx) =>
                      <div className="all-items menu-list-popup" key={idx}>
                        <div className="menu-list-item d-flex">
                          <div className="item-img mr-11">
                            <img src={item?.Item?.Image}
                              alt="image" />
                          </div>
                          <div className="item-content ">
                            <div className="item-inner-content add-qauntity d-flex">
                              <div className="item-left-text mr-23">
                                <h6
                                  className="mb-15"
                                  style={{
                                    color: `${billTheme?.BillProductTextColor}`,
                                  }}
                                >
                                  {item?.Item?.Name}
                                </h6>
                                <p>{"X" + item?.Quantity}</p>
                              </div>

                              <h6 className="item-price ml-auto">

                                {item?.Item?.Price != null
                                  ? "€ " + parseFloat(item?.Item?.Price) * parseFloat(item?.Quantity)
                                  : "€" +
                                  " " +
                                  Number(
                                    parseFloat(item?.Quantity) * parseFloat(item?.basePrice) +
                                    parseFloat(item.Quantity) *
                                    item?.modifierPrice?.reduce(
                                      (partialSum, a) => partialSum + a,
                                      0
                                    )
                                  ).toFixed(2)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  <div className="items-bill">

                    {kartHistoryStore && kartHistoryStore.length > 0 ? (
                      <>
                        <h6 className="sm-heading">Items on the Bill</h6>
                      </>
                    ) : (
                      <>
                        <h6 className="sm-heading"> No Order History Found </h6>
                      </>
                    )}

                    {reveresedOrderHistory?.slice(0, 5)?.map((data) =>
                      data?.Order?.Items.map((item, idx) =>

                        <div className="menu-list-item d-flex" key={idx}>
                          <div className="item-img mr-11">
                            <img
                              src={item?.Item?.Image}
                              alt="menu-item-img"
                            />
                          </div>
                          <div className="item-content ">
                            <div className="item-inner-content add-qauntity d-flex">
                              <div className="item-left-text mr-23 disabled">
                                <h6 className="mb-15">{item?.Item?.Name}</h6>
                                <p>{"X" + item?.Quantity}</p>
                              </div>

                              <h6 className="item-price ml-auto">

                                {item?.Item?.Price != null
                                  ? "€" + parseFloat(item?.Item?.Price) * parseFloat(item?.Quantity)
                                  : "€" +
                                  " " +
                                  Number(
                                    parseFloat(item?.Quantity) * parseFloat(item?.Item?.basePrice) +
                                    parseInt(item?.Quantity) *
                                    item?.modifierPrice?.reduce(
                                      (partialSum, a) => partialSum + a,
                                      0
                                    )
                                  ).toFixed(2)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )
                    )}

                  </div>
                </div>

                <div className="cart-modal-footer">
                  <div className="tips">
                    {/* Tips section commented out - kept for app history */}
                    {/* Total amounts section commented out - kept for app history */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        id="about-modal"
        className="modal fade full-popup products-modal cart-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ItemsLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                  About
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <CloseIcon size={24} color="#fff" />
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  backgroundColor: `${billTheme?.BackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  quasi itaque voluptas quae consequuntur suscipit impedit
                  molestiae, quas ducimus adipisci!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="rules-modal"
        className="modal fade full-popup products-modal cart-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ItemsLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                  Rules and Ettiquette
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <CloseIcon size={24} color="#fff" />
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  backgroundColor: `${billTheme?.BackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
                  labore officia minima reprehenderit dolorem expedita, itaque
                  consectetur dolores numquam ea fugit temporibus voluptas et
                  ratione tenetur quas autem modi? Deserunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="tablet-modal"
        className="modal fade full-popup products-modal cart-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ItemsLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                  Tabletmenukaart
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <CloseIcon size={24} color="#fff" />
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  backgroundColor: `${billTheme?.BackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur aperiam deleniti animi at. Laudantium ab quaerat
                  architecto repudiandae necessitatibus sunt doloremque ipsa,
                  odit doloribus animi iusto distinctio adipisci quisquam
                  voluptas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="feedback-modal"
        className="modal fade full-popup products-modal cart-modal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ItemsLabel"
        aria-hidden="true"
      >
        <div className="container h-100">
          <div className="modal-dialog modal-dialog-zoom" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  backgroundColor: `${billTheme?.HeaderBackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <h4 style={{ color: `${billTheme?.HeaderTextColor}` }}>
                  Feedback
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <CloseIcon size={24} color="#fff" />
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  backgroundColor: `${billTheme?.BackgroundColor}`,
                  margin: "0 -15px",
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur aperiam deleniti animi at. Laudantium ab quaerat
                  architecto repudiandae necessitatibus sunt doloremque ipsa,
                  odit doloribus animi iusto distinctio adipisci quisquam
                  voluptas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {visibility ? (
        <div className="preloader-wrap">
          <div className="preload-in">
            <i className="fad fa-spinner-third"></i>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {loading ? (
        <Loader />
      ) : null}

    </div>
  );
};
export default Home;
