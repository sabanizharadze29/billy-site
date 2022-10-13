const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password, facebookEmail, googleEmail } = req.body;

    if (googleEmail) {
      const googleEmailCheck = await User.findOne({
        email: `g${googleEmail}`,
      });
      if (!googleEmailCheck) {
        const user = await User.create({
          name: "google-user",
          email: `g${googleEmail}`,
          password: "gg123456",
        });
        return res.json({ status: true, user });
      } else if (googleEmailCheck) {
        return res.json({ status: false, msg: "user already exist" });
      }
    }

    const fbEmailCheck = await User.findOne({ email: `f${facebookEmail}` });
    console.log(fbEmailCheck);
    if (facebookEmail) {
      if (fbEmailCheck) {
        return res.json({
          status: false,
          msg: "you already have creater fb account",
        });
      } else if (!fbEmailCheck) {
        const user = await User.create({
          name: "facebook-user",
          email: `f${facebookEmail}`,
          password: "fb123456",
        });
        return res.json({ status: true, user });
      }
    } else {
      const nameCheck = await User.findOne({ name });
      if (nameCheck) {
        return res.json({ msg: "Name already used", status: false });
      }

      const emailCheck = await User.findOne({ email });
      if (emailCheck) {
        return res.json({ msg: "Email already used", status: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    }
  } catch (error) {
    next(error);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password, facebookEmail, googleEmail } = req.body;

    if (googleEmail) {
      const googleEmailCheck = await User.findOne({
        email: `g${googleEmail}`,
      });
      if (!googleEmailCheck) {
        return res.json({ status: false, msg: "User Doesn't exist" });
      } else if (googleEmailCheck) {
        const user = googleEmailCheck;
        return res.json({ status: true, user });
      }
    }

    if (facebookEmail) {
      const fbEmailCheck = await User.findOne({ email: `f${facebookEmail}` });
      if (!fbEmailCheck) {
        return res.json({
          status: false,
          msg: "User Doesn't exist ",
        });
      } else if (fbEmailCheck) {
        const user = fbEmailCheck;
        return res.json({
          status: true,
          user,
        });
      }
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "Email is not correct", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ msg: "Password is not correct", status: false });
    }
    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
