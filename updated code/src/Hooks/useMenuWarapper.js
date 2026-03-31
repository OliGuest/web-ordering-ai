import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useAddClassToAddQuantity } from "./useAddClassToAddQuantity";

export const useMenuWarapper = () => {
  
  const [addClassToAddQuantity] = useAddClassToAddQuantity();

  const {
    setModifierSelectedTrue,
    setquantityToKart,
    activeButton,
  } = useContext(Context);

  const menuWarapper = (data, index) => {
    // set Blank - during selection of other product : because reset -Required Modifire check
    setModifierSelectedTrue([]);
      activeButton(data.ProductId);

    setquantityToKart(1);
  
    if (data?.ProductDetails?.MenuItems.length > 0) {
      // setDescriptionData(data);
      // document.body.classList.add("open-detail");
      // activeButton(data.ProductId);
    } else {
      addClassToAddQuantity(data.ProductId);
    }
  };

  return [menuWarapper];
};
