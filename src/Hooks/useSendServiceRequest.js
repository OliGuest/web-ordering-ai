import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import showNotification from "../services/notificationService";

export const useSendServiceRequest = () => {

    const { adminServices, path, deviceId, setvisibility } =
      useContext(Context);
 
  const sendServiceRequest = (data) => {
    let body = {
      idMessage: data?.Id,
      messageUuid: data?.MessageUuid,
    };

    setvisibility(true)

    adminServices.postService(path, deviceId, body).then((resp) => {
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
  return [sendServiceRequest];
};
