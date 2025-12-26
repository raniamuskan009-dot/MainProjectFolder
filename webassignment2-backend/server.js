const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// CONNECT TO MONGO
mongoose.connect('mongodb://127.0.0.1:27017/traveldb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Error:', err));

// CONTACT FORM → SAVES TO DB (WORKS 100%)
app.post('/api/contact', async (req, res) => {
  console.log('Contact Form Received:', req.body);
  try {
    const db = mongoose.connection.db;
    await db.collection('contacts').insertOne({
      ...req.body,
      createdAt: new Date()
    });
    console.log('SAVED TO MONGODB!');
    res.json({ msg: 'Thank you! Your message was sent successfully!' });
  } catch (err) {
    console.log('Save failed:', err);
    res.status(500).json({ msg: 'Error' });
  }
});

// SIMPLE DESTINATIONS (for later)
app.get('/api/destinations', async (req, res) => {
  const db = mongoose.connection.db;
  const data = await db.collection('destinations').find().toArray();
  res.json(data || []);
});

app.get('/', (req, res) => res.send('BACKEND IS ALIVE – CONTACT SAVES NOW'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING → http://localhost:${PORT}`);
  console.log('SEND A CONTACT MESSAGE NOW');
});