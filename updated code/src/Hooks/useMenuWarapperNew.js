import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useAddClassToAddQuantity } from "./useAddClassToAddQuantity";

export const useMenuWarapperNew = () => {

    const { setquantityToKart, setDescriptionData, } = useContext(Context);
    const [ addClassToAddQuantity ] = useAddClassToAddQuantity();

       const menuWarapperNew = (data, index) => {
         setquantityToKart(data.quantity);
         if (data?.ProductDetails?.MenuItems.length > 0) {
          //  setDescriptionData(data);
           document.body.classList.add("open-detail");
           // let temp=document.getElementById(data?.selectedModifiersData[0]?.mProductId);
           // temp.checked=true;
         } else {
           addClassToAddQuantity(index);
         }
       };
    return [menuWarapperNew];
}