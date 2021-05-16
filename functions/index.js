const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

exports.onCallTest = functions.https.onCall((data, context) => {
  return data.name;
});
