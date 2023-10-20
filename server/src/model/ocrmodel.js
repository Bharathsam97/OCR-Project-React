const mongoose = require("mongoose");

const ocrResultSchema = new mongoose.Schema({
  originalImage: {
    imageURL: String, // Store the image URL as a string
    contentType: String,
  },
  extractedText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const OcrResult = mongoose.model("OcrResult", ocrResultSchema);

module.exports = OcrResult;
