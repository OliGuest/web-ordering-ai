import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useAddClassToAddQuantity = () => {
  const { setaddRemoveIndex, setAddRemove } = useContext(Context);

  const addClassToAddQuantity = (data) => {
    setaddRemoveIndex(data);
    // addRemove ? setAddRemove(false) : setAddRemove(true);
    setAddRemove(true);
    //
  };
  return [addClassToAddQuantity];
};
