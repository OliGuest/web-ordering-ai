import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useAddQuantity = () => {

    const { setquantityToKart, setdisplayTotalForBottomPopup, quantityToKart } =
      useContext(Context);
    
    const addQuantity = (data) => {
      setquantityToKart(quantityToKart + 1);
      setdisplayTotalForBottomPopup((quantityToKart + 1) * data?.Price);
    };

    return [addQuantity];
}