import React from "react";
import { withRouter } from "react-router-dom";
import { Header, LoadingScreen } from "./DashboardItems";
import { getUserSavedStocks, updateStock } from "../helpers/requests";
import ErrorMessage from "./ErrorMessage";
import ClearIcon from "@mui/icons-material/Clear";

import "../css/Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isSetup: false,
      stockName: "",
      stockNumber: 1,
      portfolioEntries: [],
      errorMsg: "",
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
        let data = [];
        if (resp.status === "fail") {
          this.setState({ errorMsg: resp.message });
        } else {
          data = resp.data.portfolioEntries;
        }
        this.setState({
          currentUser,
          isSetup: true,
          portfolioEntries: data,
        });
      });
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddStock = () => {
    let { stockName, stockNumber } = this.state;
    stockName = stockName.toUpperCase();
    if (stockName === "") {
      this.setState({ errorMsg: "Missing input" });
      return;
    }
    if (stockName.includes(" ")) {
      this.setState({ errorMsg: "Stock symbols cannot contain spaces" });
      return;
    }
    for (let p of this.state.portfolioEntries) {
      if (p.stockTickerSymbol === stockName) {
        this.setState({ errorMsg: "Stock already added" });
        return;
      }
    }
    const newItem = {
      stockTickerSymbol: stockName,
      shareQuantity: stockNumber,
    };
    this.setState({
      portfolioEntries: this.state.portfolioEntries.concat([newItem]),
      stockName: "",
      stockNumber: 1,
      errorMsg: "",
    });
  };

  handleUpdateDatabase = () => {
    let currentUser = this.state.currentUser;
    currentUser.portfolioEntries = this.state.portfolioEntries;
    updateStock("/api/v1/portfolio", currentUser).then((resp) => {
      console.log(resp);
      if (resp.status !== "Success") {
        this.setState({ errorMsg: resp.message });
      }
    });
  };

  handleDeleteStock = (name) => {
    console.log(name);
    let selected = this.state.portfolioEntries.filter(
      (p) => p.stockTickerSymbol !== name
    );
    this.setState({ portfolioEntries: selected });
  };

  render() {
    const { username } = this.state.currentUser;
    const { portfolioEntries } = this.state;
    const entries = portfolioEntries.map((ent, index) => {
      return (
        <div key={index} className="stockItem">
          <div>
            <div>Stock Symbol: {ent.stockTickerSymbol}</div>
            <div>Quantity: {ent.shareQuantity}</div>
          </div>
          <div onClick={() => this.handleDeleteStock(ent.stockTickerSymbol)}>
            <ClearIcon />
          </div>
        </div>
      );
    });
    return (
      <div>
        {this.state.isSetup ? (
          <div>
            <Header username={username} />
            {this.state.errorMsg !== "" ? (
              <div className="dashboardError">
                <ErrorMessage message={this.state.errorMsg} />
              </div>
            ) : (
              <></>
            )}
            <div className="dashboardContent">
              <div className="stocks">{entries}</div>
              <div className="dashboardControls">
                <div className="addStock lead">
                  Add a new stock
                  <form className="form-group">
                    <input
                      type="text"
                      name="stockName"
                      value={this.state.stockName.toUpperCase()}
                      onChange={this.handleInput}
                      className="form-control"
                    />
                    <input
                      type="number"
                      name="stockNumber"
                      value={this.state.stockNumber}
                      onChange={this.handleInput}
                      className="form-control"
                    />
                  </form>
                  <span>Stock Symbol</span>
                  <span>Stock Qty</span>
                  <div></div>
                  <button
                    onClick={this.handleAddStock}
                    className="btn btn-success"
                    style={{ marginTop: "10px" }}
                  >
                    Add Item
                  </button>
                </div>
                <div className="updateStock">
                  <button
                    onClick={this.handleUpdateDatabase}
                    className="btn btn-info"
                    style={{ width: "100%" }}
                  >
                    Save and Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingScreen />
        )}
      </div>
    );
  }
}

export default withRouter(Dashboard);
