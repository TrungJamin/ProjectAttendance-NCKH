const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const { detects, faceapi } = require("./src/detections");
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
      .collection("FacesDatabase")
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
exports.saveImageInDataBase = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    const { listBase64, id, Class } = data;
    const descriptors = await listBase64.map((base64) => {
      return detects(base64);
    });
    return db
      .collection("DataBaseFace")
      .doc(Class)
      .collection("data")
      .doc(id)
      .set({
        label: id,
        descriptors: descriptors,
      })
      .then(() => {
        return true;
      })
      .catch(function (error) {
        return error.message;
      });
  });
