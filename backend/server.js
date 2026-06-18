const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// The portfolio owner's email where notifications will be sent
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER || 'nikhiltanneeeru15@gmail.com';

// In-memory mock database of users for local testing
const mockUsers = [
  {
    email: process.env.EMAIL_USER || 'cse22d45a0526@gmail.com',
    password: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890' // mock hashed password
  }
];

// Mock database pool matching query pattern
const pool = {
  query: async (sql, params) => {
    // SELECT * FROM user WHERE email='...'
    if (sql.includes('SELECT') && sql.includes('user')) {
      let email = params ? params[0] : null;
      if (!email) {
        const match = sql.match(/email\s*=\s*'([^']+)'/);
        if (match) email = match[1];
      }
      const matched = mockUsers.filter(u => u.email === email);
      return [matched];
    }
    
    // UPDATE user SET password='...' WHERE email='...'
    if (sql.includes('UPDATE') && sql.includes('user')) {
      let passwordHash = params ? params[0] : null;
      let email = params ? params[1] : null;
      if (!passwordHash) {
        const pwdMatch = sql.match(/password\s*=\s*'([^']+)'/);
        if (pwdMatch) passwordHash = pwdMatch[1];
      }
      if (!email) {
        const emailMatch = sql.match(/email\s*=\s*'([^']+)'/);
        if (emailMatch) email = emailMatch[1];
      }
      const index = mockUsers.findIndex(u => u.email === email);
      if (index !== -1) {
        mockUsers[index].password = passwordHash;
      }
      return [{ affectedRows: 1 }];
    }
    return [[]];
  }
};

// OTP Generation Helper
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// In-memory active OTP store
const currentOTP = {};

// Access Token Secret for JWT
const accessTokenSecret = process.env.JWT_SECRET || 'R4fahCwOo87LCcl8B9zR46SVXwjDFphh';

// JWT Token Generation Helper
const generateJWTToken = (user) => {
  return jwt.sign(user, accessTokenSecret, {
    expiresIn: '15m'
  });
};

// JWT Authentication Middleware
const JWTAuthentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(404).json({ msg: 'Invalid Token or Token missing' });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(404).json({ msg: 'Invalid Token or Token missing' });
    }
    req.user = user;
    next();
  });
};

// Helper: Send OTP Email
const sendOtpEmail = async (email, otp) => {
  const htmlContent = `<h1> Hello Guru This is Your otp : ${otp}, pleace don't share to anyone</h1>`;
  
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Nikhil Tanneeru Portfolio <onboarding@resend.dev>',
      to: email,
      subject: "OTP FROM MY NODE SERVER",
      html: htmlContent
    });
    if (error) {
      throw new Error(error.message || JSON.stringify(error));
    }
    console.log('OTP sent successfully through Resend API:', data.id);
    return 'OTP SEND SUCCESSFULY';
  }

  let transporter;
  let isTest = false;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
  } else {
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
    to: email,
    subject: "OTP FROM MY NODE SERVER",
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  if (isTest) {
    console.log('OTP sent to Ethereal. Preview URL: ' + nodemailer.getTestMessageUrl(info));
  } else {
    console.log('OTP sent successfully through Gmail/SMTP:', info.messageId);
  }
  return 'OTP SEND SUCCESSFULY';
};

// Export helpers for external reference/testing
exports.generateOtp = generateOtp;
exports.currentOTP = currentOTP;
exports.generateJWTToken = generateJWTToken;
exports.JWTAuthentication = JWTAuthentication;
exports.sendOtpEmail = sendOtpEmail;

// Routes
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Nikhil Tanneeru Portfolio Backend is Live!',
    envConfigured: !!(process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)),
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasSmtpCredentials: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

app.post('/api/contact', (req, res) => {
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

  // Return a successful response immediately to ensure the client gets an instant response
  res.status(200).json({ success: true, message: 'Message received successfully!' });

  // Process the email dispatch asynchronously in the background
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

  (async () => {
    try {
      // 1. Try Resend HTTP API first (Highly recommended for Render Free Tier to bypass SMTP blocking)
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: 'Nikhil Tanneeru Portfolio <onboarding@resend.dev>',
          to: CONTACT_RECEIVER_EMAIL,
          subject: `New Portfolio Message from ${name}`,
          replyTo: email,
          html: htmlContent
        });

        if (error) {
          throw new Error(error.message || JSON.stringify(error));
        }

        console.log('Message sent successfully through Resend API:', data.id);
        return;
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
        to: CONTACT_RECEIVER_EMAIL,
        replyTo: email,
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
    } catch (error) {
      console.error('Error sending email in background:', error);
    }
  })();
});

// Forgot Password Route (OTP request)
app.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  try {
    const findmail = await pool.query(`SELECT * FROM user WHERE email='${email}'`);
    if (findmail[0].length === 0) {
      res.status(404).json({ msg: 'user not exist pleace register' });
    } else {
      const generatedOTP = generateOtp();
      currentOTP[email] = generatedOTP;
      console.log('Active OTP store:', currentOTP);

      // Return success instantly
      res.status(200).json({ msg: 'OTP SEND' });

      // Send email in background
      sendOtpEmail(email, generatedOTP)
        .then((data) => console.log('OTP send status:', data))
        .catch((err) => console.error('Failed to send OTP:', err));
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ msg: 'SERVER ERROR' });
  }
});

// Verify OTP Route
app.post('/verify-otp', (req, res) => {
  const { email, OTP } = req.body;
  console.log(`email:${email}`);
  console.log(`OTP:${OTP}`);
  
  if (Object.keys(currentOTP).includes(email)) {
    if (currentOTP[email] === OTP.toString()) {
      res.status(200).json({ msg: 'OTP VERIFIED SUCCESSFULLY' });
    } else {
      res.status(404).json({ msg: 'OTP Invaild' });
    }
  } else {
    res.status(404).json({ msg: 'OTP Invaild' });
  }
});

// Update Password Route
app.post('/update-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 2);
    await pool.query(`UPDATE user SET password='${passwordHash}' WHERE email='${email}'`);
    res.status(200).json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error('Update password error:', err);
    res.status(500).json({ msg: 'SERVER ERROR' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
