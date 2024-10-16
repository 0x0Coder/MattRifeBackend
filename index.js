const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/send-email', async (req, res) => {
  const { fullName, phone, email, subject, message } = req.body;

  console.log('Sending email to:', process.env.RECEIVER_EMAIL); // Check the receiver's email
  console.log('Using email:', process.env.EMAIL); // Check your email
  console.log('Password set:', !!process.env.PASSWORD); // Check if the password is set

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `Contact Form Submission: ${subject}`,
    text: `
      You have a new contact form submission from:
      Name: ${fullName}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email', error);  // Log the error to see more details
    res.status(500).send({ message: 'Error sending email', error });
  }
});

app.post('/send-bookingemail', async (req, res) => {
  const { fullName, phone, email, experience, payment } = req.body;

  console.log('Sending email to:', process.env.RECEIVER_EMAIL); // Check the receiver's email
  console.log('Using email:', process.env.EMAIL); // Check your email
  console.log('Password set:', !!process.env.PASSWORD); // Check if the password is set

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `Event Booking Form Submission:`,
    text: `
      You have a new contact form submission from:
      Name: ${fullName}
      Email: ${email}
      Phone: ${phone}
      Payment Method: ${payment}
      Experience: ${experience}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email', error);  // Log the error to see more details
    res.status(500).send({ message: 'Error sending email', error });
  }
});

app.post('/send-newsletter', async (req, res) => {
  const { email } = req.body;

  console.log('Sending email to:', process.env.RECEIVER_EMAIL); // Check the receiver's email
  console.log('Using email:', process.env.EMAIL); // Check your email
  console.log('Password set:', !!process.env.PASSWORD); // Check if the password is set

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `You have a new Newsletter subscription`,
    text: `
      You have a new Newsletter subscription
      Email: ${email}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email', error);  // Log the error to see more details
    res.status(500).send({ message: 'Error sending email', error });
  }
});


module.exports = app;

