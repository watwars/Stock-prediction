const mongoose = require("mongoose");

class stockEntry {
  constructor(stockTickerSymbol, shareQuantity) {
    this.stockTickerSymbol = stockTickerSymbol;
    this.shareQuantity = shareQuantity;
  }
}

const stockEntrySchema = new mongoose.Schema({
  stockTickerSymbol: {
    type: String,
    required: [true, "ERROR: Stock must have a ticker symbol"],
  },
  shareQuantity: {
    type: Number,
    required: [true, "ERROR: share quantity required in entry"],
  },
});

const userPortfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "ERROR: portfolio must be associated to an username"],
    unique: [true, "ERROR: username must be unique"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "ERROR: username must have a password"],
  },
  portfolioEntries: {
    type: [stockEntrySchema],
    required: [true, "ERROR: user must have a portfolio."],
  },
});

const UserPortfolio = mongoose.model("UserPortfolio", userPortfolioSchema);

module.exports = UserPortfolio;
