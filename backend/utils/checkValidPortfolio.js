const axios = require("axios");

// checkValidPortfolio will do nothing if stock ticker symbols of the portfolio are valid and otherwise throw an exception containing the invalid ticker symbols.
module.exports = async function (portfolio) {
  let length = portfolio.length;
  for (let i = 0; i < length; i++) {
    let symbol = portfolio[i].stockTickerSymbol;
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );
    let price = response.data.c;
    console.log(price);
    if (!price) {
      throw `Error: ticker symbol ${symbol} not found`;
    }
  }
};
