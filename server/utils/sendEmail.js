const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"CollegeConnect" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log(`Verification email sent successfully to ${to}`);
};

module.exports = sendEmail;