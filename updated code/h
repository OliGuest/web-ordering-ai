[1mdiff --git a/src/screens/home/home.jsx b/src/screens/home/home.jsx[m
[1mindex ce0e90e..add094a 100644[m
[1m--- a/src/screens/home/home.jsx[m
[1m+++ b/src/screens/home/home.jsx[m
[36m@@ -53,7 +53,8 @@[m [mconst Home = (props) => {[m
   const [show, setShow] = useState(false);[m
   const [paymentReceieved, setPaymentReceived] = useState(false);[m
   const [recievedOrder, setRecievedOrder] = useState(false);[m
[31m-[m
[32m+[m[32m  const [itemsOnTheHistory, setItemsOnTheKartHistory] = useState([]);[m
[32m+[m[32m  const [historyTotal, sethistoryTotal] = useState(0.0);[m
   const handleClose = () => setShow(false);[m
   const handleShow = () => setShow(true);[m
   const togglePaymentReceievedModel = () => {[m
[36m@@ -93,6 +94,17 @@[m [mconst Home = (props) => {[m
   }, []);[m
 [m
   useEffect(() => {[m
[32m+[m[32m    function BodyHight() {[m
[32m+[m[32m      var hh = $(window).innerHeight();[m
[32m+[m[32m      $("body").css("hight", hh);[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    $(window).resize(function () {[m
[32m+[m[32m      BodyHight();[m
[32m+[m[32m    });[m
[32m+[m
[32m+[m[32m    BodyHight();[m
[32m+[m
     $(".add-qauntity").on("click", function () {[m
       $(this)[m
         .closest(".menu-list-item")[m
[36m@@ -191,19 +203,24 @@[m [mconst Home = (props) => {[m
       $(".order-list-body").css("height", itemTargetheight);[m
       // end get height for scroll[m
     });[m
[31m-[m
[31m-    /////////new work[m
   }, []);[m
 [m
   // get kartdata from local storage[m
   useEffect(() => {[m
     let kartItem = JSON.parse(localStorage.getItem("kaartData"));[m
[32m+[m[32m    let kartHistory = JSON.parse(localStorage.getItem("kaartHistory"));[m
     if (kartItem) {[m
       setkartItem(kartItem);[m
       calculateTotalCartAmount(kartItem);[m
     } else {[m
       setkartItem([]);[m
     }[m
[32m+[m[32m    if (kartHistory) {[m
[32m+[m[32m      setItemsOnTheKartHistory(kartHistory);[m
[32m+[m[32m      calculateHistoryTotalAmount(kartHistory);[m
[32m+[m[32m    } else {[m
[32m+[m[32m      setItemsOnTheKartHistory([]);[m
[32m+[m[32m    }[m
   }, []);[m
 [m
   const setState = () => {[m
[36m@@ -366,6 +383,7 @@[m [mconst Home = (props) => {[m
     addRemove ? setAddRemove(false) : setAddRemove(true);[m
   };[m
   const addQuantityAndRemoveClass = (data) => {[m
[32m+[m[32m    debugger;[m
     if (quantityToKart !== "" && quantityToKart > 0) {[m
       data.quantity = quantityToKart;[m
       let finddata = arr.find((item) => item.ProductId == data.ProductId);[m
[36m@@ -471,6 +489,11 @@[m [mconst Home = (props) => {[m
     kartItem.forEach((item) => (sum += Number(item?.quantity * item?.Price)));[m
     setTotal(sum.toFixed(2));[m
   };[m
[32m+[m[32m  const calculateHistoryTotalAmount = (kartItem) => {[m
[32m+[m[32m    let sum = 0;[m
[32m+[m[32m    kartItem.forEach((item) => (sum += Number(item?.quantity * item?.Price)));[m
[32m+[m[32m    sethistoryTotal(sum.toFixed(2));[m
[32m+[m[32m  };[m
 [m
   const handleTipAddClick = (e, tipValue) => {[m
     e.preventDefault();[m
[36m@@ -544,22 +567,17 @@[m [mconst Home = (props) => {[m
   };[m
 [m
   const resetCartToInitialMode = () => {[m
[32m+[m[32m    //set history data[m
[32m+[m[32m    arr = [];[m
[32m+[m[32m    localStorage.setItem("kaartHistory", JSON.stringify(kartItem));[m
[32m+[m[32m    setItemsOnTheKartHistory(kartItem);[m
[32m+[m[32m    calculateHistoryTotalAmount(kartItem);[m
     localStorage.removeItem("kaartData");[m
     setkartItem([]);[m
     setTotal(0);[m
     setTipTotal(0.0);[m
   };[m
 [m
[31m-  const toggleMenuBar = () => {[m
[31m-    console.log("menu toggle");[m
[31m-    if (menuToggle) {[m
[31m-      setmenuToggle(false);[m
[31m-      document.body.classList.add("menu-open");[m
[31m-    } else {[m
[31m-      document.body.classList.remove("menu-open");[m
[31m-    }[m
[31m-  };[m
[31m-[m
   return ([m
     <div id="main">[m
       <div id="main-wrapper">[m
[36m@@ -2454,6 +2472,32 @@[m [mconst Home = (props) => {[m
                       </div>[m
                     ))}[m
                   </div>[m
[32m+[m
[32m+[m[32m                  <div className="items-bill">[m
[32m+[m[32m                    <h6 className="sm-heading">Items on the Bill</h6>[m
[32m+[m[32m                    {itemsOnTheHistory.map((item) => ([m
[32m+[m[32m                      <div className="menu-list-item d-flex">[m
[32m+[m[32m                        <div className="item-img mr-11">[m
[32m+[m[32m                          <img[m
[32m+[m[32m                            src={item?.SmallPictureUrl}[m
[32m+[m[32m                            alt="menu-item-img"[m
[32m+[m[32m                          />[m
[32m+[m[32m                        </div>[m
[32m+[m[32m                        <div className="item-content ">[m
[32m+[m[32m                          <div className="item-inner-content add-qauntity d-flex">[m
[32m+[m[32m                            <div className="item-left-text mr-23 disabled">[m
[32m+[m[32m                              <h6 className="mb-15">{item?.Name}</h6>[m
[32m+[m[32m                              <p>{"X" + item?.quantity}</p>[m
[32m+[m[32m                            </div>[m
[32m+[m[32m                            <h6 className="item-price ml-auto">[m
[32m+[m[32m                              {"€" +[m
[32m+[m[32m                                Number(item.quantity * item?.Price).toFixed(2)}[m
[32m+[m[32m                            </h6>[m
[32m+[m[32m                          </div>[m
[32m+[m[32m                        </div>[m
[32m+[m[32m                      </div>[m
[32m+[m[32m                    ))}[m
[32m+[m[32m                  </div>[m
                 </div>[m
 [m
                 <div className="cart-modal-footer">[m
[36m@@ -2517,6 +2561,7 @@[m [mconst Home = (props) => {[m
                         </ul>[m
                       </div>[m
                       <div className="tip-amount">[m
[32m+[m[32m                        {/* <p>€0.00</p> */}[m
                         <p>{"€" + tipTotal}</p>[m
                       </div>[m
                     </div>[m
[36m@@ -2525,7 +2570,12 @@[m [mconst Home = (props) => {[m
                     <div className="d-flex align-items-center justify-content-between">[m
                       <p className="total-hd">Total</p>[m
                       <p className="total-price">[m
[31m-                        {"€" + (Number(tipTotal) + Number(total)).toFixed(2)}[m
[32m+[m[32m                        {"€" +[m
[32m+[m[32m                          ([m
[32m+[m[32m                            Number(tipTotal) +[m
[32m+[m[32m                            Number(total) +[m
[32m+[m[32m                            Number(historyTotal)[m
[32m+[m[32m                          ).toFixed(2)}[m
                       </p>[m
                     </div>[m
                   </div>[m
[36m@@ -2534,7 +2584,6 @@[m [mconst Home = (props) => {[m
                       href="javascript:void(0);"[m
                       id="place-order"[m
                       className="butn butn-orange w-100"[m
[31m-                      onClick={paymentNextHandler}[m
                     >[m
                       Place order[m
                     </a>[m
