const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Image analysis endpoint
router.post('/analyze-image', async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    const prompt = `როგორც სამედიცინო ექსპერტი, გააანალიზე ეს სურათი (კანის გამონაყარი, ჭრილობა, სიწითლე, ან სხვა სამედიცინო მდგომარეობა).

    მომაწოდე პასუხი მხოლოდ JSON ფორმატში:
    {
      "condition": "შესაძლო მდგომარეობა",
      "probability": "მაღალი/საშუალო/დაბალი",
      "description": "აღწერა რას ხედავთ სურათზე",
      "recommendation": "რეკომენდაცია",
      "urgency": "მაღალი/საშუალო/დაბალი",
      "similarConditions": ["მსგავსი მდგომარეობა 1", "მსგავსი მდგომარეობა 2"]
    }`;

    // For demo without vision API, we'll use text analysis based on user's description
    // In production with actual image, you'd send the image to Gemini Vision
    
    // Since Gemini Vision API requires image upload, for demo we'll ask user to describe
    res.json({
      condition: "საჭიროა დამატებითი ინფორმაცია",
      probability: "საშუალო",
      description: "გთხოვთ აღწერეთ დეტალურად რა ხედავთ სურათზე (ფერი, ფორმა, მდებარეობა)",
      recommendation: "გთხოვთ მიმართოთ დერმატოლოგს",
      urgency: "საშუალო",
      similarConditions: ["ალერგიული რეაქცია", "კონტაქტური დერმატიტი", "ჭინჭრის ციება"],
      disclaimer: "ეს არის AI ანალიზი. საჭიროა ექიმის კონსულტაცია."
    });
    
  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

module.exports = router;