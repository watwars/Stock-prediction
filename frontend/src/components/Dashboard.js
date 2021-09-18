import React from "react";
import { withRouter } from "react-router-dom";
import { Header, LoadingScreen } from "./DashboardItems";
import { getUserSavedStocks, updateStock } from "../helpers/requests";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isSetup: false,
      stockName: "",
      stockNumber: 1,
      portfolioEntries: [],
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
        this.setState({
          currentUser,
          isSetup: true,
          portfolioEntries: resp.data.portfolioEntries,
        });
      });
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddStock = () => {
    const newItem = {
      stockTickerSymbol: this.state.stockName,
      shareQuantity: this.state.stockNumber,
    };
    this.setState({
      portfolioEntries: this.state.portfolioEntries.concat([newItem]),
      stockName: "",
      stockNumber: 1,
    });
  };

  handleUpdateDatabase = () => {
    let currentUser = this.state.currentUser;
    currentUser.portfolioEntries = this.state.portfolioEntries;
    updateStock("/api/v1/portfolio", currentUser).then((resp) => {
      console.log(resp);
    });
  };

  render() {
    const { username } = this.state.currentUser;
    const { portfolioEntries } = this.state;
    const entries = portfolioEntries.map((ent, index) => {
      return (
        <div key={index}>
          <div>{ent.stockTickerSymbol}</div>
          <div>{ent.shareQuantity}</div>
        </div>
      );
    });
    return (
      <div>
        {this.state.isSetup ? (
          <div>
            <Header username={username} />
            {entries}
            <form>
              <input
                type="text"
                name="stockName"
                value={this.state.stockName.toUpperCase()}
                onChange={this.handleInput}
              />
              <input
                type="number"
                name="stockNumber"
                value={this.state.stockNumber}
                onChange={this.handleInput}
              />
            </form>
            <button onClick={this.handleAddStock}>Add Item</button>
            <button onClick={this.handleUpdateDatabase}>Save and Update</button>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
    );
  }
}

export default withRouter(Dashboard);
