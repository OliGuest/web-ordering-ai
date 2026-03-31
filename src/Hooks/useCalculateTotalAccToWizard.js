import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useCalculateTotalAccToWizard =() => {
//   TODO for more than 1 modifiers
//   build modifired wizard list
    const { setDiscriptionTotal } = useContext(Context);

  const calculateTotalAccToWizard = (selectedModifierItemElements) => {
      let sum = 0;
      selectedModifierItemElements?.forEach((modifire) => {
          modifire.ModifierItemElements.forEach((item) => {
              if (item?.selected) {
                  sum += item?.Price;
              }
          });
      });

      setDiscriptionTotal(sum);
  };

  return [calculateTotalAccToWizard];
}