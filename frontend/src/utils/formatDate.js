// // utils/formatDate.js
// export const formatDate = (created_at) => {
//   if (!created_at) return "N/A";

//   const d = new Date(created_at);
//   if (isNaN(d)) return "Invalid Date";

//   const month = d.toLocaleString("en-US", { month: "short" });
//   const day = d.getDate();
//   const year = d.getFullYear();

//   return `${month} ${day}, ${year}`;
// };