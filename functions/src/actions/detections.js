const { faceapi, optionsSSDMobileNet, start } = require("../../env/env");
const { image } = require("../../services");
const { data } = require("../../data");
async function detect(tensor) {
  const result = await faceapi
    .detectAllFaces(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceDescriptors();
  return result;
}
async function detects(file) {
  await faceapi.tf.setBackend("tensorflow");
  await faceapi.tf.enableProdMode();
  await faceapi.tf.ENV.set("DEBUG", false);
  await faceapi.tf.ready();
  await start();
  const tensor = await image(file);
  const result = await detect(tensor);
  tensor.dispose();
  return result;
}

module.exports = { detects, faceapi };
// const base64 = data
// detects(base64).then((result) => {
//   console.log(result);
// });
