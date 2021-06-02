const { start, faceapi, optionsSSDMobileNet } = require("./../env/env");
const { image } = require("./../services");
const { data } = require("./../dataOneFace");
const detect = async (listBase64, id) => {
  let descriptions = [];
  await listBase64.map(async (base64) => {
    const tensor = await image(base64);
    const detections = await faceapi
      .detectSingleFace(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceDescriptor();
    // console.log(detections);
    tensor.dispose();
    if (typeof detections !== "undefined") {
      console.log("run - 1");
      descriptions.push(detections.descriptor);
      return true;
    }
    return false;
  });
  return new faceapi.LabeledFaceDescriptors(id, descriptions);
};
async function detectFace(listBase64, id) {
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();
  await start();
  const result = await detect(listBase64, id);
  return result;
}
module.exports = { detectFace };

const list = [data];
console.log(typeof list);
async function run() {
  await detectFace(list, "101").then((result) => {
    console.log(result);
  });
}
run();
