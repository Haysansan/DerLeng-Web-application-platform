import nodemailer from "nodemailer";

// ✅ CREATE TRANSPORTER (MISSING PART)
const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // 
  },
});

export const sendEmailWithInvoice = async (to, pdfBuffer) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Booking Approved 🎉",
    text: "Your booking is approved. See attached invoice.",
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer, // ✅ correct
      },
    ],
  });
};
