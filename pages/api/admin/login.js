import sendMailToAdmin from "@/components/mailer";
import { setCookie } from "cookies-next";
export default async function (req, res) {
  const { admin_username, admin_password } = JSON.parse(req.body);

  if (
    admin_username === process.env.ADMIN_NAME &&
    admin_password === process.env.ADMIN_PASS
  ) {
    setCookie("cyberLabs_Admin", process.env.ADMIN_NAME, {
      req,
      res,
      httpOnly: false,
      sameSite: "none",
      secure: "true",
    });

    res.json({ message: "login successful", authType: 200 });
    console.log("Admin Login Successfully");
  } else {
    res.json({ message: "login failed" });
    sendMailToAdmin("UnAuthorized Access", req.headers);
  }
}
