// import { useContext } from "react";
// import { Context } from "../context/kartItemContext";
// import { useCalculateHistoryTotalAmount } from "./useCalculateHistoryTotalAmount";

// export const useResetCartToInitialMode = () => {

//     const {
//       cartResetMode,
//       setItemsOnTheKartHistory,
//       setArr,
//       temp,
//       kartItem,
//       setkartItem,
//       setKartHistoryStore,
//       setTipTotal,
//       setTotal, 
      
//     } = useContext(Context);

//       const [calculateHistoryTotalAmount] = useCalculateHistoryTotalAmount();
 
 
//   const resetCartToInitialMode = () => {


//     //set history data
//   // setArr([]);
//   //   kartItem?.map((data) => {
//     //   temp.push(data);
//     // });

//     // localStorage.setItem("kaartHistory", JSON.stringify(temp));
//     // setItemsOnTheKartHistory(kartItem);
//     // calculateHistoryTotalAmount(kartItem);
//     // localStorage.removeItem("kaartData");
//     // setkartItem([]);
//     setTotal(0);
//     // if (!kartHistoryStore)
//       setKartHistoryStore(JSON.parse(localStorage.getItem("kaartHistory")));
//     // setTipTotal(0.0);

//     //reset cart data history
//     if (cartResetMode === "HISTORY") {
//       setItemsOnTheKartHistory([]);
//       localStorage.removeItem("kaartHistory");
//     } else {
//       //set history data
//       setArr([]);
//       // eslint-disable-next-line
//       kartItem?.map((data) => {
//         temp.push(data);
//       });
//       localStorage.setItem("kaartHistory", JSON.stringify(temp));

//       setItemsOnTheKartHistory(kartItem);
//       calculateHistoryTotalAmount(kartItem);
//       localStorage.removeItem("kaartData");

//       setkartItem([]);
//       // setTotalSum(0);
//       // if(!kartHistoryStore)
//       setKartHistoryStore([]);
//       setKartHistoryStore(JSON.parse(localStorage.getItem("kaartHistory")));
//       // localStorage.removeItem("kaartData");
//     }
//     setTipTotal(0.0);
//   };
//     return [resetCartToInitialMode];
// }