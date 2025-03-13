const express = require('express');
const app = express();

// registration
app.post('/api/auth', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

// login
app.put('/api/auth', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

// logout
app.delete('/api/auth', async (req, res) => {
  res.send({});
});

// getMe
app.get('/api/user', async (req, res) => {
  res.send({ email: 'marta@id.com' });
});

app.listen(3000);