const tensorFlow = require("@tensorflow/tfjs-node");
const Window = require("window");
const window = new Window();
var BASE64_MARKER = ";base64,";
function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

async function image(file) {
  let data = convertDataURIToBinary(file); // base 64 -> unit8Array
  const decoded = tensorFlow.node.decodeImage(data); // Unit8array
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

module.exports = { image };
