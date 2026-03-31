import { React, useContext, useEffect } from "react";
import { Context } from "../../context/kartItemContext";
import "./LandingPage.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useMenuItemClick } from "../../Hooks/useMenuItemClick";
import HeaderMain from "../../components/TopFixMenu/HeaderMain/HeaderMain";
import CoverImgAndLogo from "../../components/TopFixMenu/CoverImgAndLogo/CoverImgAndLogo";

const LandingPage = () => {

    const { t, nameValue, setNameValue, index, activeTheme, categoriesScreenLayoutType, logoHead, getResourcesWithParams, JoinTable } = useContext(Context);
    const [menuItemClick] = useMenuItemClick();

    let checkUsername = localStorage.getItem("username");
    useEffect(() => {
        if (checkUsername) {
            setNameValue(checkUsername)
        }
        // eslint-disable-next-line 
    }, [setNameValue])

    useEffect(() => {

        // getResourcesWithParams();
        JoinTable();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="main-wrapper-landing">

            {/* <img src={landingPage} alt="Landing Page" /> */}
            {/* <div className="landing-text">
                    <h2 style={{
                        // color: `${activeTheme === "1" ? "black" : "white"}`,
                    }} >{t("IbIChooseYourPleasure")}</h2>
                    <p
                        style={{
                            // color: `${activeTheme === "1" ? "black" : "white"}`,
                        }}>Shabu Shabu Restaurant</p>
                </div> */}

            <HeaderMain />
            <CoverImgAndLogo />

            <div className={`hm-logo`}>
                <a href="/" alt="logo">
                    <img src={`${logoHead}`} alt="" />

                </a>
            </div>

            <div className="main-landing-text">
                <div className="textBox">

                    <h2 style={{
                        color: `${activeTheme === "2" ? "#4D4D4D" : "#ffffff"}`,
                    }}>{t("IbIMainCategories")}</h2>
                    <p>{t("IbIHi")} {nameValue}! {t("IbIYourChoice")}? </p>
                </div>

            </div>
            <div className="main-menu-list">
                {index?.map((data, ind) => (
                    < >
                        <Link
                            to="/home"
                            className="dropdown-btn-landing"
                            style={{
                                color: `${activeTheme === "2" ? "#4D4D4D" : "#ffffff"}`,
                            }}
                            key={ind}
                            onClick={() => menuItemClick(ind, data)}
                        >
                            <div key={ind + "categoriesScreen"} className={`img-left ${categoriesScreenLayoutType === 2 && "big-img"}`}>
                                <img src={`${data.PictureUrl}`} alt="" />
                            </div>

                            {categoriesScreenLayoutType === 1 && (
                                <p key={ind + "categoriesScreenLayoutType"} style={{
                                    color: `${activeTheme === "2" ? "#4D4D4D" : "#ffffff"}`,
                                }}
                                >
                                    {data?.Name}
                                </p>
                            )}
                        </Link>

                        {/* {((ind + 1) % 4 === 0) && <div key={`separator-${ind}`} className="separator"></div>} */}
                    </>
                ))}
            </div>

        </div>
    )

}
export default LandingPage;