import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useCalculateTotalCartAmount } from "./useCalculateTotalCartAmount";

export const useMinusQuantityKart = () => {

    const {
      kartItem,
      setArr,
      setKartHistoryStore,
      kartHistoryStore,
      setItemsOnTheKartHistory,
      sendDataToServer,
    } = useContext(Context);
    
    const [ calculateTotalCartAmount ] = useCalculateTotalCartAmount();

    const minusQuantityKart = (data) => {
      
      if (kartItem.length > 0) {
        let finddata = kartItem.find((item) => item === data);
        let newIndex = kartItem.indexOf(finddata);
        let kaartItemArr = [];
        
        if (kartItem[newIndex] !== undefined) {
          
          if (
            kartItem[newIndex] !== undefined &&
            kartItem[newIndex].quantity === 1
          ) {
          
            kaartItemArr = [ { ...kartItem[newIndex], quantity: /*data.quantity*/ -1 } ];
          } else {
           

            kaartItemArr = [ { ...kartItem[newIndex], quantity: /*data.quantity*/ -1 } ];
            // Old code for adding all products in array and sending to server
            // kaartItemArr = [
            //   ...kartItem.slice(0, newIndex),
            //   { ...kartItem[newIndex], quantity: /*data.quantity*/ -1 },
            //   ...kartItem.slice(newIndex + 1),
            // ];
          }
          setArr(kaartItemArr);
          //setkartItem(kaartItemArr);
          sendDataToServer(kaartItemArr);
          //calculateTotalCartAmount(kaartItemArr);

          localStorage.setItem("kaartData", JSON.stringify(kartItem));
        }
      } else {
        let nfinddata = kartHistoryStore.find(
          (item) => item.ProductId === data.ProductId
        );
        let nNewindex = kartHistoryStore.indexOf(nfinddata);

        if (kartHistoryStore[nNewindex] !== undefined) {
          if (
            kartHistoryStore[nNewindex] !== undefined &&
            kartHistoryStore[nNewindex].quantity === 1
          ) {
            setKartHistoryStore([
              ...kartHistoryStore.slice(0, nNewindex),
              ...kartHistoryStore.slice(nNewindex + 1),
            ]);
            localStorage.setItem(
              "kaartHistory",
              JSON.stringify(kartHistoryStore)
            );
          } else {
            setKartHistoryStore([
              ...kartHistoryStore.slice(0, nNewindex),
              { ...kartHistoryStore[nNewindex], quantity: data.quantity - 1 },
              ...kartHistoryStore.slice(nNewindex + 1),
            ]);
            localStorage.setItem(
              "kaartHistory",
              JSON.stringify(kartHistoryStore)
            );
          }

          calculateTotalCartAmount(kartHistoryStore);
          setItemsOnTheKartHistory(kartHistoryStore);
        }
      }
    };
    return [minusQuantityKart];
}