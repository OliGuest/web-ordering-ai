import { useContext } from "react";
import { Context } from "../context/kartItemContext";
// import { useCalculateTotalCartAmount } from "./useCalculateTotalCartAmount";
// EDIT OPTION IN BASKET
export const useRemoveProductFromCart = () => {
  const {
    kartItem,
    setmodifiredState,
    // setArr,
    // setkartItem,
    kartHistoryStore,
    setKartHistoryStore,
    deleteProductBasket,
  } = useContext(Context);

  // const [calculateTotalCartAmount] = useCalculateTotalCartAmount();

  const removeProductFromCart = (productId) => {
    if (kartItem && kartItem.length > 0) {
      let removeIndex = kartItem?.findIndex(
        (item) => item?.ProductId === productId
      );
      setmodifiredState([]);
      if (removeIndex !== -1) {
        
        //setArr(...updatedArr);
        // setkartItem(updatedArr);
        //calculateTotalCartAmount(updatedArr);
        
        deleteProductBasket([kartItem[removeIndex]]);

        // localStorage.setItem("kaartData", JSON.stringify(updatedArr));
      }
    } else {
      //todo MMO ne znam zosto e ovoj del
      let removeIndex = kartHistoryStore?.findIndex(
        (item) => item?.ProductId === productId
      );
      setmodifiredState([]);
      if (removeIndex !== -1) {
        let updatedArr = [
          ...kartHistoryStore.slice(0, removeIndex),
          ...kartHistoryStore.slice(removeIndex + 1),
        ];

        setKartHistoryStore(updatedArr);
        //calculateTotalCartAmount(updatedArr);
        deleteProductBasket(updatedArr);

        localStorage.setItem("kaartHistory", JSON.stringify(updatedArr));
      }
    }
  };

  return [removeProductFromCart];
};
