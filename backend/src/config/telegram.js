import TelegramBot from "node-telegram-bot-api";
import Booking from "../models/booking.js";
import dotenv from "dotenv";
dotenv.config();

// Init bot
// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
//   polling: true,
// });
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

// Admin IDs (from .env)
const ADMIN_IDS = process.env.TELEGRAM_ADMIN_IDS.split(",").map((id) =>
  Number(id),
);


bot.on("callback_query", async (query) => {
  try {
    //  Restrict to admins
    if (!ADMIN_IDS.includes(query.from.id)) {
      return bot.answerCallbackQuery(query.id, {
        text: " Not authorized",
        show_alert: true,
      });
    }

    const [action, bookingId] = query.data.split("_");

    // Validate action
    let status;
    if (action === "approve") status = "approved";
    else if (action === "reject") status = "rejected";
    else {
      return bot.answerCallbackQuery(query.id, {
        text: "Invalid action",
        show_alert: true,
      });
    }

    // Get booking FIRST (to prevent duplicate click)
    const existingBooking = await Booking.findById(bookingId);

    if (!existingBooking) {
      return bot.answerCallbackQuery(query.id, {
        text: "Booking not found",
        show_alert: true,
      });
    }

    // Prevent duplicate click
    if (existingBooking.status === status) {
      return bot.answerCallbackQuery(query.id, {
        text: `Already ${status}`,
      });
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true },
    ).populate("services");

    // Format services
    let servicesText = "N/A";

    if (updatedBooking.services && updatedBooking.services.length > 0) {
      servicesText = updatedBooking.services
        .map((service, index) => {
          return `${index + 1}. ${service.name} - $${service.price}`;
        })
        .join("\n");
    }

    // Dynamic status UI
    let statusIcon = "";
    let statusText = "";

    if (status === "approved") {
      statusIcon = "✅";
      statusText = "BOOKING APPROVED";
    } else if (status === "rejected") {
      statusIcon = "❌";
      statusText = "BOOKING REJECTED";
    } else if (status === "completed") {
      statusIcon = "🎉";
      statusText = "BOOKING COMPLETED";
    } else {
      statusIcon = "⏳";
      statusText = "BOOKING PENDING";
    }

    // const adminName = query.from.first_name;

    try {
      await bot.editMessageCaption(
        `${statusIcon} <b>${statusText}</b>

👤 <b>Name:</b> ${updatedBooking.name}
📞 <b>Phone:</b> ${updatedBooking.phone_number}
📍 <b>Location:</b> ${updatedBooking.current_location}

👥 <b>People:</b> ${updatedBooking.number_of_people}
⏳ <b>Duration:</b> ${updatedBooking.trip_duration} days
💰 <b>Total:</b> $${updatedBooking.total_price}

📅 <b>Date:</b> ${new Date(updatedBooking.booking_date).toDateString()}

🧾 <b>Services:</b>
${servicesText}

📝 <b>Note:</b> ${updatedBooking.note || "N/A"}

`,
        {
          chat_id: query.message.chat.id,
          message_id: query.message.message_id,
          parse_mode: "HTML",
        },
      );
    } catch (err) {
      console.error("Edit message failed:", err.message);
    }

    // Answer callback (remove loading)
    bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.error("Telegram Error:", err);
  }
});

export default bot;
