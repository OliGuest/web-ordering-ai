import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useMinusQuantity = () => {

    const { quantityToKart, setquantityToKart, setdisplayTotalForBottomPopup } =
      useContext(Context);

   const minusQuantity = (data) => {
     if (quantityToKart === 1) {
       // no op
       setquantityToKart(1);
     } else {
       setquantityToKart(quantityToKart - 1);
       setdisplayTotalForBottomPopup((quantityToKart - 1) * data);
     }
   };
    return [minusQuantity];
}