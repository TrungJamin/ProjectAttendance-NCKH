const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "1089599954359-re62setj1n2gjbnoovag3rb7oom1huu2.apps.googleusercontent.com";
const CLIENT_SECRET = "s-c7YO10Ff7uAWpCHtq8_voG";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04x5o62y_zM35CgYIARAAGAQSNwF-L9IrTN4Vs9YD58p-yliZwsWNPaSs4pGgUMZbHnlkm1teoudwgdgJTWmh0tYq3QD28iaomL4";
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ripker1805@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Smart Attendance <ripker1805@gmail.com>",
      to: "truongthanhhuy08@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));

