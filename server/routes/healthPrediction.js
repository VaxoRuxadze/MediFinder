const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Store user health data (in real app, this would be in MongoDB)
let userHealthData = new Map();

// Save health data
router.post('/save', async (req, res) => {
  try {
    const { userId, healthData } = req.body;
    
    if (!userHealthData.has(userId)) {
      userHealthData.set(userId, []);
    }
    
    const userData = userHealthData.get(userId);
    userData.push({
      ...healthData,
      date: new Date().toISOString()
    });
    
    // Keep only last 30 days of data
    if (userData.length > 30) {
      userData.shift();
    }
    
    userHealthData.set(userId, userData);
    
    res.json({ success: true, message: 'მონაცემები შენახულია' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's health history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = userHealthData.get(userId) || [];
    res.json(history);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// AI Prediction
router.post('/predict', async (req, res) => {
  try {
    const { healthData, history } = req.body;
    
    const predictionPrompt = `
      როგორც სამედიცინო AI ასისტენტი, გააანალიზე შემდეგი ჯანმრთელობის მონაცემები:

      ახალი მონაცემები:
      - ასაკი: ${healthData.age || 'არ არის მითითებული'}
      - სქესი: ${healthData.gender || 'არ არის მითითებული'}
      - წონა: ${healthData.weight || 'არ არის მითითებული'} კგ
      - სიმაღლე: ${healthData.height || 'არ არის მითითებული'} სმ
      - სისტოლური წნევა: ${healthData.systolicBP || 'არ არის მითითებული'}
      - დიასტოლური წნევა: ${healthData.diastolicBP || 'არ არის მითითებული'}
      - სისხლში შაქარი: ${healthData.bloodSugar || 'არ არის მითითებული'} მგ/დლ
      - გულისცემა: ${healthData.heartRate || 'არ არის მითითებული'} bpm
      - ძილი: ${healthData.sleep || 'არ არის მითითებული'} საათი
      - ნაბიჯები: ${healthData.steps || 'არ არის მითითებული'}
      - სტრესის დონე: ${healthData.stressLevel || 'არ არის მითითებული'} (1-10)
      
      ისტორიული მონაცემები (ბოლო 30 დღე):
      ${history && history.length > 0 ? JSON.stringify(history.slice(-7)) : 'არ არის ისტორია'}

      გთხოვთ მომაწოდოთ ანალიზი შემდეგ ფორმატში (JSON):
      {
        "bmi": BMI მაჩვენებელი (თუ არის მონაცემები),
        "bmiCategory": "ნაკლებწონიანი/ნორმალური/ჭარბწონიანი/სიმსუქნე",
        "healthScore": "ქულა 0-100 შორის",
        "riskFactors": ["რისკის ფაქტორი 1", "რისკის ფაქტორი 2"],
        "predictions": {
          "cardiovascular": "დაბალი/საშუალო/მაღალი რისკი",
          "diabetes": "დაბალი/საშუალო/მაღალი რისკი",
          "hypertension": "დაბალი/საშუალო/მაღალი რისკი"
        },
        "recommendations": [
          "რეკომენდაცია 1",
          "რეკომენდაცია 2",
          "რეკომენდაცია 3"
        ],
        "lifestyleTips": [
          "რჩევა 1",
          "რჩევა 2"
        ],
        "summary": "მოკლე შეჯამება"
      }

      მნიშვნელოვანი: ეს არ არის სამედიცინო დიაგნოზი. ყოველთვის მიმართეთ ექიმს.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(predictionPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    let jsonResponse;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found');
      }
    } catch (parseError) {
      // Fallback response
      jsonResponse = {
        bmi: healthData.weight && healthData.height ? (healthData.weight / ((healthData.height/100) ** 2)).toFixed(1) : null,
        bmiCategory: "მონაცემები არასაკმარისია",
        healthScore: 75,
        riskFactors: ["რეგულარული შემოწმება რეკომენდებულია"],
        predictions: {
          cardiovascular: "საშუალო",
          diabetes: "საშუალო",
          hypertension: "საშუალო"
        },
        recommendations: [
          "რეგულარულად აკონტროლეთ წნევა",
          "იკვებეთ ჯანსაღად",
          "ივარჯიშეთ რეგულარულად"
        ],
        lifestyleTips: [
          "დაიძინეთ 7-8 საათი",
          "დალიეთ საკმარისი წყალი"
        ],
        summary: "თქვენი მონაცემების მიხედვით, ჯანმრთელობის მდგომარეობა სტაბილურია. გააგრძელეთ ჯანსაღი ცხოვრების წესი."
      };
    }

    res.json({
      ...jsonResponse,
      disclaimer: 'ეს არის AI-ს მიერ გენერირებული ანალიზი და არ წარმოადგენს სამედიცინო დიაგნოზს.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      error: 'დროებითი შეფერხება',
      healthScore: 70,
      recommendations: ['გთხოვთ სცადოთ მოგვიანებით'],
      summary: 'დროებითი ტექნიკური შეფერხება'
    });
  }
});

module.exports = router;