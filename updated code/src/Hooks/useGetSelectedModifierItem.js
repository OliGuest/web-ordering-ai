import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useGetSelectedModifierItem = () => {

  const { modifierSelectedTrue, setModifierSelectedTrue } = useContext(Context);

  // /** Check Modifier Selected */
  const getSelectedModifierItem = (data) => {
    var lastVal = modifierSelectedTrue;
    lastVal.push(data);
    setModifierSelectedTrue(lastVal);
  };

  return [getSelectedModifierItem];
};
