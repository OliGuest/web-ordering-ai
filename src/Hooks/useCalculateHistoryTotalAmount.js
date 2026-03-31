// import { useContext } from "react";
// import { Context } from "../context/kartItemContext";

// export const useCalculateHistoryTotalAmount = () => {
//   const { sethistoryTotal } = useContext(Context);

//   const calculateHistoryTotalAmount = (kartItem) => {
//     let sum = 0;
//     kartItem.forEach((item) => (sum += Number(item?.quantity * item?.Price)));
//     sethistoryTotal(sum.toFixed(2));
//   };

//   return [calculateHistoryTotalAmount];
// };
