import "dotenv/config";
import nodemailer from "nodemailer";

// load environment variables
const { EMAIL, PASSWORD } = process.env;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// a function to send a welcome email to a user
export const sendWelcomeEmail = async (to: string, username: string) => {
  if (!to) {
    throw new Error("Recipient email is required");
  }

  // defining html content of the email directly
  const html = `
    <!DOCTYPE html>
    <html>
    <
    `;
};
