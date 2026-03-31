import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useGetOrderHistoryDetails = () => {

  const { adminServices, path, deviceId, setOrderHistory, setSubTotalServiceFee } =
      useContext(Context);

          /**to get history details */

        const getOrderHistoryDetails = () => {
          // debugger
          adminServices.getOrderHistory(path, deviceId).then((res) => {
            if (res?.data?.IsSuccess === true) {
              // setOrderHistory([res?.data?.Data[0]?.Order.Items]);
              // res?.data?.Data?.filter(data => setOrderHistory(data?.Order?.Items));
              // localStorage.setItem("HistoryOrders", JSON.stringify(res?.data?.Data));
              console.log(res?.data?.Data, "res?.data?.Data")
              setOrderHistory(res?.data?.Data?.BillRounds);
              setSubTotalServiceFee(res?.data?.Data?.BillTotal);
              // setOrderHistory( [res?.data?.Data?.Order.Items.Item])
            } else {
              localStorage.removeItem("HistoryOrders");
              // setOrderHistory([]);
            }
          });
        };

    return [getOrderHistoryDetails];
}