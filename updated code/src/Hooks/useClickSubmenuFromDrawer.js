import { useContext } from "react";
import { Context } from "../context/kartItemContext";
var $ = require("jquery");

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

      var topMenu = $("#top-menu"),

        menuItems = topMenu.find("a");
 
      menuItems
        .removeClass("active")
        .filter("[subcatid='" + mapData.SubCategoryId + "']")
        .addClass("active");

      var container = $(".order-list-body");
      var scrollTo = $("#menu-list-wrapper-" + mapData.SubCategoryId);

      if (scrollTo.offset() !== undefined) {
        var divTopHeight = scrollTo.offset().top +20;
        var containerTop = container.offset().top;

        container.stop().animate(
          {
            scrollTop:
              divTopHeight -
              containerTop +
              (container.scrollTop() - $("#top-menu").outerHeight()),
          },
          300
        );

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
