const { start, faceapi, optionsSSDMobileNet } = require("../../env/env");
const { image } = require("../../services");
async function toDescriptors(listBase64) {
  let res = await listBase64.filterAndMapAsync(async (base64) => {
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

  return {
    label: id,
    descriptors: LabeledFaceDescriptorsJSON,
  };
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
module.exports = { detectFace };

// async function test() {
//   const abc = await [1, 2, 3].filterAndMapAsync(function (item) {
//     if (item > 2) {
//       return item;
//     }
//   });
//   Promise.all(abc).then((res) => {
//     console.log(res);
//   });
// }
// test();

// let list = [data, data1];

// detectFace(list, "10A1").then((res) => {
//   console.log(res);
// });
