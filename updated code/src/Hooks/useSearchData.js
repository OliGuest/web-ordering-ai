import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useSearchData = () => {
  const { index, setSearchSubCatIndex } = useContext(Context);

  let searchResult;

  const searchdata = (text) => {
    // let searchdata = index;

    searchResult = index?.map((mainCategories) => {
      return {
        ...mainCategories,
        SubCategories: mainCategories.SubCategories?.map((item) => {
          return {
            ...item,
            Products: item.Products.filter((product) =>
              product.Name.toLowerCase().includes(text.toLowerCase())
            ),
          };
        }),
      };
    });
    setSearchSubCatIndex(searchResult);
  };

  return [searchdata];
};
