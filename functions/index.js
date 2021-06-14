const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const { detects, faceapi, detectFace, detectListFile } = require("./src/");
const {
  getDescriptors,
  descriptorsToObject,
} = require("./src/actions/detectSingleFace");
const db = admin.firestore();
const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};
const displaySize = { width: 1000, height: 1000 };
exports.detectedListAttendance = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    return db
      .collection("facesDatabase")
      .doc(data.class)
      .get()
      .then((doc) => {
        labeledFaceDescriptorsJson2 = doc.data().data;
        return labeledFaceDescriptorsJson2.map((person) => {
          //Convert Object to Array
          person.descriptors = Object.values(person.descriptors);
          person.descriptors = person.descriptors.map((detail) =>
            Object.values(detail)
          );
          return person;
        });
      })
      .then((labeledFaceDescriptorsJson) => {
        return labeledFaceDescriptorsJson.map((x) =>
          faceapi.LabeledFaceDescriptors.fromJSON(x)
        );
      })
      .then((result) => {
        return new faceapi.FaceMatcher(result, 0.6);
      })
      .then(async (faceMatcher) => {
        const detections = await detects(data.img);
        const resizedDetections = await faceapi.resizeResults(
          detections,
          displaySize
        );
        const result = await resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        return result;
      })
      .catch((error) => {
        return error.message;
      });
  });
exports.addDescriptorsInData = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    const { listBase64, id, Class } = data;
    const database = await detectFace(listBase64, id);
    return db
      .collection("facesDatabase")
      .doc(Class)
      .collection("data")
      .doc(id)
      .set(database, { merge: true })
      .then(() => {
        return Object.values(database.descriptors).length / listBase64.length;
      })
      .catch(function (error) {
        return error.message;
      });
  });
exports.getAttendances = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, content) => {
    return db
      .collection("facesDatabase")
      .doc(data.class)
      .collection("data")
      .get()
      .then((querySnapshots) => {
        let labeledFaceDescriptorsJson2 = [];
        querySnapshots.forEach((item) => {
          labeledFaceDescriptorsJson2.push(item.data());
        });
        return labeledFaceDescriptorsJson2.map((person) => {
          person.descriptors = Object.values(person.descriptors);
          person.descriptors = person.descriptors.map((detail) =>
            Object.values(detail)
          );
          return person;
        });
      })
      .then((labeledFaceDescriptorsJson) => {
        return labeledFaceDescriptorsJson.map((x) =>
          faceapi.LabeledFaceDescriptors.fromJSON(x)
        );
      })
      .then((result) => {
        return new faceapi.FaceMatcher(result, 0.6);
      })
      .then(async (faceMatcher) => {
        const detections = await detectListFile(data.listBase64);
        const resizedDetections = await faceapi.resizeResults(
          detections,
          displaySize
        );
        const result = await resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        return result;
      })
      .then((result) => {
        return Promise.all(result).then((values) => {
          var obj = {};
          var newArr = [];
          for (let i = 0; i < values.length; i++) {
            if (!obj[values[i]._label]) {
              obj[values[i]._label] = 1;
              newArr.push(values[i]);
            }
          }
          return newArr;
        });
      })
      .catch((error) => {
        return error.message;
      });
  });

exports.updateEmailAuth = functions.https.onCall((data, content) => {
  return admin
    .auth()
    .getUserByEmail(data.oldEmail)
    .then((user) => {
      return admin
        .auth()
        .updateUser(user.uid, {
          email: data.newEmail,
        })
        .catch((error) => error.message);
    })
    .catch((error) => {
      return error.message;
    });
});

exports.deleteUserByUID = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .deleteUser(data.uid)
    .catch((error) => error.message);
});

exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
  })
  .https.onCall(async (data, context) => {
    // Only allow admin users to execute this function.
    try {
      const path = data.path;
      await firebase_tools.firestore.delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token:
          "1//0eOryLxfChbenCgYIARAAGA4SNwF-L9IrTiwbfO1bVoFhUPKY0HaJurPwdg5qW0C3xkXDKTaogOabTele1sGfkmbRaZ8-Cj0Ic58",
      });

      return {
        path: path,
      };
    } catch (error) {
      return error;
    }
  });

exports.setDescriptorsInData = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
  })
  .https.onCall(async (data, content) => {
    const { listBase64, id, Class } = data;
    const database = await getDescriptors(listBase64);
    const oldData = await db
      .collection("facesDatabase")
      .doc(data.class)
      .collection("data")
      .get()
      .then((querySnapshots) => {
        let labeledFaceDescriptorsJson2 = [];
        querySnapshots.forEach((item) => {
          labeledFaceDescriptorsJson2.push(item.data());
        });
        return labeledFaceDescriptorsJson2.map((person) => {
          person.descriptors = Object.values(person.descriptors);
          person.descriptors = person.descriptors.map((detail) =>
            Object.values(detail)
          );
          return person;
        });
      });
    const newData = descriptorsToObject(database.concat(oldData), id);
    return db
      .collection("facesDatabase")
      .doc(Class)
      .collection("data")
      .doc(id)
      .set(newData, { merge: true })
      .then(() => {
        return Object.values(database.descriptors).length / listBase64.length;
      })
      .catch(function (error) {
        return error.message;
      });
  });
