import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderStatusEmail = async (email, orderDetails) => {
  const { orderId, status, username, totalPrice } = orderDetails;

  const statusMessages = {
    approved:
      "Your payment has been verified and your order is being processed!",
    rejected:
      "There was an issue with your payment slip. Please contact support.",
    delivered: "Great news! Your order has been delivered.",
    cancelled: "Your order has been cancelled.",
  };

  const message =
    statusMessages[status] ||
    `Your order status has been updated to ${status}.`;

  await transporter.sendMail({
    from: `"Derleng Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Order #${orderId.slice(-6)} Update - ${status.toUpperCase()}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>Hello, ${username}!</h2>
        <p>${message}</p>
        <hr />
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total Amount:</strong> $${totalPrice}</p>
        <p><strong>New Status:</strong> <span style="color: green; font-weight: bold;">${status.toUpperCase()}</span></p>
        <hr />
        <p>Thank you for shopping with Derleng!</p>
      </div>
    `,
  });
};
