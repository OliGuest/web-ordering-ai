import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/gaps.css";
import "./assets/fonts/fontawesome/css/all.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import Home from "./screens/home/home";
import "./App.css";
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="loader"></div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
