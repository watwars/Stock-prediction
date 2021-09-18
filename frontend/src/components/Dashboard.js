import React from "react";
import { withRouter } from "react-router-dom";
import { Header, LoadingScreen } from "./DashboardItems";
import { getUserSavedStocks } from "../helpers/requests";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isSetup: false,
    };
  }

  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      this.props.history.push("/login");
    } else {
      getUserSavedStocks("/api/v1/portfolio", {
        username: currentUser.username,
        password: currentUser.password,
      }).then((resp) => {
        console.log(resp);
      });
      this.setState({ currentUser, isSetup: true });
    }
  }

  render() {
    let { username, portfolioEntries } = this.state.currentUser;
    portfolioEntries = portfolioEntries ? portfolioEntries : [];
    const entries = portfolioEntries.map((ent, index) => {
      return (
        <div key={index}>
          <div>{ent.stockTickerSymbol}</div>
          <div>{ent.shareNumber}</div>
        </div>
      );
    });
    return (
      <div>
        {this.state.isSetup ? (
          <div>
            <Header username={username} />
            {entries}
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
    );
  }
}

export default withRouter(Dashboard);
