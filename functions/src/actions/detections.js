const { faceapi, optionsSSDMobileNet, start } = require("../../env/env");
const { image } = require("../../services");
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
async function detectListFile(listFile) {
  let listImage = await listFile.map(async (file) => await image(file));
  await start();
  try {
    return Promise.all(listImage).then(async (tensors) => {
      return tensors.concatDetectAllFace(async (tensor) => {
        let tmp = await detect(tensor);
        return tmp;
      });
    });
  } catch (err) {
    return err;
  }
}

Array.prototype.concatDetectAllFace = async function (callback) {
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    let result = await callback(this[i], i, this);
    newArray = newArray.concat(result);
  }
  return newArray;
};
module.exports = { detects, faceapi, detectListFile };
