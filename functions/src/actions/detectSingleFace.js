const { start, faceapi, optionsSSDMobileNet } = require("../../env/env");
const { image } = require("../../services");
async function toDescriptors(listBase64) {
  let res = await listBase64.filterAndMapAsync(async (base64) => {
    const tensor = await image(base64);
    const detections = await faceapi
      .detectSingleFace(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceDescriptor();
    tensor.dispose();
    if (detections) {
      return detections.descriptor;
    }
  });
  return Promise.all(res);
}
async function detectFace(listBase64, id) {
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();
  await start();
  const descriptors = await toDescriptors(listBase64);
  return {
    label: id,
    descriptors: descriptorsToObject(descriptors),
  };
}
function descriptorsToObject(descriptors) {
  let LabeledFaceDescriptorsJSON = descriptors.map((detail) =>
    Object.assign({}, detail)
  );
  return Object.assign({}, LabeledFaceDescriptorsJSON);
}
async function getDescriptors(listBase64) {
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();
  await start();
  const descriptors = await toDescriptors(listBase64);
  return descriptors;
}
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
module.exports = { detectFace, getDescriptors, descriptorsToObject };
