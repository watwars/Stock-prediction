const UserPortfolio = require("../models/userPortfolioModel");
const enhancePortfolio = require("../utils/enhancePortfolio");
const checkValidPortfolio = require("../utils/checkValidPortfolio");

exports.login = async (request, response) => {
  console.log(request.body);
  try {
    // findOne return null is none
    const isCredentialsValid = await UserPortfolio.findOne({
      username: request.body.username,
      password: request.body.password,
    });
    if (isCredentialsValid) {
      response.status(200);
      response.json({
        status: "Success",
        // TODO: returns the infos obtained from database
      });
    } else {
      response.status(200);
      response.json({
        status: "fail",
        message: "Invalid credentials. Wrong username or password.",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(400);
    response.json({
      status: "error",
      message: `Invalid Inputs. ${error}`,
    });
  }
};

// signUpUser returns true if signup successful, false otherwise (username already exist)
exports.signUpUser = async (request, response) => {
  console.log(request.body);
  try {
    await UserPortfolio.create({
      username: request.body.username,
      password: request.body.password,
      portfolioEntries: [],
    });
    response.status(200);
    response.json({
      status: "Success",
    });
  } catch (error) {
    console.error(error);
    response.status(400);
    response.json({
      status: "error",
      message: `Sign up failed. ${error}`,
    });
  }
};

exports.getPortfolio = async (request, response) => {
  console.log(request.body);
  try {
    // findOne return null is none
    let portfolio = await UserPortfolio.findOne({
      username: request.body.username,
      password: request.body.password,
    });
    // adding info (risks, expected win/loss) to portfolio using our ML algorithm and using real-time data
    portfolio = await enhancePortfolio(portfolio);
    if (portfolio !== null) {
      response.status(200);
      response.json({
        status: "Success",
        data: portfolio,
      });
    } else {
      response.status(200);
      response.json({
        status: "fail",
        message: "Portfolio not found.",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(400);
    response.json({
      status: "error",
      message: `Unknown error. ${error}`,
    });
  }
};

exports.updatePortfolio = async (request, response) => {
  try {
    // findOne return null is none
    let newPortfolio = await UserPortfolio.findOneAndReplace(
      {
        username: request.body.username,
        password: request.body.password,
      },
      {
        username: request.body.username,
        password: request.body.password,
        portfolioEntries: request.body.portfolioEntries,
      }
    );
    // checkValidPortfolio throws an exception if some stock ticker symbols are invalid (not found).
    checkValidPortfolio(portfolio);
    if (portfolio !== null) {
      // adding info (risks, expected win/loss) to portfolio using our ML algorithm and using real-time data
      newPortfolio = await enhancePortfolio(newPortfolio);
      response.status(200);
      response.json({
        status: "Success",
        data: newPortfolio,
      });
    } else {
      response.status(200);
      response.json({
        status: "fail",
        message: "Portfolio not found.",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(400);
    response.json({
      status: "error",
      message: `${error}`,
    });
  }
};
