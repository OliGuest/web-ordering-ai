import { useContext, useEffect } from "react";
import { Context } from "../context/kartItemContext";
import { useUuid } from "./useUuid";
// import { usePaymentNextHandler } from "./usePaymentNextHandler";
// import { useCountdown } from "./useCountdown";
import showNotification from "../services/notificationService";
import { usePostHistoryOrder } from "./usePostHistoryOrder";

export const usePlaceOrderHandler = () => {
  const {
    kartItem,
    setCartResetMode,
    path,
    note,
    adminServices,
    // paymentNextHandler,
  } = useContext(Context);

  const [uuid] = useUuid();
  // const [paymentNextHandler] = usePaymentNextHandler();
  // const [countdown] = useCountdown();
  const [postHistoryOrder] = usePostHistoryOrder();

  //place order

  useEffect(() => {

  },[])

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
              name: item.Name
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
      let deviceId = localStorage.getItem("deviceId");
      adminServices.postOrder(path, deviceId, body).then((res) => {
        if (res?.data?.IsSuccess === true) {
          // This function paymentNextHandler() and state setshowFbLike removed from checkout button and Checkout Button also remove - as per 12 Aug Client Call 
          //paymentNextHandler();
          // setshowFbLike(false);
          //clearBasketData();
          // END

          // setRecievedOrder(true);

        // if (status === "Stopped") {
        //   handleStart();
        // }else if(status === "Started"){
        //   handleReset();
        //   handleStart();
        // }
        } else {
          showNotification("danger", "can't send request at this moment");
        }
      });
    } else {
      setCartResetMode("HISTORY");
      postHistoryOrder();
    }
   
    
    // setkartItem([]);
  };

  return [placeOrderHandler];
};
