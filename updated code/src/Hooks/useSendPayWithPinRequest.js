import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import showNotification from "../services/notificationService";

var $ = require("jquery");

export const useSendPayWithPinRequest = () => {

    const { adminServices, path, deviceId, setvisibility } =
      useContext(Context);
 
  const sendPayWithPinRequest = () => {
    setvisibility(true)

    adminServices.postPayWithPinService(path, deviceId).then((resp) => {
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
  return [sendPayWithPinRequest];
};
