const express = require("express");
const app = express();

const routeHandlers = require("./routeHandlers/routeHandlers");

app.use(express.json());

// Serving front end
app.use(express.static(`${__dirname}/../frontend`));

// Routes
app.post("/api/v1/login", (request, response) => {
  const validCredentials = routeHandlers.validCredentials(
    request.body.username,
    request.body.password
  );
  if (validCredentials) {
    response.status(200);
    response.json({
      status: "Success",
      // TODO: returns the infos obtained from database
    });
  } else {
    response.status(400);
    response.json({
      status: "fail",
      message: "Invalid credentials. Wrong username or password.",
    });
  }
});

// Front end will limit password length, make sure no empty username/password, no space or special characters.
app.post("/api/v1/signup", (request, response) => {
  const signUpSuccess = routeHandlers.signUpUser(
    request.body.username,
    request.body.password
  );
  if (signUpSuccess) {
    response.status(200);
    response.json({
      status: "Success",
    });
  } else {
    response.status(400);
    response.json({
      status: "fail",
      message:
        "Fail to signup. Username already exists. Please try another username.",
    });
  }
});

// Front end: when successfull, front end will send a get request to same endpoint.
app.put("/api/v1/portfolio", (request, response) => {
  const updatePortfolioSuccess = routeHandlers.updatePortfolio(
    request.body.username,
    request.body.portfolioEntries
  );
  if (updatePortfolioSuccess) {
    response.status(200);
    response.json({
      status: "Success",
    });
  } else {
    response.status(400);
    response.json({
      status: "fail",
      message: "Fail to update portfolio.",
    });
  }
});

app.get("/api/v1/portfolio", (request, response) => {
  const getPortfolioSuccessful = routeHandlers.getPortfolio(
    request.body.username
  );
  if (getPortfolioSuccessful) {
    response.status(200);
    response.json({
      status: "Success",
      // TODO: returns the infos obtained from database
    });
  } else {
    response.status(400);
    response.json({
      status: "fail",
      message: "Could not get portfolio.",
    });
  }
});
