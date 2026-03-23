//utils/validators.js
export const validateUserForm = ({ username, email, password, confirmPassword }) => {
  const errors = {};

  if (username !== undefined && !username) errors.username = "Username is required";
  if (email !== undefined && !email) errors.email = "Email is required";
  if (password !== undefined && !password) errors.password = "Password is required";
  if (confirmPassword !== undefined && !confirmPassword) errors.confirmPassword = "Confirm password is required";
  if (password && confirmPassword && password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};