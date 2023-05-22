const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transpoter = nodemailer.createTransport({
    host: '',
    port: 45,
    auth: {
      user: '',
      pass: '',
    },
  });

  const mailOptions = {
    from: 'Shashwat Adhau <shashwatadhau3@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html
  };
  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
