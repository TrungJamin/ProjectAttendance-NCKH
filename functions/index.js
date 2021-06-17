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
  .runWith({
    timeoutSeconds: 540,
    memory: "1GB",
  })
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
      .doc(Class)
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
    return Promise.all([...database, ...oldData])
      .then((values) => {
        console.log(values);
        return descriptorsToObject(values);
      })
      .then((result) => {
        return {
          label: id,
          descriptors: result,
        };
      })
      .then((newData) => {
        return db
          .collection("facesDatabase")
          .doc(Class)
          .collection("data")
          .doc(id)
          .set(newData, { merge: true })
          .then(() => {
            return database.length / listBase64.length;
          })
          .catch(function (error) {
            return error.message;
          });
      })
      .catch((error) => {
        return error.message;
      });
  });

// send - email
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "731852175479-6h6mjpc6bcrnbrpm1q640rrrvv4san0f.apps.googleusercontent.com";
const CLIENT_SECRET = "yHrFZyT3BMuj6kSCCTLgLKL5";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//0477HhK8OkJVBCgYIARAAGAQSNwF-L9IrX6RhlpKeeFap91Lf1Mgdt6I0AUWuXKoLv4RvtLT86mwWveBlYXlX2UVSgsGTCL759BE";
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMailFromTeacher(
  mailTeacher,
  mailStudent,
  name,
  title,
  content
) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "smartattendance01pro@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Smart Attendance <${mailTeacher}>`,
      to: `${mailStudent}`,
      subject: "Trường Trung Học Cơ Sở Đức Trí",
      text: "",
      html: `<h1>From:${name}  || email: ${mailTeacher}</h1>
      <h3>${title}</h3>
      <p>${content}</p> `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
exports.sendMailFromTeacher = functions.https.onCall((data, context) => {
  return sendMailFromTeacher(
    data.mailTeacher,
    data.mailStudent,
    data.name,
    data.title,
    data.content
  );
});
