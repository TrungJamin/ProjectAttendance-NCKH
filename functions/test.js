// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// const CLIENT_ID =
//   "731852175479-6h6mjpc6bcrnbrpm1q640rrrvv4san0f.apps.googleusercontent.com";
// const CLIENT_SECRET = "yHrFZyT3BMuj6kSCCTLgLKL5";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//0477HhK8OkJVBCgYIARAAGAQSNwF-L9IrX6RhlpKeeFap91Lf1Mgdt6I0AUWuXKoLv4RvtLT86mwWveBlYXlX2UVSgsGTCL759BE";
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail() {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "smartattendance01pro@gmail.com",
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: "Smart Attendance <smartattendancepro01@gmail.com>",
//       to: "truongthanhhuy08@gmail.com",
//       subject: "Trường Trung Học Cơ Sở Đức Trí",
//       text: "",
//       html: "<h3>From: Nguyễn Văn Nam</h3>  <p>Ngày Mai đi học nhé</p> ",
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// sendMail()
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));
const { descriptorsToObject } = require("./src");
console.log(descriptorsToObject);

// sendMailFromTeacher(
//   "truongthanhhuy08@gmail.com",
//   "truongthanhhuy08@gmail.com",
//   "ahihi",
//   "kk"
// );
