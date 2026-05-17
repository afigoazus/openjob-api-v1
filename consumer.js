import amqp from "amqplib";
import nodemailer from "nodemailer";
import "dotenv/config";
import pool from "./src/config/db.js";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function getApplicationData(application_id) {
  const query = {
    text: `SELECT 
            a.created_at,
            applicant.name AS applicant_name,
            applicant.email AS applicant_email,
            owner.email AS owner_email
           FROM applications a
           JOIN users applicant ON a.user_id = applicant.id
           JOIN jobs j ON a.job_id = j.id
           JOIN companies c ON j.company_id = c.id
           JOIN users owner ON c.user_id = owner.id
           WHERE a.id = $1`,
    values: [application_id],
  };

  const result = await pool.query(query);
  return result.rows[0];
}

async function sendNotificationEmail(data) {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: data.owner_email,
    subject: "Ada Lamaran Baru!",
    html: `
      <h3>Notifikasi Lamaran Baru</h3>
      <p>Email pelamar: ${data.applicant_email}</p>
      <p>Nama pelamar: ${data.applicant_name}</p>
      <p>Tanggal lamaran: ${new Date(data.created_at).toLocaleString("id-ID")}</p>
    `,
  });
}

async function startConsumer() {
  const url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  await channel.assertQueue("applications", { durable: true });
  channel.prefetch(1);

  console.log("Consumer berjalan, menunggu message...");

  channel.consume("applications", async (msg) => {
    if (!msg) {
      return;
    }

    try {
      const { application_id } = JSON.parse(msg.content.toString());
      const data = await getApplicationData(application_id);

      if (data) {
        await sendNotificationEmail(data);
        console.log(`Email terkirim ke ${data.owner_email}`);
      }

      channel.ack(msg);
    } catch (error) {
      console.error("Gagal memproses message:", error.message);
      channel.nack(msg, false, false);
    }
  });
}

startConsumer().catch(console.error);
