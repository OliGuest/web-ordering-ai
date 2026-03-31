import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import * as adminServices from "../../services/adminService";
// import Loader from "../../components/common/Loader";
import "./Login.css";
import { Context } from "../../context/kartItemContext";
import { useState } from "react";
// import Flag from 'react-world-flags';

// const $ = require("jquery");

function Login() {

  const {
    t,
    setNameValue,
    setSecondScreen,
    secondScreen,
    nameValue,
    houseRules,
    // JoinTable,
    getResourcesWithParams

  } = useContext(Context);

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [logoImage, setlogoImage] = useState();
  // const [activeColor, setActiveColor] = useState();
  const [activeTheme, setActiveTheme] = useState();
  const [coverImage, setCoverImage] = useState();

  useEffect(() => {
    let paramsValue = queryString.parse(location.search);
    if(Object.keys(paramsValue).length !== 0){
      sessionStorage.setItem("theParams", JSON.stringify(paramsValue))
    }
    
    let check = localStorage.getItem("deviceId");
    if (!check) {
      //generate and set the id
      var userID = uuid();
      localStorage.setItem("deviceId", userID);
    }
    let checkUsername = localStorage.getItem("username");
    if (checkUsername) {
      setNameValue(checkUsername)
    }
    getResourcesWithParams();
    getResourcesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResourcesData = () => {
    setLoading(true);
    adminServices.getResources().then((resp) => {
      if (resp) {

        setLoading(false);
        setCoverImage(resp?.data?.ThemeResponse.CoverImage.Url)
        setlogoImage(resp?.data?.ThemeResponse.LogoImage.Url);
        // setActiveColor(resp?.data?.ThemeResponse?.ActiveColor);
        setActiveTheme(resp?.data?.ThemeResponse?.ThemeType);
      }
    })

  };

  const onChangeHandler = event => {
    setNameValue(event);
    setSecondScreen(true);
    localStorage.setItem("username", event);
  };

  useEffect(() => {
    setSecondScreen(true);
    // eslint-disable-next-line
  }, [secondScreen])


  //generate uuid
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

  // $(document).ready(function () {
  //   var innerHeight = window.innerHeight;

  //   $(".landing-page").css("min-height", innerHeight);
  // });

  return (
    <div id="main-wrapper">
        <div className="landing-page" style={{ backgroundImage: ` url(${coverImage})` }}>

          {/* <Link className="landing-logo" to="#">
            <span className="start-met" >
              {!loading && <img src={logoImage ? logoImage : ''} alt="Loading..." />}
            </span>
          </Link> */}
          {/* <div className="landing-welcome-content">
            <h2 className="welcome-heading mb-20">
              {t("IbIWelcomeHeading")}
            </h2>
            <p className="welcome-text mb-0">
              {t("IbIWelcomeText")}
            </p>
          </div> */}
          <div className="landing-footer">
            <div className="input-group input-Name">
              <span className="placeholderName">{t("IbIWriteYourNamePlaceholder")}</span>
              <input type="text" className="form-control" value={nameValue} onChange={e => onChangeHandler(e.target.value)} placeholder="" aria-label="Writeyourname" aria-describedby="addon-wrapping" />
            </div>
            <Link to={{ pathname: '/landing', state: houseRules }} className={"butn butn continue-btn"} style={{ textDecoration: "none", backgroundColor: `#D98F29` }} >
            <span style={{ color: `${activeTheme === "2" ? "#4D4D4D" : "#ffffff"}` }}>  {t('lblContinueOrdering')} </span>
            </Link>
          </div>
        </div>
      {loading ? (
        // <Loader />
          <div className="preloader-wrap">
            <div className="preload-in">
              <i className="fad fa-spinner-third"></i>
            </div>
          </div>
      ) : null}
    </div>
  );
}

export default Login;
