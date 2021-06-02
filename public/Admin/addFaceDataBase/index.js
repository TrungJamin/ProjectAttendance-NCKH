const functions = firebase.functions();
let testAddFace = functions.httpsCallable("detectedListAttendance");

testAddFace({
  id: "562001",
  Class: "10A1",
  base64: [],
});
