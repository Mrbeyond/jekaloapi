"use strict";

const http = require('http');
const express = require('express');	
const app = express();
const cors = require('cors');
const server = http.createServer(app);

const corsParams={
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors({corsParams}));

module.exports = {express, app, server};
