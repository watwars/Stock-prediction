// enhancePortfolio will enhance a portfolio by adding risk value, expected gain/loss for every entry and displaying current price of the stocks, and adding an overall ponderated average of risk value, expected gain/loss to the entire portfolio.
module.exports = async function (portfolio) {
  // first add current price
  let length = portfolio.length;
  for (let i = 0; i < length; i++) {
    let symbol = portfolio[i].stockTickerSymbol;
    const response = await axios.get("");
    let price = response.data.c;
    if (!price) {
      throw `Error: ticker symbol ${symbol} not found`;
    }
    // adding new price field
    portfolio[i].currentPrice = price;
  }

  // then add volatility
};
