import { useContext } from "react";
import { Context } from "../context/kartItemContext";
var $ = require("jquery");

export const useClearPreviousSteps = ( ) => {

    const { togglePaymentReceievedModel, setRecievedOrder, handleClose } =
      useContext(Context);

      const clearPreviousSteps = () => {
        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER);

        // Clear any timeout/interval up to that id
        for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
        }

        togglePaymentReceievedModel();
        handleClose();
        setRecievedOrder(false);
        $(".js-timeout").text("00:5");
      };

    return [clearPreviousSteps];
}