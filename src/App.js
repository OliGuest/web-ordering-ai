import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/gaps.css";
import "./assets/fonts/fontawesome/css/all.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import "./App.scss";
import { Provider } from "./context/kartItemContext";
import { useState } from "react";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/login/Login";
import Home from "./Pages/home/home";
import AboutUs from "./Pages/AboutUs";
import HouseRules from "./Pages/HouseRules";
import ReadyToOrder from "./components/Modals/ReadyToOrder/ReadyToOrder";
import RequestBillMOdal from "./components/Modals/RequestBillMOdal/RequestBillMOdal";
import DoneOrdering from "./components/Modals/DoneOrdering/DoneOrdering";
import GenQRCode from "./Pages/GenQRCode/GenQRCode";


const App = () => {
  // eslint-disable-next-line
  const [path, setPath] = useState(sessionStorage.getItem("theParams"));

  // Check if there are parameters given in the url
  let localIsEmptyfalse = false;
  let urlIsEmpty = false;
  const queryParameters = new URLSearchParams(window.location.search);
  const tableNumber = queryParameters.get("tableNumber");
  const orderCode = queryParameters.get("orderCode");
  const orderNumber = queryParameters.get("orderNumber");
  const tableCode = queryParameters.get("tableCode");
  const validation = queryParameters.get("validation");



  document.body.classList.add("addScroll");

  if (path === null || path.length === 0) {
    localIsEmptyfalse = true;
  } else {
    localIsEmptyfalse = false;
  }

  if (
    tableNumber === null &&
    orderCode === null &&
    orderNumber === null &&
    tableCode === null &&
    validation === null
  ) {
    urlIsEmpty = true;
  } else {
    urlIsEmpty = false;
  }

  return (
    <BrowserRouter>
      <div className="loader"></div>
      <Switch>
        {localIsEmptyfalse && urlIsEmpty ? (
          <Route
            render={(props) => {
              if (localIsEmptyfalse && urlIsEmpty) {
                return <GenQRCode />;
              }
            }}
          />
        ) : (
          <Provider>
            <ReadyToOrder />
            <RequestBillMOdal />
              <DoneOrdering />

            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/about" exact component={AboutUs} />
            <Route path="/HouseRules" exact component={HouseRules} />
          </Provider>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
