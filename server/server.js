const express = require('express');
const mongoose = require('mongoose');
const ocrResultRoutes = require('./src/routes/ocrResultRoutes');
require('dotenv').config()
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin:process.env.CLIENT_URL// Replace with your React client's URL
}));

app.use('/api/ocr', ocrResultRoutes);

app.get('/',(req,res)=>{
  res.send("OCR Server working");
})

// Error handling middleware (if needed)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
