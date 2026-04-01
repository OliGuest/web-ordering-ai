import { React, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./GenQRCode.css"
import queryString from 'query-string'
import { useState } from "react";
import { useEffect } from "react";
import { Context } from "../../context/kartItemContext";
import * as adminServices from "../../services/adminService";


const GenQRCode = () => {
  const location = useLocation();

  let paramsValue = queryString.parse(location.search);
   
  const { setPath } = useContext(Context);


  const [scanResult, setScanResult] = useState(null);
  // eslint-disable-next-line
    const [logoImage, setlogoImage] = useState(
      "https://wo.cloud.revelapps.com:443//Shared/images/30fc789a-396e-42a2-b083-89e3b4499d79.png"
    );

    useEffect(() => {
      adminServices.getResources().then((response) => {
        setlogoImage(response?.data?.ThemeResponse.LogoImage.Url)
      })
    },[])

  useEffect(() => {

    const scanner =  new Html5QrcodeScanner("renderCode", {
       qrbox: {
         width:250, 
         height:250
       },
       ftp: 5
     });
   
     scanner.render(success, error);
   
     function success(result) {
       scanner.clear();
       setScanResult(result);
     }
   
     function error(err) {
       console.warn(err);
     }
  },[])

 const getLocalUrl = (scannedUrl) => {
   try {
     const url = new URL(scannedUrl);
     // Keep the query parameters but redirect to localhost instead of production
     return window.location.origin + "/" + url.search;
   } catch (e) {
     return scannedUrl;
   }
 }

 const setupUrl = () => {
   sessionStorage.setItem("theParams", JSON.stringify(paramsValue))
   setPath(JSON.parse(sessionStorage.getItem("theParams")));
 }

  return (
    <div className="qrCode">
      <Link className="landing-logo" to="#">
        <span className="start-met">
          <img src={logoImage ? logoImage : ""} alt="Loading..." />
        </span>
      </Link>
      <h4>Scan the QR code please</h4>
      {scanResult ? <div> Success: <a href={getLocalUrl(scanResult)} onClick={setupUrl}> {scanResult}</a> </div>  : <div id="renderCode" width="600px"></div>}
    </div>
  );
};

export default GenQRCode;
