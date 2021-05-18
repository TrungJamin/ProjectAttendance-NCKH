const fetch = require("node-fetch");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const path = require("path");
const assert = require("assert").strict;
// const tf = require("@tensorflow/tfjs");
const canvas = require("canvas");
const faceapi = require("face-api.js");
faceapi.env.monkeyPatch({ fetch: fetch });
admin.initializeApp(functions.config().firebase);
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

const Canvas = require("canvas");
// const MODELS_URL = path.join(__dirname, '/../models/face-api');
const db = admin.firestore();
function decodeBase64Image(dataString) {
  let response = new Buffer(dataString, "base64");
  return response;
}
exports.testFunction = functions.https.onCall(async (data, content) => {
  return decodeBase64Image(data.img);
});
exports.isFaceStudent = functions.https.onCall(async (data, content) => {
  const dataUser = await data;
  let img = new Canvas.Image();
  img.src = dataUser.img;
  const displaySize = { width: img.width, height: img.height };
  img.width = img.height = "1000";
  console.log(img);
  const start = async () => {
    var results;
    await db
      .collection("FacesDatabase")
      .doc("10A1")
      .get()
      .then((doc) => {
        labeledFaceDescriptorsJson2 = doc.data().data;
        return labeledFaceDescriptorsJson2.map((person) => {
          //Convert Object to Array
          person.descriptors = Object.values(person.descriptors);
          person.descriptors = person.descriptors.map((detail) =>
            Object.values(detail)
          );
          return person;
        });
      })
      .then((labeledFaceDescriptorsJson) => {
        return labeledFaceDescriptorsJson.map((x) =>
          faceapi.LabeledFaceDescriptors.fromJSON(x)
        );
      })
      .then((result) => {
        return new faceapi.FaceMatcher(result, 0.6);
      })
      .then(async (faceMatcher) => {
        const detections = await faceapi
          .detectAllFaces(canvas)
          .withFaceLandmarks()
          .withFaceDescriptors();
        console.log(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        console.log(resizedDetections);
        const results = resizedDetections.map((d) => {
          console.log(faceMatcher.findBestMatch(d.descriptor)); // {_label: "Tony Stark", _distance: 0.5715871892946531} label => user id,
          return faceMatcher.findBestMatch(d.descriptor);
        });
        return results;
      })
      .then((response) => {
        results = response;
      });
    // console.log(labeledFaceDescriptorsJson2);
    return results;
  };

  return Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk(
      path.join(__dirname, "models")
    ),
    faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, "models")),
    faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "models")),
  ]).then(start);
});
