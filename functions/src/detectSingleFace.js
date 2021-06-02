const { start, faceapi, optionsSSDMobileNet } = require("./../env/env");
const { image } = require("./../services");
const { data } = require("./../dataOneFace");
async function toDescriptors(listBase64, id) {
  let res = await listBase64.map(async (base64) => {
    const tensor = await image(base64);
    const detections = await faceapi
      .detectSingleFace(tensor, optionsSSDMobileNet)
      .withFaceLandmarks()
      .withFaceDescriptor();
    tensor.dispose();
    if (detections) {
      console.log("run - 1");
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
  return new faceapi.LabeledFaceDescriptors(id, descriptors);
}
module.exports = { detectFace };

// const list = [data];
// async function run() {
//   let result = await detectFace(list, "101");
//   console.log(result);
// }
// run();
