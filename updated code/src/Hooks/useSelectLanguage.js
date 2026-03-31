import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useTranslation } from "react-i18next";
var $ = require("jquery");


export const useSelectLanguage = () => {
    const { i18n } = useTranslation();


    const { setDefaultLang, setCurrentLanguage, setCurrentLanguageCode } =
      useContext(Context);


  /**
   * Language Selection
   *
   * @param {*} index
   * @param {*} langData_Locale
   * @param {*} langData_Name
   * @param {*} langData
   */

  const selectLanguage = (index, langData_Locale, langData_Name, langData) => {
    i18n.changeLanguage(langData_Locale);

    setDefaultLang(index);
    setCurrentLanguage(langData_Name);
    setCurrentLanguageCode(langData_Locale);

    localStorage.setItem("languageIndex", index);

    localStorage.setItem("currentLanguageCodeStore", langData_Locale);

    // Remove Lang selection

    $("body").removeClass("service-bar-toggle");

    //getResourcesData(index);
  };

  return [selectLanguage];
};
