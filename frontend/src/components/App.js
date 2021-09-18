import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import LoginPage from "./LoginPage";

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
    } else {
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
