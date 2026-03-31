import { useContext } from "react";
import { Context } from "../context/kartItemContext";

export const useOnHandleModifires = () => {
  const { searchSubCatIndex, setSearchSubCatIndex } = useContext(Context);

  const onHandleModifires = (e) => {
    let modifiresResults = searchSubCatIndex?.map((mainCategories) => {
      return {
        ...mainCategories,
        SubCategories: mainCategories.SubCategories?.map((item) => {
          return {
            ...item,
            Products: item.Products.map((product) => {
              return {
                ...product,
                ModifierWizards: product.ModifierWizards.map((modfireItem) => {
                  return {
                    ...modfireItem,
                    ModifierItemElements: modfireItem.ModifierItemElements.map(
                      (m_item) => {
                        const isChecked = m_item.Name === e.target.value;
                        // setMState(isChecked)
                        // if (isChecked) {

                        //   props.onModifireState(m_item);
                        return {
                          ...m_item,
                          selected: m_item?.selected
                            ? m_item?.selected
                            : isChecked,
                        };
                      }
                    ),
                  };
                }),
              };
            }),
          };
        }),
      };
    });
    setSearchSubCatIndex(modifiresResults);
  };

  return [onHandleModifires];
};