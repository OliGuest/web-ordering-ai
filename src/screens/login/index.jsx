import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as adminServices from "../../services/adminService";
import queryString from 'query-string'
import Loader from "../common/Loader";
import { useTranslation } from "react-i18next";
import styles from './Login.module.scss';

function Login() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [logoImage, setlogoImage] = useState();
  const [activeColor, setActiveColor] = useState();
  const [activeTheme, setActiveTheme] = useState();
  const location = useLocation();

  useEffect(() => {
    getResourcesData();
    let paramsValue = queryString.parse(location.search);
    localStorage.setItem("theParams", JSON.stringify(paramsValue))
    let check = localStorage.getItem("deviceId");
    if (!check) {
      var userID = uuid();
      localStorage.setItem("deviceId", userID);
    }
  }, []);

  const getResourcesData = () => {
    setLoading(true);
    adminServices.getResources().then((resp) => {
      if (resp) {
        setLoading(false);
        setlogoImage(resp?.data?.ThemeResponse.LogoImage.Url);
        setActiveColor(resp?.data?.ThemeResponse?.ActiveColor);
        setActiveTheme(resp?.data?.ThemeResponse?.ThemeType);
      }
    })
  };

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const textColor = activeTheme === "1" ? "#ffffff" : "#1a1a1a";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <img
            src={logoImage || ''}
            alt="Logo"
            className={styles.logo}
          />
        </div>

        <div className={styles.welcome}>
          <h2>Welcome to Tabletmenukaart</h2>
          <p>
            The place where the food is hot and the drinks are cold and the
            service is great!
          </p>
        </div>

        <div className={styles.actions}>
          <Link
            to="/home"
            className={styles.btnPrimary}
            style={{
              backgroundColor: activeColor,
              color: textColor,
              textDecoration: "none"
            }}
          >
            {t('lblContinueOrdering')}
          </Link>

          <div className={styles.secondaryButtons}>
            <button
              className={styles.btnSecondary}
              style={{ color: activeColor }}
            >
              Service
            </button>
            <button
              className={styles.btnSecondary}
              style={{ color: activeColor }}
            >
              Afrekenen
            </button>
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default Login;
