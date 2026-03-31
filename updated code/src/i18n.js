import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const apiKey = "Ym_7XyWyX0Hw1tDvy0AP3g";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "nl",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: ["nl","mk","en","tr", "fr"],
    
    backend: {
      loadPath: loadPath
    }
  })