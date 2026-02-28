import nodemailer from "nodemailer";
import { type InsertSubscription } from "@shared/schema";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendSubscriptionEmail(data: InsertSubscription) {
  const mailOptions = {
    from: `"Mana Dairy Notifications" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO,
    subject: `🥛 New Subscription: ${data.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #2d6a4f; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">New Order Details</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333333;">
          <p style="font-size: 18px; margin-top: 0;">You have received a new subscription request from <strong>${data.fullName}</strong>.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 40%;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.phoneNumber}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.address}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Product:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.product}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Quantity:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.quantity} L</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Frequency:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.frequency}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Delivery Time:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.deliveryTime}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Start Date:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.startDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Special Instructions:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${data.specialInstructions || "None"}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; font-size: 14px; text-align: center; color: #888888;">
            <p>This is an automated notification from the Mana Dairy web app.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Subscription email sent for ${data.fullName}`);
  } catch (error) {
    console.error(`❌ Failed to send email for ${data.fullName}:`, error);
  }
}

export async function sendUserConfirmationEmail(data: InsertSubscription) {
  if (!data.email) return;

  const mailOptions = {
    from: `"Mana Dairy" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `🥛 Order Confirmed - Mana Dairy`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #2d6a4f; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Order Confirmed!</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333333;">
          <p style="font-size: 18px; margin-top: 0;">Hi <strong>${data.fullName}</strong>,</p>
          <p>Thank you for choosing <strong>Mana Dairy</strong>! We are excited to serve you fresh, organic dairy products directly from our farm.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin-top: 0; font-weight: bold; color: #2d6a4f;">Status: Your order is being processed and will be delivered soon!</p>
            <p style="margin-bottom: 0;"><strong>Product:</strong> ${data.product}<br>
            <strong>Frequency:</strong> ${data.frequency}<br>
            <strong>Start Date:</strong> ${data.startDate}</p>
          </div>

          <p>Our delivery partner will reach out to you at <strong>${data.phoneNumber}</strong> for your first delivery during the <strong>${data.deliveryTime}</strong> slot.</p>
          
          <p>If you have any questions, feel free to reply to this email or reach us on WhatsApp at <strong>+91 87121 31151</strong>.</p>
          
          <div style="margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; font-size: 14px; text-align: center; color: #888888;">
            <p>Pure. Fresh. Organic.<br><strong>Mana Dairy</strong></p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to user: ${data.email}`);
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${data.email}:`, error);
  }
}

