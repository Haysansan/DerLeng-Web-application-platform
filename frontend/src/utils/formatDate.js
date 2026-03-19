export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day} ${year}`;
};