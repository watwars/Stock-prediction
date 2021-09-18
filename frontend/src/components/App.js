import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn) {
      this.setState({ isLoggedIn });
      this.props.history.push("/dashboard");
    } else if (this.props.history.location.pathname !== "/signup") {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
