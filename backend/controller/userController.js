const User = require("../model/user");

// CREATE USER
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  // check email only if email is sent
  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
  }

  // check phone only if phone is sent
  if (phoneNumber) {
    const phoneExists = await User.findOne({phoneNumber });
    if (phoneExists) {
      return res.status(409).json({
        message: "Phone number already exists",
      });
    }
  }
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "User data is required" });
    }

      // const userData = new User({
      //   firstName,
      //   lastName,
      //   email,
      //   phoneNumber,
      // });

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { email, phoneNumber } = req.body;
  const userId = req.params.id;

  if (email) {
    const existingEmailUser = await User.findOne({ email });

    if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
  }

  // check phone only if phone is sent
  if (phoneNumber) {
    const existingPhoneUser = await User.findOne({ phoneNumber });

    if (existingPhoneUser && existingPhoneUser._id.toString() !== userId) {
      return res.status(409).json({
        message: "Phone number already exists",
      });
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
