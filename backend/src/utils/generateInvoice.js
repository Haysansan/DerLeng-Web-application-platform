import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateInvoice = (booking) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    const logoPath = path.join(__dirname, "public", "logo.png");

    const khmerFont = path.join(
      __dirname,
      "public",
      "fonts",
      "NotoSansKhmer-Regular.ttf",
    );

    doc.registerFont("khmer", khmerFont);

    doc.image(logoPath, 50, 40, { width: 100 });

    doc
      .font("Helvetica")
      .fontSize(10)
      .text("DERLENG COMMUNITY", 350, 50, { align: "right" })
      .text("Phnom Penh, Cambodia", { align: "right" })
      .text("Phone: +855 123 456 78", { align: "right" })
      .text("Email: info@derleng.com", { align: "right" });

    doc.moveDown(2);

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("#0f3d2e")
      .text("BOOKING INVOICE", 0, doc.y, {
        width: doc.page.width,
        align: "center",
      });

    doc.moveDown(1);

    const startX = 50;
    const labelWidth = 120;
    let y1 = doc.y;

    doc.font("Helvetica").fontSize(12).fillColor("black");

    const row = (label, value, yPos) => {
      doc.text(label, startX, yPos, { width: labelWidth });
      doc.text(value, startX + labelWidth, yPos);
    };
   row("Trip to:", booking.community_post_id?.title || "N/A", y1);
   row("Invoice ID:", booking._id, y1 + 20);
   row("Name:", booking.name, y1 + 40);
   row("Phone:", booking.phone_number, y1 + 60);
   row("Trip Duration:", booking.trip_duration, y1 + 80);
   row("Number of People:", booking.number_of_people, y1 + 100);
   row("Your Location:", booking.current_location, y1 + 120);
   row("Trip Date:", new Date(booking.booking_date).toDateString(), y1 + 140);
   row("Booking At:", new Date(booking.created_at).toDateString(), y1 + 160);

    doc.moveDown(2);

    const tableTop = doc.y;

    doc.font("Helvetica-Bold").fontSize(12);

    doc.text("No", 50, tableTop);
    doc.text("Service", 100, tableTop);
    doc.text("Price", 450, tableTop, { align: "right" });

    doc
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    let y = tableTop + 25;
    let total = 0;

    booking.services.forEach((s, i) => {
      doc.font("Helvetica").fontSize(11);

      doc.text(i + 1, 50, y);
      doc.text(s.name, 100, y, { width: 300 });
      doc.text(`$${s.price}`, 450, y, { align: "right" });

      total += s.price;
      y += 20;
    });

    doc
      .moveTo(300, y + 10)
      .lineTo(550, y + 10)
      .stroke();

    doc.font("Helvetica-Bold").fontSize(13).fillColor("#0f3d2e");

    doc.text("Total:", 350, y + 20);
    doc.text(`$${total}`, 450, y + 20, { align: "right" });

    doc.moveDown(2);
    y += 80;

    if (booking.admin_note) {
      doc.fillColor("#0f3d2e").fontSize(13).text("Trip Details:", 50, y);

      doc
        .fontSize(11)
        .fillColor("black")
        .text(booking.admin_note, 50, y + 20, {
          width: 450,
        });
    }

    doc.moveDown(2);

    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Contact us: info@derleng.com | +855 123 456 78", 50, 700, {
        align: "center",
      });

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .fillColor("#0f3d2e")
      .text("Thank you for booking with DERLENG!", {
        align: "center",
      });

    doc.end();
  });
};
