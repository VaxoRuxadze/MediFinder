const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Predefined responses for static questions
const getFallbackResponse = (message) => {
  const msg = message.toLowerCase();
  
  // Greetings
  if (msg.includes('გამარჯობა') || msg.includes('სალამი') || msg === 'hi' || msg === 'hello') {
    return "🏥 გამარჯობა! მე ვარ MediRoute-ს ციფრული ასისტენტი. რით შემიძლია დაგეხმაროთ?";
  }
  
  // Static questions from quick-responses
  if (msg.includes('იპოვე კლინიკა') || msg.includes('კლინიკა') && !msg.includes('როგორ')) {
    return "🏥 კლინიკების მოსაძებნად გადადით 'კლინიკები' გვერდზე. შეგიძლიათ მოძებნოთ სახელით ან სპეციალობით. ასევე ნახეთ რუკაზე მდებარეობა!";
  }
  
  if (msg.includes('წამლების ფასები') || msg.includes('წამალი') && msg.includes('ფასი')) {
    return "💊 წამლების ფასების სანახავად გადადით 'წამლების ფასები' გვერდზე. იქ ნახავთ 4 სხვადასხვა აფთიაქის ფასებს (Aversi, PSP, GPC, PharmaDepot).";
  }
  
  if (msg.includes('loyalty ქულები') || msg.includes('ქულა')) {
    return "⭐ Loyalty ქულები: რეგისტრაცია (+100), ვიზიტის ჩაწერა (+50), შეფასება (+30). 500 ქულა = 50₾ ფასდაკლება! 1000 ქულა = უფასო კონსულტაცია!";
  }
  
  if (msg.includes('ვიზიტის ჩაწერა') || msg.includes('ვიზიტი') && msg.includes('ჩაწერა')) {
    return "📅 ვიზიტის ჩასაწერად აირჩიეთ კლინიკა, დააჭირეთ 'ვიზიტის ჩაწერა' ღილაკს. გთხოვთ გაიაროთ ავტორიზაცია წინასწარ. დადასტურება მოვა Email-ზე!";
  }
  
  // Help / what can you do
  if (msg.includes('რა შეგიძლია') || msg.includes('დახმარება') || msg.includes('help')) {
    return "🏥 მე შემიძლია დაგეხმაროთ:\n\n📌 იპოვოთ კლინიკა 🏥\n📌 შეადაროთ წამლების ფასები 💊\n📌 ჩაწეროთ ვიზიტი 📅\n📌 აგიხსნათ Loyalty ქულები ⭐\n📌 გაჩვენოთ ვაქცინაციის კალენდარი 💉\n\nდამისვით კონკრეტული კითხვა!";
  }
  
  // Default
  return "🏥 მე ვარ MediRoute-ს ასისტენტი. შემიძლია დაგეხმაროთ:\n\n• 🏥 იპოვო კლინიკა\n• 💊 შეადარო წამლების ფასები\n• 📅 ჩაწერო ვიზიტი\n• ⭐ აგიხსნა Loyalty ქულები\n\nდამისვით კონკრეტული კითხვა!";
};

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Try Gemini API first
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const result = await model.generateContent(`
        You are MediRoute Health Assistant. Answer in Georgian. Be helpful, brief, and friendly.
        
        IMPORTANT RULES:
        1. NEVER say "გთხოვთ გამოიყენეთ სიმპტომების შემოწმება"
        2. If user asks about clinics, tell them to go to Clinics page
        3. If user asks about medicine prices, tell them to go to Medicine Prices page
        4. If user asks about booking, explain the booking process
        5. If user asks about loyalty points, explain the points system
        
        User question: ${message}
      `);
      
      const response = await result.response;
      let text = response.text();
      
      // Remove any symptom checker redirects
      text = text.replace(/გთხოვთ გამოიყენეთ სიმპტომების შემოწმება/gi, '');
      
      res.json({ response: text });
    } catch (geminiError) {
      console.error('Gemini error:', geminiError);
      // Fallback to predefined responses
      res.json({ response: getFallbackResponse(message) });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.json({ response: getFallbackResponse('default') });
  }
});

router.get('/quick-responses', (req, res) => {
  const quickResponses = [
    { question: "🏥 იპოვე კლინიკა", answer: "კლინიკების გვერდზე ნახავთ ყველა კლინიკას" },
    { question: "💊 წამლების ფასები", answer: "წამლების ფასების გვერდზე შეადარებთ ფასებს" },
    { question: "⭐ Loyalty ქულები", answer: "რეგისტრაციით დაიწყეთ ქულების დაგროვება" },
    { question: "📅 ვიზიტის ჩაწერა", answer: "აირჩიეთ კლინიკა და დააჭირეთ ჩაწერას" }
  ];
  res.json(quickResponses);
});

module.exports = router;