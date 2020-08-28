import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signup";
import NavBar from "./components/NavBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./components/AuthRoute";

const theme = createMuiTheme(themeFile);

const token = localStorage.getItem("idToken");
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log("asd", decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signUp}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
