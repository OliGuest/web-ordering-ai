import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useRecievedOrder = () => {
    
  const { setRecievedOrder } = useContext(Context);

  const handleRecievedOrderClose = () => {
    setRecievedOrder(false);
  };
  // const handleRecievedOrderOpen = () => setRecievedOrder(true);
  return [ handleRecievedOrderClose];
};
