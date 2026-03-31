import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useUuid } from "./useUuid";
// import { useCountdown } from "./useCountdown";
import showNotification from "../services/notificationService";


export const usePostHistoryOrder = () => {

    const {
      setCartResetMode,
      path,
      note,
      adminServices,
      deviceId,
      setRecievedOrder,
      handleShow,
      curentTime
    } = useContext(Context);
    const [ uuid ] = useUuid();
    // const  {countdown} = useCountdown();

     const postHistoryOrder = () => {
       setCartResetMode("HISTORY");
       let kartHistory = JSON.parse(localStorage.getItem("kaartHistory"));
       let body = {
         OrderGuid: uuid(),
         SessionGuid: path?.validation,

        
         Items: kartHistory?.map((item, index) => {
           return {
             OrderTime: curentTime,
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
            //  countdown();
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

    return [postHistoryOrder];
}