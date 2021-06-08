const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const { detects, faceapi, detectFace, detectListFile } = require("./src/");
const db = admin.firestore();
const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};
const displaySize = { width: 1000, height: 1000 };
exports.detectedListAttendance = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    return db
      .collection("facesDatabase")
      .doc(data.class)
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
        const detections = await detects(data.img);
        const resizedDetections = await faceapi.resizeResults(
          detections,
          displaySize
        );
        const result = await resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        return result;
      })
      .catch((error) => {
        return error.message;
      });
  });
exports.addDescriptorsInData = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    const { listBase64, id, Class } = data;
    const database = await detectFace(listBase64, id);
    return db
      .collection("facesDatabase")
      .doc(Class)
      .collection("data")
      .doc(id)
      .set(database, { merge: true })
      .then(() => {
        return true;
      })
      .catch(function (error) {
        return error.message;
      });
  });
exports.getAttendances = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    return db
      .collection("facesDatabase")
      .doc(data.class)
      .collection("data")
      .get()
      .then((querySnapshots) => {
        let labeledFaceDescriptorsJson2 = [];
        querySnapshots.forEach((item) => {
          labeledFaceDescriptorsJson2.push(item.data());
        });
        return labeledFaceDescriptorsJson2.map((person) => {
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
        const detections = await detectListFile(data.listBase64);
        const resizedDetections = await faceapi.resizeResults(
          detections,
          displaySize
        );
        const result = await resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        return result;
      })
      .then((result) => {
        return Promise.all(result).then((values) => {
          var obj = {};
          var newArr = [];
          for (let i = 0; i < values.length; i++) {
            if (!obj[values[i]._label]) {
              obj[values[i]._label] = 1;
              newArr.push(values[i]);
            }
          }
          return newArr;
        });
      })
      .catch((error) => {
        return error.message;
      });
  });
