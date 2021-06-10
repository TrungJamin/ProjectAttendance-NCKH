const { detects, faceapi, detectListFile } = require("./actions/detections");
const { detectFace } = require("./actions/detectSingleFace");

module.exports = { detects, faceapi, detectFace, detectListFile };
