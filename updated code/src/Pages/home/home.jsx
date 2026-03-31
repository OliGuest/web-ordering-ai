import { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
// import Loader from "../../components/common/Loader";
import gradientLoader from '../../assets/img/gradient-loader.png';
import TopFixMenu from "../../components/TopFixMenu/TopFixMenu";
import OrderListItems from "../../components/OrderListItems/OrderListItems";
import BottomMenu from "../../components/BottomMenu/BottomMenu";
import CartBar from "../../components/CartBar/CartBar";
import ServiceListsModal from "../../components/ServiceListsModal/ServiceListsModal";
import LanguageListModal from "../../components/Modals/LanguageListModal/LanguageListModal";
import CardListModal from "../../components/CardListModal/CardListModal";
import PayModal from "../../components/Modals/PayModal/PayModal";
import HistoryModal from "../../components/Modals/HistoryModal/HistoryModal";
import AboutModal from "../../components/Modals/AboutModal/AboutModal";
import RulesModal from "../../components/Modals/RulesModal/RulesModal";
import TabletmenukaartModal from "../../components/Modals/TabletmenukaartModal/TabletmenukaartModal";
import { useContext } from "react";
import { Context } from "../../context/kartItemContext";
import { useCalculateTotalCartAmount } from "../../Hooks/useCalculateTotalCartAmount";
import RequestBillMOdal from "../../components/Modals/RequestBillMOdal/RequestBillMOdal";
import SettingsModal from "../../components/Modals/SettingsModal/SettingsModal";
import AlergensModal from "../../components/Modals/AlergensModal/AlergensModal";
import PaymentModal from "../../components/Modals/PaymentModal/PaymentModal";
import PaymentMethodModal from "../../components/Modals/PaymentMethodModal/PaymentMethodModal";
// import DoneOrdering from "../../components/Modals/DoneOrdering/DoneOrdering";
var $ = require("jquery");

const Home = () => {

  const {
    getTotalQuantityInKaart,
    loading,
    visibility,
    setkartItem,
    setItemsOnTheKartHistory,
    kartItem,
    error,
    errorModifiers,
    setErrorLabel,
    setErrorModifiers,
    clickedCardId,
    restaurantName,
    // setError,
    closeallOpenedModals,
    calculateHistoryTotalAmount,
    logoHead,
    showPin,
    showCash,
    showQRpay
  } = useContext(Context);

  const [calculateTotalCartAmount] = useCalculateTotalCartAmount();
  // const [calculateHistoryTotalAmount] = useCalculateHistoryTotalAmount();
  const [countMin, setCountMin] = useState();
  const [countSec, setCountSec] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleFooter, setVisibleFooter] = useState(false);
  const [timer, setTimer] = useState(false);
  // get kartdata from local storage
  const [show, setShow] = useState(false);
  const [showPaument, setHandlePayment] = useState(false);
  const [showPaumentMethod, setHandlePaymentMethod] = useState(false);
  // const [showPaymentCardInfo, setPaymentCardInfo] = useState(false);

  const handleClose = () => setShow(false);
  const handlePaymentClose = () => setHandlePayment(false);
  const handlePaymentMethodClose = () => setHandlePaymentMethod(false);
  // const handlePaymentCardInfoClose = () => setPaymentCardInfo(false);

  const handleShow = () => setShow(true);
  const handleShowPayment = () => setHandlePayment(true);
  const handleShowPaymentMethod = () => setHandlePaymentMethod(true);
  // const handleShowPaymentCardInfo = () => setPaymentCardInfo(true);

  useEffect(() => {
    // let kartItem = JSON.parse(localStorage.getItem("kaartData"));
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    calculateTotalCartAmount(kartItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kartItem])

  useEffect(() => {

    window.addEventListener("popstate", () => {
      if (document.body.classList.contains("open-detail")) {
        // props.history.push("/home");
        document.body.classList.add("open");
        //document.body.classList.remove("open-detail");
      }
      if (document.body.classList.contains("modal-open")) {
        document.body.classList.remove("modal-open");
      }
      // let backdropElem = document.getElementsByClassName("modal-backdrop")[0];
      // if (backdropElem) {
      //   backdropElem.classList.remove("modal-backdrop");
      // }
    }, []);

    return () => {
      window.removeEventListener("popstate", () => { });
    };
  }, []);

  useEffect(() => {
    function BodyHight() {
      var hh = $(window).innerHeight();
      $("body").css("hight", hh);
    }

    $(window).resize(function () {
      BodyHight();
    });

    BodyHight();


    $(".main-menu-list .main-menu-item").click(function () {
      $("body").removeClass("menu-open");
    });

    // quantity input //
    $(".item-count-wrapper").on("click", ".plus", function (e) {
      let $input = $(this).prev("input.qty");
      let val = parseInt($input.val());
      $input.val(val + 1).change();
    });
    $(".item-count-wrapper").on("click", ".minus", function (e) {
      let $input = $(this).next("input.qty");
      var val = parseInt($input.val());
      if (val > 0) {
        $input.val(val - 1).change();
      }
    });

  }, [loading]);



  {/*  function belong to this component BackBtn*/ }

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth"
  //   });

  //   // Scroll .order-listing to top
  //   const orderListing = document.querySelector(".order-listing");
  //   if (orderListing) {
  //     orderListing.scrollTo({
  //       top: 0,
  //       behavior: "smooth"
  //     });
  //   }
  // };

  //  On scroll to hide the navbar and footer
  useEffect(() => {

    let lastScroll = 0;
    const listenToScroll = () => {
      const winScroll = document.querySelector(".order-listing").scrollTop ||
        document.documentElement.scrollTop;

      let totalHeight = document.querySelector(".order-listing").scrollHeight - 768;
      const fromTop = document.querySelector(".order-listing").scrollTop;
      // const body = document.querySelector("body");

      if (totalHeight < "0") { totalHeight = 0 }
      if (fromTop >= 70) {
        if (fromTop < totalHeight) {
          if (fromTop > lastScroll) {
            // down
            setVisibleFooter(true);
            // body.classList.add("scrolled");
            lastScroll = fromTop;
          } else {
            // up
            setVisibleFooter(false);
            // body.classList.remove("scrolled");
            lastScroll = fromTop;

          }
          // lastScroll = fromTop;
        } else {
          if (fromTop > totalHeight) {
            // down
            setVisibleFooter(true);
            // body.classList.add("scrolled");
            lastScroll = fromTop;
          } else {
            // up
            setVisibleFooter(false);
            // body.classList.remove("scrolled");
            lastScroll = fromTop;

          }
          return;
        }
      }


      if (winScroll > 270) {
        // Check if visible is false to avoid unnecessary setState
        if (!visible) {
          setVisible(true);
        }
      } else {
        // Check if visible is true to avoid unnecessary setState
        if (visible) {
          setVisible(false);
        }
      }
    };

    document.querySelector(".order-listing").addEventListener("scroll", listenToScroll);
    // return () => {
    //   document.querySelector(".order-listing").removeEventListener("scroll", listenToScroll);
    // };
  }, [visible]); // Include visible in the dependency array

  useEffect(() => {
    if (error || errorModifiers) {
      errorScrollTo();
    }
    // eslint-disable-next-line
  }, [error, errorModifiers]);
  
  useEffect(() => {
    if (clickedCardId) {
      centeringCard();
    }
    // eslint-disable-next-line
  }, [clickedCardId]);

  // on Click on menu list dropdown to open

  const errorScrollTo = () => {
    if (errorModifiers.length > 0) {
      const firstErrorId = errorModifiers[0];
      var container = $(".order-listing ");
      var scrollTo = $("#ModifierId_" + firstErrorId);
      var elBackgroundColor = $(`#ModifierId_${firstErrorId} .extra-features-list`);
      var labelName = $(`#ModifierId_${firstErrorId} .label-name`)[0].innerText;
      if (scrollTo.offset() !== undefined) {
        var divTopHeight = scrollTo.offset().top - 270;
        var containerTop = container.offset().top;

        container.stop().animate(
          {
            scrollTop:
              divTopHeight -
              containerTop +
              (container.scrollTop() - $("#top-menu").outerHeight()),
          },
          300
        );

        // Blink effect
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            elBackgroundColor.addClass("glow"); // Add class to trigger animation
            elBackgroundColor.css({ "background-color": "#ffe8e1" });
            setTimeout(() => {
              elBackgroundColor.removeClass("glow"); // Remove class after animation
            }, 100); // Duration of each blink (0.1s)
          }, i * 200); // Delay between each blink (0.2s)
        }
        setErrorLabel(labelName);
      }
      setErrorModifiers(errorModifiers.slice(1)); // Remove the first error from the array
    }
  };
  const centeringCard = () => {
    var container = $(".order-listing ");
    var scrollTo = $(`.${clickedCardId}` );
    
    console.log(scrollTo, "clickedCardId");
      if (scrollTo.offset() !== undefined) {
        var divTopHeight = scrollTo.offset().top - 270;
        var containerTop = container.offset().top;

        container.stop().animate(
          {
            scrollTop:
              divTopHeight -
              containerTop +
              (container.scrollTop() - $("#top-menu").outerHeight()),
          },
          300
        );
      }
  };

  return (
    <div id="main">
      {/* Popup Modal for modifires if didnt check the required options */}
      {/* <div className="modal-empty-wrapper" id="modalEmpty" onClick={modalClose}>
        <div className="modal-empty">
          <div className="close-modal-btn" onClick={modalClose}>

            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.8333 5.34175L14.6583 4.16675L9.99996 8.82508L5.34163 4.16675L4.16663 5.34175L8.82496 10.0001L4.16663 14.6584L5.34163 15.8334L9.99996 11.1751L14.6583 15.8334L15.8333 14.6584L11.175 10.0001L15.8333 5.34175Z" fill="#252424" />
            </svg>
          </div>
          <svg className="warning" xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
            <path d="M11 6.44925L17.9025 18.3751H4.09752L11 6.44925ZM11 2.79175L0.916687 20.2084H21.0834L11 2.79175Z" fill="#ED6C02" />
            <path d="M11.9167 15.6251H10.0834V17.4584H11.9167V15.6251Z" fill="#ED6C02" />
            <path d="M11.9167 10.1251H10.0834V14.7084H11.9167V10.1251Z" fill="#ED6C02" />
          </svg>

          {t("lblPleaseSelectAllRequiredOptions!")}
          <br />
          {errorLabel}
        </div>
      </div> */}



      <div id="main-wrapper">
        <div className="container p-0">
          <div className="order-listing position-relative">
            <div className="nav_overlay" id="closeDrawer" onClick={() => closeallOpenedModals()} />
            {/* Navbar links */}



            <TopFixMenu visible={visible} handleShow={handleShow} logoHead={logoHead} restaurantName={restaurantName}/>

            <OrderListItems />

            <BottomMenu
              countMin={countMin}
              setCountMin={setCountMin}
              countSec={countSec}
              setCountSec={setCountSec}
              visibleFooter={visibleFooter}
              timer={timer}
              setTimer={setTimer}
              handleShowPayment={handleShowPayment}
            />

          </div>
        </div>
      </div>

      {visible && <div className="overflow"></div>}

      {/* <BackBtn visible={visible} scrollToTop={scrollToTop} getTotalQuantityInKaart={getTotalQuantityInKaart()} /> */}

      {getTotalQuantityInKaart() > 0 && (

        <CartBar
          countMin={countMin}
          countSec={countSec}
          visible={visible}
          timer={timer}
        />
      )}

      {/**services open */}

      <ServiceListsModal />

      <LanguageListModal handleClose={handleClose} />

      <AlergensModal handleClose={handleClose} />

      <RequestBillMOdal />


      <CardListModal
        countMin={countMin}
        countSec={countSec}
        timer={timer}
      />

      {/* Like us  */}

      {/* modal */}

      {/* payment Screen */}

      <PayModal />

      {/* <ThankyouModal /> */}

      <HistoryModal />

      <PaymentModal showPaument={showPaument} handlePaymentClose={handlePaymentClose} handleShowPayment={handleShowPayment} handleShowPaymentMethod={handleShowPaymentMethod} />

      <PaymentMethodModal showPaumentMethod={showPaumentMethod} handlePaymentMethodClose={handlePaymentMethodClose} handleShowPayment={handleShowPayment} showPin={showPin} showCash={showCash} showQRpay={showQRpay} />

      {/* <PaymentCreditCardInfo showPaymentCardInfo={showPaymentCardInfo} handlePaymentCardInfoClose={handlePaymentCardInfoClose} handleShowPayment={handleShowPayment} handleShowPaymentMethod={handleShowPaymentMethod} /> */}

      <SettingsModal show={show} handleClose={handleClose} handleShow={handleShow} />

      <AboutModal />

      <RulesModal />

      <TabletmenukaartModal />

      {/* <FeedbackModal /> */}

      {visibility ? (
        <div className="preloader-wrap">
          <div className="preload-in">
            <img src={gradientLoader} alt="gradient loader" />
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {/* {loading ? <Loader /> : null} */}
    </div>
  );
};
export default Home;
