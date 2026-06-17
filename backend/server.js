const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Nikhil Tanneeru Portfolio Backend is Live!',
    envConfigured: !!(process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS))
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  // Log the received message to the console
  console.log('--- New Contact Form Submission ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log('-----------------------------------');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #0D0D0D;
          color: #FFFFFF;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #121212;
          border: 1px solid #D4AF37;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
        }
        .header {
          background-color: #0D0D0D;
          border-bottom: 1px solid #D4AF37;
          padding: 30px;
          text-align: center;
        }
        .logo {
          color: #D4AF37;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 2px;
          border: 2px solid #D4AF37;
          display: inline-block;
          padding: 5px 12px;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .title {
          color: #FFFFFF;
          font-size: 20px;
          margin: 0;
          font-weight: 500;
        }
        .content {
          padding: 40px 30px;
        }
        .field-label {
          color: #D4AF37;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .field-value {
          color: #FFFFFF;
          font-size: 16px;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        .footer {
          background-color: #0D0D0D;
          border-top: 1px solid #333333;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #A0A0A0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">NT</div>
          <h2 class="title">New Contact Submission</h2>
        </div>
        <div class="content">
          <div class="field-label">Name</div>
          <div class="field-value">${name}</div>
          
          <div class="field-label">Email</div>
          <div class="field-value"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></div>
          
          <div class="field-label">Message</div>
          <div class="field-value" style="white-space: pre-wrap;">${message}</div>
        </div>
        <div class="footer">
          Sent from Nikhil Tanneeru Portfolio Website
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // 1. Try Resend HTTP API first (Highly recommended for Render Free Tier to bypass SMTP blocking)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: 'Nikhil Tanneeru Portfolio <onboarding@resend.dev>',
        to: `${email}`,
        subject: `New Portfolio Message from ${name}`,
        replyTo: email,
        html: htmlContent
      });

      if (error) {
        throw new Error(error.message || JSON.stringify(error));
      }

      console.log('Message sent successfully through Resend API:', data.id);
      return res.status(200).json({ success: true, message: 'Message received and email sent successfully!' });
    }

    // 2. Fallback to standard Nodemailer SMTP
    let transporter;
    let isTest = false;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Gmail / Custom SMTP
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        family: 4
      });
    } else {
      // Ethereal SMTP fallback for local testing
      isTest = true;
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const mailOptions = {
      from: `"Nikhil Tanneeru Portfolio" <${process.env.EMAIL_USER || 'no-reply@nikhiltanneeru.dev'}>`,
      to: `${email}`,
      subject: `New Portfolio Message from ${name}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    if (isTest) {
      console.log('Message sent to test Ethereal account.');
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    } else {
      console.log('Message sent successfully through Gmail/SMTP:', info.messageId);
    }

    res.status(200).json({ success: true, message: 'Message received and email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to process message and send email.',
      details: error.message || error
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
