import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import showNotification from "../services/notificationService";

export const useSendPayWithCashRequest = () => {

    const { adminServices, path, deviceId, setvisibility } =
      useContext(Context);
 
  const sendPayWithCashRequest = (data) => {

    setvisibility(true)

    adminServices.postPayWithCashService(path, deviceId).then((resp) => {
      if (resp?.status === 200) {
        setvisibility(false)
        showNotification("success", "Service has been successfully send");
      } else {
        setvisibility(false)
        setvisibility(false);
        showNotification("danger", "Something Went wrong");
      }
    });
  };
  return [sendPayWithCashRequest];
};
