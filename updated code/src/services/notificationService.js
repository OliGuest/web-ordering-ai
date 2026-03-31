/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import countdown from "../assets/img/InfoOutlined.png"

toast.configure();

const showNotification = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 1500,
        theme: "colored",
      });
      break;
    case "danger":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 1500,
        theme: "colored",
      });
      break;
    case "warning":
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 3000,
        theme: "colored",
        toastId: "warning1"
      });
      break;
    case "info":
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 1500,
        theme: "colored",
      });
      break;
    case "countdown":
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        icon: ({ theme, type }) => <img src={`${countdown}`} alt="test" />,
        theme: "light",
      });
      break;
    case "default":
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 1500,
      });
      break;
    default:
      break;
  }
};

export default showNotification;
