/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

// import { hubConnection } from "signalr-no-jquery";

const hostname = window.location.hostname;
const AppConfig = window.config;

const api = {
  localhost: AppConfig.APP_LOCALHOST,
  platform: AppConfig.APP_PLATFORM,
  // localhost: "http://192.168.0.33:9988/",
  // platform: "http://192.168.0.33:9988/",
};

let apiBase = "";
if (hostname === "localhost" || hostname === "192.168.2.231") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}
export default apiBase;
