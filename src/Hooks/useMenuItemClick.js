import { Context } from "../context/kartItemContext";
import { useContext } from "react";

export const useMenuItemClick = () => {

     const { setsubCatIndex, setinititalIndex, toogleSubMenu } =
       useContext(Context);

      const menuItemClick = (index, data) => {
        // document.getElementById("closeDrawer").click();
        setinititalIndex(index);
        setsubCatIndex(data?.SubCategories[0].Products);
        setInterval(getElementAndSetToActive, 3000);

       toogleSubMenu(index)
        // setSearchSubCatIndex(data?.SubCategories[0].Products);
      };

      const getElementAndSetToActive = () => {

      }

    return [menuItemClick];
}