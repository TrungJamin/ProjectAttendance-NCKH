const base64 = require("./image");
const path = require("path");
const faceapi = require("face-api.js");
let image = faceapi.fetchImage();

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
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();
      console.log(detections);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
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

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, "models")),
  faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, "models")),
  faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "models")),
]).then(start);
