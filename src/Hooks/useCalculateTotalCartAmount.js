import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useCalculateTotalCartAmount = () => {

    const { setTotal, setkartItem } = useContext(Context);

    const calculateTotalCartAmount = (kartItem) => {
      let sum = 0;
      
      kartItem?.forEach((item) => {
       
        let modifierPrice =
          item.quantity * item?.modifierPrice.length
            ? item?.modifierPrice?.reduce(
                (partialSum, a) => partialSum + a,
                0
              ) *
              item.quantity 
            : 0;
       
        let tot = Number(
          (item?.basePrice
            ? item.quantity * item?.basePrice 
            : item.quantity * item?.Price) + modifierPrice
            );
            
          

        sum += tot;
      });
      setTotal(sum.toFixed(2));
      setkartItem(kartItem);
    };

    return [calculateTotalCartAmount];
}