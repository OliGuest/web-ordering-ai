
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useContext } from "react";
import { Context } from "../context/kartItemContext";
import "./AboutUs.css";

function AboutUs() {

    // const [logoImage, setlogoImage] = useState();
    const { aboutUsCover } = useContext(Context);
    const background = useMemo(() => aboutUsCover, [aboutUsCover]);

    useEffect(() => {

    }, [aboutUsCover])

    return (
        <div id="main-wrapper">
            <div className="container p-0">
                <div className="landing-page about-us-page" style={{ backgroundImage: ` url(${background})` }}>
                    <div className="back-btn">
                        <Link to="/home">
                            <span className="back-icon about-back">
                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.65669 0.883401C9.54859 0.790347 9.42017 0.71652 9.27878 0.666146C9.1374 0.615773 8.98583 0.589844 8.83276 0.589844C8.67968 0.589844 8.52812 0.615773 8.38673 0.666146C8.24535 0.71652 8.11693 0.790347 8.00883 0.883401L0.272264 7.52618C0.185957 7.60013 0.117485 7.68798 0.0707664 7.78468C0.0240478 7.88138 0 7.98505 0 8.08974C0 8.19443 0.0240478 8.29809 0.0707664 8.3948C0.117485 8.4915 0.185957 8.57934 0.272264 8.65329L8.00883 15.2961C8.46501 15.6878 9.2005 15.6878 9.65669 15.2961C10.1129 14.9044 10.1129 14.2729 9.65669 13.8812L2.91629 8.08574L9.666 2.2903C10.1129 1.9066 10.1129 1.2671 9.65669 0.883401Z" fill="white" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default AboutUs;
