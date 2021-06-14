const { detects, faceapi, detectListFile } = require("./actions/detections");
const {
  detectFace,
  getDescriptors,
  descriptorsToObject,
} = require("./actions/detectSingleFace");

module.exports = {
  detects,
  faceapi,
  detectFace,
  detectListFile,
  getDescriptors,
  descriptorsToObject,
};
