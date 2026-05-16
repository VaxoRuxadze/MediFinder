const puppeteer = require('puppeteer');
const User = require('../models/User');
const Booking = require('../models/Booking');

async function generateHealthReport(userId) {
  try {
    const user = await User.findById(userId);
    const bookings = await Booking.find({ userId }).sort({ date: -1 });

    // Calculate BMI if user has weight and height
    let bmi = null;
    let bmiCategory = null;
    if (user.weight && user.height) {
      const heightInMeters = user.height / 100;
      bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
      if (bmi < 18.5) bmiCategory = 'ნაკლებწონიანი';
      else if (bmi < 25) bmiCategory = 'ნორმალური';
      else if (bmi < 30) bmiCategory = 'ჭარბწონიანი';
      else bmiCategory = 'სიმსუქნე';
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>ჯანმრთელობის ანგარიში - ${user.name}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'DejaVu Sans', 'Arial', sans-serif;
            background: #f8fafc;
            padding: 40px;
            color: #1e293b;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0d6e9e, #1a7ab0);
            color: white;
            padding: 40px;
            text-align: center;
          }
          .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
          }
          .header p {
            opacity: 0.9;
            font-size: 14px;
          }
          .content {
            padding: 40px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #0d6e9e;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .info-item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 12px;
          }
          .info-label {
            font-size: 12px;
            color: #64748b;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }
          th {
            background: #f8fafc;
            font-weight: 600;
            color: #0d6e9e;
          }
          .status-confirmed {
            color: #10b981;
          }
          .status-cancelled {
            color: #ef4444;
          }
          .status-pending {
            color: #f59e0b;
          }
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }
          .bmi-indicator {
            margin-top: 10px;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }
          .bmi-fill {
            height: 100%;
            width: 0%;
            background: #10b981;
            border-radius: 4px;
          }
          .logo {
            font-size: 48px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🏥</div>
            <h1>MediRoute ჯანმრთელობის ანგარიში</h1>
            <p>გენერირებულია: ${new Date().toLocaleDateString('ka-GE')}</p>
          </div>
          
          <div class="content">
            <!-- User Info Section -->
            <div class="section">
              <h2 class="section-title">👤 პირადი ინფორმაცია</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">სრული სახელი</div>
                  <div class="info-value">${user.name}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">ელ.ფოსტა</div>
                  <div class="info-value">${user.email}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">წევრი წლიდან</div>
                  <div class="info-value">${user.registeredAt ? new Date(user.registeredAt).toLocaleDateString('ka-GE') : 'N/A'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">ტელეფონი</div>
                  <div class="info-value">${user.phone || 'არ არის მითითებული'}</div>
                </div>
              </div>
            </div>

            <!-- Health Metrics Section -->
            <div class="section">
              <h2 class="section-title">📊 ჯანმრთელობის მაჩვენებლები</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">სიმაღლე</div>
                  <div class="info-value">${user.height ? user.height + ' სმ' : 'არ არის მითითებული'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">წონა</div>
                  <div class="info-value">${user.weight ? user.weight + ' კგ' : 'არ არის მითითებული'}</div>
                </div>
                ${bmi ? `
                <div class="info-item">
                  <div class="info-label">BMI (სხეულის მასის ინდექსი)</div>
                  <div class="info-value">${bmi} - ${bmiCategory}</div>
                  <div class="bmi-indicator">
                    <div class="bmi-fill" style="width: ${(bmi / 40) * 100}%"></div>
                  </div>
                </div>
                ` : ''}
                <div class="info-item">
                  <div class="info-label">სქესი</div>
                  <div class="info-value">${user.gender === 'male' ? 'მამრობითი' : user.gender === 'female' ? 'მდედრობითი' : 'არ არის მითითებული'}</div>
                </div>
              </div>
            </div>

            <!-- Appointments Section -->
            <div class="section">
              <h2 class="section-title">📅 ვიზიტების ისტორია</h2>
              ${bookings.length === 0 ? `
                <p style="color: #64748b; text-align: center; padding: 20px;">ჯერ არ გაქვთ ჩაწერილი ვიზიტები</p>
              ` : `
                <table>
                  <thead>
                    <tr>
                      <th>კლინიკა</th>
                      <th>თარიღი</th>
                      <th>დრო</th>
                      <th>სტატუსი</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${bookings.map(booking => `
                      <tr>
                        <td>${booking.clinicName}</td>
                        <td>${booking.date}</td>
                        <td>${booking.time}</td>
                        <td class="status-${booking.status}">${booking.status === 'confirmed' ? '✅ დადასტურებული' : booking.status === 'cancelled' ? '❌ გაუქმებული' : '⏳ მოლოდინში'}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `}
            </div>

            <!-- Statistics Section -->
            <div class="section">
              <h2 class="section-title">📈 სტატისტიკა</h2>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">სულ ვიზიტები</div>
                  <div class="info-value">${bookings.length}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">დადასტურებული ვიზიტები</div>
                  <div class="info-value">${bookings.filter(b => b.status === 'confirmed').length}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">დასრულებული ვიზიტები</div>
                  <div class="info-value">${bookings.filter(b => b.status === 'completed').length}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">გაუქმებული ვიზიტები</div>
                  <div class="info-value">${bookings.filter(b => b.status === 'cancelled').length}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>MediRoute - ჯანმრთელობის ნავიგატორი</p>
            <p>ეს ანგარიში გენერირებულია ავტომატურად. თუ გაქვთ შეკითხვები, დაგვიკავშირდით: info@mediroute.ge</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ 
      format: 'A4', 
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });
    await browser.close();
    return pdf;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
}

module.exports = { generateHealthReport };