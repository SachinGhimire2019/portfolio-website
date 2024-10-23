const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();  // Load environment variables from .env file
const app = express();
const PORT = 5500;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your HTML/CSS/JS from the "public" folder)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/send-email', (req, res) => {
  const { fullname, email, message } = req.body;

  // Set up the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail SMTP or any other service
    auth: {
      user: process.env.EMAIL_USER,  // Use environment variable for the email
      pass: process.env.EMAIL_PASS,  // Use environment variable for the password
    },
  });

  // Email options
  const mailOptions = {
    from: email, // The user's email
    to: process.env.EMAIL_USER, // Where the email will be sent (your own email)
    subject: `New message from ${fullname}`,
    text: `You have received a new message from ${fullname} (${email}):\n\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending message');
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Message sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
