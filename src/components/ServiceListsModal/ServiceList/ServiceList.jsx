import React from "react";
import "./ServiceList.css";
import { useSendServiceRequest } from "../../../Hooks/useSendServiceRequest";

const ServiceList = ({ data, serviceCallTheme }) => {

    const [sendServiceRequest] = useSendServiceRequest();
    
    return(
        <li >
            <button
                // data-toggle="modal"
                onClick={() => sendServiceRequest(data)}
                // data-target="#service-sent"
                data-dismiss="modal"
                aria-label="Close"  
                style={{ color: "black" }}
            >
                {/* <svg width="24" style={{ marginRight: "6px"}} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="ArrowForwardFilled">
                        <path id="Vector" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#252424" />
                    </g>
                </svg> */}
                {data?.Message}
            </button>
        </li>
    )
}

export default ServiceList;