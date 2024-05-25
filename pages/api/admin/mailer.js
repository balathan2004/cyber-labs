import sendMailToAdmin from "@/components/mailer";
export default async (req, res) => {
  try {
    const mailData = JSON.parse(req.body);

    await sendMailToAdmin("User Contact Mail", mailData);
    res.json({ message: "Mail sent to admin successfully", authType: 200 });
  } catch (err) {
    res.json({ error: err.message, authType: 400 });
  }
};
