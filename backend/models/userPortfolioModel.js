const mongoose = require("mongoose");

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
    type: [String],
    required: [true, "ERROR: user must have a portfolio."],
  },
});

const UserPortfolio = mongoose.model("UserPortfolio", userPortfolioSchema);

module.exports = UserPortfolio;
