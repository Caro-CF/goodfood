const express = require('express');
const sendEmail = require('./services/mailService');
const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
    console.log(req.body, "BODY");
  const { to, subject, text } = req.body;
  await sendEmail(to, subject, text);
  res.send('Email sent if no errors.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email microservice running on port ${PORT}`);
});
