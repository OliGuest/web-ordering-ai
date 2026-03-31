
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import { useEffect } from "react";


const $ = require("jquery");

function HouseRules() {

    const {
        t,
        houseRules,
        // activeColor,
        activeTheme,
        JoinTable,
        getResourcesWithParams
    } = useContext(Context);

    useEffect(() => {
    
        // getResourcesWithParams();
        JoinTable();
        // eslint-disable-next-line
    }, [])

    $(document).ready(function () {
        var innerHeight = window.innerHeight;

        $(".landing-page").css("min-height", innerHeight);
    });

    return (
        <div id="main-wrapper">
            <div className="container p-0">
                <div className="landing-page" style={{ backgroundImage: ` url(${houseRules})` }}>

                    <div className="landing-footer">
                        <div className="">    {/* className="landing-select-butns" */}
                            <Link to="/landing" className={"butn butn continue-btn"} style={{ textDecoration: "none", backgroundColor: `#D98F29` }} >
                                <span style={{ color: `${activeTheme === "2" ? "#4D4D4D" : "#ffffff"}` }}>  {t('lblContinueOrdering')} </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HouseRules;
