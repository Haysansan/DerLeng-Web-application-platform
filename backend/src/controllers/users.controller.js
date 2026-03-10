import userService from "../services/user.service.js";


export const requestEmailChange = async (req, res) => {
  try {
    const result = await userService.requestEmailChange(
      req.user._id,
      req.body.new_email,
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const verifyEmailChange = async (req, res) => {
  try {
    const updatedUser = await userService.verifyEmailChange(
      req.user._id,
      req.body.code,
    );

    res.status(200).json({
      message: "Email updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.user, // current logged-in user (from auth middleware)
      req.body, // data to update
    );

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "Not authorized to update this user") {
      return res.status(403).json({ message: error.message });
    }

    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(
      req.params.id,
      req.user, // current logged-in user
    );

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error.message === "Not authorized to delete this user") {
      return res.status(403).json({ message: error.message });
    }

    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: error.message });
  }
};
