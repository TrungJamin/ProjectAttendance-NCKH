const faceapi = require('@vladmandic/face-api/dist/face-api.node.js');
const modelPathRoot = './../models';
const path = require('path');
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
Array.prototype.filterAndMapAsync = async function (callback) {
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    let check = await callback(this[i], i, this);
    if (check) {
      newArray.push(callback(this[i], i, this));
    }
  }
  return newArray;
};
module.exports = { faceapi, optionsSSDMobileNet, start };
