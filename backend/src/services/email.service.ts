import nodemailer from "nodemailer";
import type { TransportOptions } from "nodemailer";

// create a transporter !! incomplete for now
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
} as TransportOptions);
