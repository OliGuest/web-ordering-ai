import { useContext } from "react";
import { Context } from "../context/kartItemContext";
export const useClickSubmenuFromDrawer = () => {
  const {
    setsearchText,
    setinitialIndexTab,
    setinititalIndex,
    setsubCatIndex,
    setaddRemoveIndex,
  } = useContext(Context);

  const ClickSubmenuFromDrawer = (
    indexSub,
    SubCatdata,
    data,
    index,
    mapData
  ) => {
    setinitialIndexTab(indexSub);

    document.getElementById("closeDrawer").click();
    setinititalIndex(index);

    // setsubCatIndex(SubCatdata[index].Products)
    // setSearchSubCatIndex(SubCatdata[index].Products)

    setTimeout(() => {
      setsubCatIndex([]);

      // Sidebar Menu - click on Leftside Bar

      const topMenu = document.getElementById("top-menu");
      if (topMenu) {
        topMenu.querySelectorAll("a").forEach(a => {
          a.classList.remove("active");
          if (a.getAttribute("subcatid") === String(mapData.SubCategoryId)) {
            a.classList.add("active");
          }
        });
      }

      const container = document.querySelector(".order-list-body");
      const scrollTo = document.getElementById("menu-list-wrapper-" + mapData.SubCategoryId);
      if (container && scrollTo && topMenu) {
        const divTopHeight = scrollTo.getBoundingClientRect().top;
        const containerTop = container.getBoundingClientRect().top;
        container.scrollTo({
          top: divTopHeight - containerTop + container.scrollTop - topMenu.offsetHeight,
          behavior: 'smooth'
        });
      }

      // End Sidebar Menu - click on Leftside Bar
    }, 100);

    setTimeout(() => {
      setsubCatIndex(SubCatdata);
      setaddRemoveIndex(-1);
    }, 200);

    // setSearchSubCatIndex(SubCatdata);

    setsearchText("");

    // End Updated code for direct click on Sidebar Menu
  };

  return [ClickSubmenuFromDrawer];
};
