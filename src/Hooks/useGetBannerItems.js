import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useGetBannerItems= () => {
    //get banner items according to categories
    const {

      bannerItems,
      subCatIndex
    
    } = useContext(Context);

    const getBannerItemsAccToCategories = () => {

        const result = bannerItems.filter((banner) =>
            subCatIndex.find(
                (catgory) => catgory?.SubCategoryId === banner?.SubCategoryId
            )
                ? true
                : false
        );
        return result;
    };

    return[getBannerItemsAccToCategories];
}