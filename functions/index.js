const fetch = require("node-fetch");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const faceapi = require("face-api.js");
const path = require("path");
admin.initializeApp(functions.config().firebase);
const cors = require("cors")({ origin: true });
const express = require("express");
const app = express();
const { JSDOM } = require("jsdom");
global.window = new JSDOM(`<html></html>`).window;
global.document = window.document;
faceapi.env.monkeyPatch({
  fetch: fetch,
  Canvas: window.HTMLCanvasElement,
  Image: window.HTMLImageElement,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img"),
});
// const db = admin.firestore();
faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, "models"));
faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, "models"));
faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "models"));
const db = admin.firestore();


function detect(Image) {
  const detections = faceapi
    .detectAllFaces(Image)
    .withFaceLandmarks()
    .withFaceDescriptors();
}
exports.isFaceStudent = functions.https.onCall((data, content) => {
  return db
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
      const Img = document.createElement("img");
      Img.src = data.img;
      Img.width = Img.height = 100;
      const displaySize = { width: Img.width, height: Img.height };
      const detections = await faceapi
        .detectAllFaces(Img)
        .withFaceLandmarks(true)
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      return resizedDetections.map((d) => {
        console.log(faceMatcher.findBestMatch(d.descriptor)); // {_label: "Tony Stark", _distance: 0.5715871892946531} label => user id,
        return faceMatcher.findBestMatch(d.descriptor);
      });
    })
    .catch((error) => {
      return error.message;
    });
});
