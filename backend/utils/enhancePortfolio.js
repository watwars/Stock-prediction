const { default: axios } = require("axios");

// enhancePortfolio will enhance a portfolio by adding risk value, expected gain/loss for every entry and displaying current price of the stocks, and adding an overall ponderated average of risk value, expected gain/loss to the entire portfolio.
module.exports = async function (portfolio) {
  console.log("enhanced called");
  // first add current price
  let length = portfolio.portfolioEntries.length;
  // calculating ponderated average of portfolio volatility and prediction value
  let sumVolatility = 0;
  let sumPredictionValue = 0;
  let sumTotalValue = 0;
  for (let i = 0; i < length; i++) {
    const symbol = portfolio.portfolioEntries[i].stockTickerSymbol;
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    );
    let price = response.data.c;
    if (!price) {
      throw `Error: ticker symbol ${symbol} not found`;
    }
    // adding new price field
    portfolio.portfolioEntries[i].price = price;

    // then add volatility
    const response2 = await axios.get(
      `https://stock-price-htn.herokuapp.com/betas?stocks=${symbol}`
    );
    let volatility = response2.data.volatility;
    let predictionValue = response2.data.prediction;
    portfolio.portfolioEntries[i].volatility = volatility;
    portfolio.portfolioEntries[i].predictionValue = predictionValue;
    // adding to sum
    sumVolatility +=
      volatility *
      portfolio.portfolioEntries[i].price *
      portfolio.portfolioEntries[i].shareQuantity;
    sumPredictionValue +=
      predictionValue *
      portfolio.portfolioEntries[i].price *
      portfolio.portfolioEntries[i].shareQuantity;
    sumTotalValue +=
      portfolio.portfolioEntries[i].price *
      portfolio.portfolioEntries[i].shareQuantity;
  }
  if (sumTotalValue !== 0) {
    portfolio.totalValue = sumTotalValue;
    portfolio.averageVolatility = sumVolatility / sumTotalValue;
    portfolio.averagePreditcionValue = sumPredictionValue / sumTotalValue;
  } else {
    portfolio.totalValue = 0;
    portfolio.averageVolatility = 0;
    portfolio.averagePreditcionValue = 0;
  }
  return portfolio;
};
