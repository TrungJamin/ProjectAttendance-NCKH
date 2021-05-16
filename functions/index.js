const fetch = require("node-fetch");
const path = require("path");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const faceapi = require("face-api.js");
faceapi.env.monkeyPatch({ fetch: fetch });
admin.initializeApp(functions.config().firebase);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

// const MODELS_URL = path.join(__dirname, '/../models/face-api');
const db = admin.firestore();

exports.isFaceStudent = functions.https.onCall(async (data, content) => {
  const dataUser = data;
  async function start() {
    var labeledFaceDescriptorsJson2;
    var results;
    await db
      .collection("FacesDatabase")
      .doc("10A1")
      .get()
      .then((doc) => {
        // console.log(doc.data());
        labeledFaceDescriptorsJson2 = doc.data().data;
        // console.log(labeledFaceDescriptorsJson2);
        labeledFaceDescriptorsJson2 = labeledFaceDescriptorsJson2.map(
          (person) => {
            //Convert Object to Array
            person.descriptors = Object.values(person.descriptors);
            person.descriptors = person.descriptors.map((detail) =>
              Object.values(detail)
            );
            return person;
          }
        );
        // console.log(labeledFaceDescriptorsJson2);
        return new Promise((resolve, reject) => {
          resolve(labeledFaceDescriptorsJson2);
        })
          .then((data) => {
            return data.map((x) => {
              return faceapi.LabeledFaceDescriptors.fromJSON(x);
            });
          })
          .then(async (data) => {
            console.log("data2", data);
            const faceMatcher = await new faceapi.FaceMatcher(data, 0.6);

            let image = await dataUser.img;
            const displaySize = { width: image.width, height: image.height };

            // Xác thực các nhân vật trong ảnh chọn lên
            const detections = await faceapi
              .detectAllFaces(image)
              .withFaceLandmarks()
              .withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );
            console.log(detections);
            results = await resizedDetections.map((d) => {
              // {_label: "Tony Stark", _distance: 0.5715871892946531} label => user id,
              return faceMatcher.findBestMatch(d.descriptor);
            });
            return results;
          });
      });
    return results;
  }

  return Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromDisk(
      path.join(__dirname, "models")
    ),
    faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, "models")),
    faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "models")),
  ]).then(start);
});
