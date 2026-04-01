import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useMenuWarapper = () => {

  const {
    setModifierSelectedTrue,
    setquantityToKart,
    activeButton,
  } = useContext(Context);

  const menuWarapper = (data, index) => {
    // Reset modifier selection state
    setModifierSelectedTrue([]);
    // Set active card — this opens the ProductDetailSheet
    activeButton(data.ProductId);
    setquantityToKart(1);
  };

  return [menuWarapper];
};
