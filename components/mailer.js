const nodemailer = require("nodemailer");

export default async function sendMailToAdmin(subject, data) {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "imnoa007offical@gmail.com",
      pass: "eozxugqggchxvgqf ",
    },
  });

  const mailOptions = {
    from: "imnoa007offical@gmail.com",
    to: "balathan2vijay004@gmail.com",
    subject: subject,
    text: JSON.stringify(data),
  };

  transport.sendMail(mailOptions, (err) => {
    console.log(err);
  });
}
