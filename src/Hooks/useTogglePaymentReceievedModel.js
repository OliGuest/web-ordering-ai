import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useTogglePaymentReceievedModel = () => {

 const { setPaymentReceived } = useContext(Context);


 const togglePaymentReceievedModel = () => {
   //setPaymentReceived(!paymentReceieved);
   setPaymentReceived(false);
 };

return [ togglePaymentReceievedModel];
}