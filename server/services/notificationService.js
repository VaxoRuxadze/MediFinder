const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'test@ethereal.email',
    pass: 'testpassword'
  }
});

// Send booking confirmation email
const sendBookingConfirmation = async (booking, user, clinic) => {
  const mailOptions = {
    from: '"MediRoute" <noreply@mediroute.ge>',
    to: user.email,
    subject: '✅ ვიზიტის დადასტურება - MediRoute',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0d6e9e; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .status-confirmed { color: #10b981; font-weight: bold; }
          .button { background: #0d6e9e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🏥 MediRoute</h2>
            <h3>ვიზიტის დადასტურება</h3>
          </div>
          <div class="content">
            <p>გამარჯობა <strong>${user.name}</strong>,</p>
            <p>თქვენი ვიზიტი წარმატებით დაჯავშნილია!</p>
            
            <div class="booking-details">
              <h3>📋 ვიზიტის დეტალები</h3>
              <div class="detail-row">
                <span>🏥 კლინიკა:</span>
                <span><strong>${clinic.name}</strong></span>
              </div>
              <div class="detail-row">
                <span>📍 მისამართი:</span>
                <span>${clinic.address}</span>
              </div>
              <div class="detail-row">
                <span>📅 თარიღი:</span>
                <span><strong>${booking.date}</strong></span>
              </div>
              <div class="detail-row">
                <span>⏰ დრო:</span>
                <span><strong>${booking.time}</strong></span>
              </div>
              <div class="detail-row">
                <span>👤 პაციენტი:</span>
                <span>${booking.patientName}</span>
              </div>
              <div class="detail-row">
                <span>📞 ტელეფონი:</span>
                <span>${booking.patientPhone}</span>
              </div>
              <div class="detail-row">
                <span>📋 სტატუსი:</span>
                <span class="status-confirmed">✅ დადასტურებული</span>
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000/my-bookings" class="button">📅 ჩემი ვიზიტები</a>
            </div>

            <div style="background: #fef9c3; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p><strong>⚠️ მნიშვნელოვანი ინფორმაცია:</strong></p>
              <ul style="margin: 10px 0 0 20px;">
                <li>გთხოვთ მიხვიდეთ 10 წუთით ადრე</li>
                <li>თან იქონიეთ პირადობის მოწმობა</li>
                <li>გაუქმების შემთხვევაში გთხოვთ გვაცნობოთ 2 საათით ადრე</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="tel:${clinic.phone}" style="color: #0d6e9e;">📞 დაურეკეთ კლინიკას: ${clinic.phone}</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; 2025 MediRoute - ჯანმრთელობის ნავიგატორი</p>
            <p>ეს არის ავტომატური შეტყობინება, გთხოვთ არ უპასუხოთ</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

// Send booking reminder (24 hours before)
const sendBookingReminder = async (booking, user, clinic) => {
  const mailOptions = {
    from: '"MediRoute" <noreply@mediroute.ge>',
    to: user.email,
    subject: '🔔 ვიზიტის შეხსენება - MediRoute',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0d6e9e;">🏥 MediRoute</h1>
          <h2>ვიზიტის შეხსენება</h2>
        </div>
        
        <p>გამარჯობა <strong>${user.name}</strong>,</p>
        <p>გახსენებთ რომ <strong>ხვალ</strong> გაქვთ დაჯავშნილი ვიზიტი!</p>
        
        <div style="background: #fef9c3; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #854d0e;">📋 ვიზიტის დეტალები</h3>
          <p><strong>🏥 კლინიკა:</strong> ${clinic.name}</p>
          <p><strong>📍 მისამართი:</strong> ${clinic.address}</p>
          <p><strong>📅 თარიღი:</strong> ${booking.date}</p>
          <p><strong>⏰ დრო:</strong> ${booking.time}</p>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="tel:${clinic.phone}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">📞 დაურეკე კლინიკას</a>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost:3000/my-bookings" style="color: #0d6e9e;">📅 ვიზიტის მართვა</a>
        </div>
        
        <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
          &copy; 2025 MediRoute - ჯანმრთელობის ნავიგატორი
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Reminder email error:', error);
    return false;
  }
};

module.exports = { sendBookingConfirmation, sendBookingReminder };