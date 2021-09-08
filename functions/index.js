const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const { faceapi, detectFace, detectListFile } = require('./src/');
const { getWeekNow } = require('./helpers');
const {
  getDescriptors,
  descriptorsToObject,
} = require('./src/actions/detectSingleFace');
const db = admin.firestore();
const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB',
};
const displaySize = { width: 1000, height: 1000 };
exports.addDescriptorsInData = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '1GB',
  })
  .https.onCall(async (data, content) => {
    const { listBase64, id, Class } = data;
    const database = await detectFace(listBase64, id);
    return db
      .collection('facesDatabase')
      .doc(Class)
      .collection('data')
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
      .collection('facesDatabase')
      .doc(data.class)
      .collection('data')
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
    memory: '1GB',
  })
  .https.onCall(async (data, content) => {
    const { listBase64, id, Class } = data;
    const database = await getDescriptors(listBase64);
    const oldData = await db
      .collection('facesDatabase')
      .doc(Class)
      .collection('data')
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
          .collection('facesDatabase')
          .doc(Class)
          .collection('data')
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
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '731852175479-6h6mjpc6bcrnbrpm1q640rrrvv4san0f.apps.googleusercontent.com';
const CLIENT_SECRET = 'yHrFZyT3BMuj6kSCCTLgLKL5';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//0477HhK8OkJVBCgYIARAAGAQSNwF-L9IrX6RhlpKeeFap91Lf1Mgdt6I0AUWuXKoLv4RvtLT86mwWveBlYXlX2UVSgsGTCL759BE';
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
  content,
  files
) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'smartattendance01pro@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Smart Attendance <${mailTeacher}>`,
      to: `${mailStudent}`,
      subject: 'Trường Trung Học Cơ Sở Đức Trí',
      text: 'Smart Bot',
      html: `<h1>From:${name}  || email: ${mailTeacher}</h1>
      <h3>${title}</h3>
      <p>${content}</p> `,
      attachments: files,
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
    data.content,
    data.files
  );
});
exports.makeAdmin = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      return 'make admin successfully';
    })
    .catch((error) => {
      return error.message;
    });
});
exports.deleteAdmin = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: false });
    })
    .then(() => {
      return 'delete admin successfully';
    })
    .catch((error) => {
      return error.message;
    });
});

exports.createAccount = functions.https.onCall((data) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      password: data.password,
    })
    .catch((error) => {
      return false;
    });
});

const template = {
  morning: [],
  afternoon: [],
  status: true,
  asked: '',
  note: '',
};
exports.updateScheduleCronjob = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .pubsub.schedule('0 0 1 * *')
  .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
  .onRun(async (context) => {
    try {
      db.collection(`Students`).onSnapshot((snapshot) => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const maxDay = new Date(year, month, 0).getDate();

        snapshot.forEach((doc) => {
          for (let i = 1; i <= maxDay; i++) {
            const date = new Date(`${month}-${i}-${year}`);
            if (i < 10) {
              db.collection('Students')
                .doc(doc.id)
                .collection('attendance')
                .doc(`${month}-0${i}-${year}`)
                .set({
                  ...template,
                  week: getWeekNow(date),
                  status: false,
                  asked: true,
                  note: '',
                })
                .then(() => {
                  console.log('success');
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              db.collection('Students')
                .doc(doc.id)
                .collection('attendance')
                .doc(`${month}-${i}-${year}`)
                .set({
                  ...template,
                  week: getWeekNow(date),
                  status: true,
                  asked: true,
                  note: '',
                })
                .then(() => {
                  console.log('success');
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        });
      });
      return true;
    } catch (error) {
      console.log(error.message);
    }
  });
