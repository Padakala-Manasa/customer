const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/send-emails', (req, res) => {
  exec('python3 server/send_emails.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Failed to send emails');
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send('Error sending emails');
    }
    console.log(`Output: ${stdout}`);
    res.send('Emails sent successfully');
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
