import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useCalculateTotalCartAmount } from "./useCalculateTotalCartAmount";

export const useAddQuantityKArt = () => {


    const { kartItem, kartHistoryStore, sendDataToServer } =
      useContext(Context);
    const [ calculateTotalCartAmount ] = useCalculateTotalCartAmount();
  //adding quanting to kart items

  const addQuantityKArt = (data) => {
    if (kartItem.length > 0) {
      let finddata = kartItem.find((item) => item === data);
      let newIndex = kartItem.indexOf(finddata);
      let kartItemAdd = [];
      kartItemAdd = [
        {
          ...kartItem[newIndex],
          quantity: /*data.quantity +*/ 1
        },
      ];
      
      // Old code for adding all products in array and sending to server
      // kartItemAdd = [
      //   ...kartItem.slice(0, newIndex),
      //   { ...kartItem[newIndex], quantity: /*data.quantity +*/ 1 },
      //   ...kartItem.slice(newIndex + 1),
      // ];
      // setkartItem(kartItemAdd);
      sendDataToServer(kartItemAdd);
      localStorage.setItem("kaartData", JSON.stringify(kartItem));
      // calculateTotalCartAmount(kartItemAdd);
    } else {
      let nfinddata = kartHistoryStore.find(
        (item) => item.ProductId === data.ProductId
      );
      let nindex = kartHistoryStore?.indexOf(nfinddata);
      kartHistoryStore[nindex].quantity = kartHistoryStore[nindex].quantity + 1;
      // setkartItem(kartItem);
      localStorage.setItem("kaartHistory", JSON.stringify(kartHistoryStore));
      calculateTotalCartAmount(kartHistoryStore);
    }
  };

  return [addQuantityKArt];
}