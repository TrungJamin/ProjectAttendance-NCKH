const { start, faceapi, optionsSSDMobileNet } = require("../../env/env");
const { image } = require("../../services");
const { data } = require("../../data");
const { data1 } = require("../../data1");
async function toDescriptors(listBase64) {
  let res = await listBase64.map(async (base64) => {
    const tensor = await image(base64);
    const detections = await faceapi
      .detectSingleFace(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceDescriptor();
    // console.log("detections", detections);
    tensor.dispose();
    if (detections) {
      return detections.descriptor;
    }
  });
  return Promise.all(res);
}
async function detectFace(listBase64, id) {
  // console.log("listbase64", listBase64);
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();
  await start();
  const descriptors = await toDescriptors(listBase64);
  let LabeledFaceDescriptorsJSON = descriptors.map((detail) =>
    Object.assign({}, detail)
  );
  LabeledFaceDescriptorsJSON = Object.assign({}, LabeledFaceDescriptorsJSON);
  console.log("label", LabeledFaceDescriptorsJSON);
  return {
    label: id,
    descriptors: LabeledFaceDescriptorsJSON,
  };
}
const list = [data, data1];
detectFace(list, "011");
module.exports = { detectFace };
