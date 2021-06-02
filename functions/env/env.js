const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const modelPathRoot = "./../models";
const path = require("path");
const modelPath = path.join(__dirname, modelPathRoot);
let optionsSSDMobileNet;
const start = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
  });
};

module.exports = { faceapi, optionsSSDMobileNet, start };
