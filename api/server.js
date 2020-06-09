const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./contacts/contacts.router");

process.env.PORT || require("dotenv").config();

module.exports = class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(morgan("combined"));
    this.server.use(cors({ origin: "http://localhost:" + process.env.PORT }));
  }

  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Server started listening on port:", process.env.PORT);
    });
  }
};