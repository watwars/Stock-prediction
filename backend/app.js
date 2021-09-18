const express = require("express");
const app = express();

const routeHandlers = require("./routeHandlers/routeHandlers");

app.use(express.json());

// TODO: Serving front end
// app.use(express.static(`${__dirname}/../frontend`));

// Routes
app.post("/api/v1/login", routeHandlers.login);

// Front end will limit password length, make sure no empty username/password, no space or special characters.
app.post("/api/v1/signup", routeHandlers.signUpUser);

// Front end: when successfull, front end will send a get request to same endpoint.
app.put("/api/v1/portfolio", routeHandlers.updatePortfolio);

app.get("/api/v1/portfolio", routeHandlers.getPortfolio);

module.exports = app;
