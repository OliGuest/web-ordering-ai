import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useGetProductQuantityInCart = () => {

    const { kartItem } = useContext(Context);

  const getProductQuantityInCart = (data) => {
      let qunatityToDisplay = kartItem.find(
          (kartItem) => kartItem?.ProductId === data?.ProductId
      )?.quantity;

      return qunatityToDisplay ? qunatityToDisplay : "";
  };

  return [getProductQuantityInCart];
}