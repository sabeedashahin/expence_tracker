const sendEmail = require("../utils/sendEmail");

const inviteFriends = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const Link = "http://localhost:5173/group/invitation";
    const subject = "You've been invited!";
    const text = `Hey! You've been invited to join our group. Click here to join /n ${Link}`;

    await sendEmail(email, subject, text);
    return res.status(200).json({ message: "Invitation sent!" });
  } catch (error) {
    return res.status(500).json({ message: "Filed to send invitation", error });
  }
};

module.exports = { inviteFriends };
