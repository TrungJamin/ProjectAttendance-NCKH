const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const { detects, faceapi } = require("./faceApiService");
const db = admin.firestore();

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};
const displaySize = { width: 1000, height: 1000 };
exports.isFaceStudent = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
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
        console.log("faceMatcher:", faceMatcher);
        const detections = await detects(data.img);
        const resizedDetections = await faceapi.resizeResults(
          detections,
          displaySize
        );
        console.log("length:", resizedDetections.length);
        const result = await resizedDetections.map((d) => {
          console.log("descriptor:", d.descriptor);
          return faceMatcher.findBestMatch(d.descriptor);
        });
        return result;
      })
      .catch((error) => {
        return error.message;
      });
  });
