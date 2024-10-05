import nodemailer from "nodemailer";
const sendEmail = async (options) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `Jasin thapa <hello@gmail.com>`, // not compulsary to place this
      to: options.email,
      subject: options.subject,
      text: "your otp is " + options.otp,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

export default sendEmail;
