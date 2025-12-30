import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
});
// Wrap in an async IIFE so we can use await.
export const sendEmail = async (receipient,subject,content) => {
  const info = await transporter.sendMail({
    from: '"NB CRMs" <nitinbela100@gmail.com>',
    to: receipient,
    subject: subject,
    html: content, // HTML body
  });
  console.log("Message sent:", info.messageId);
}







