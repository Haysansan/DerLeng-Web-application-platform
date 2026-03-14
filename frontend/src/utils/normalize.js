export const normalize = (text) => {
  return text?.toLowerCase().replace(/\s+/g, "");
};