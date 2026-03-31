import { useContext } from "react";
import { Context } from "../context/kartItemContext";
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
        const el = document.querySelector(".js-timeout");
        if (el) el.textContent = "00:5";
      };

    return [clearPreviousSteps];
}