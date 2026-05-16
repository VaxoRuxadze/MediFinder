const nodemailer = require('nodemailer');

// Configure email transporter (using ethereal.email for testing)
// For production, use Gmail, SendGrid, or any SMTP service
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'test@ethereal.email', // Replace with your email
    pass: 'testpassword' // Replace with your password
  }
});

// Send booking confirmation email
const sendBookingConfirmation = async (booking, user) => {
  const mailOptions = {
    from: '"MediRoute" <noreply@mediroute.ge>',
    to: user.email,
    subject: '✅ ვიზიტის დადასტურება - MediRoute',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0d6e9e;">🏥 MediRoute</h1>
          <h2>ვიზიტის დადასტურება</h2>
        </div>
        
        <p>გამარჯობა <strong>${user.name}</strong>,</p>
        <p>თქვენი ვიზიტი წარმატებით დაჯავშნილია!</p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0d6e9e; margin-bottom: 10px;">📋 ვიზიტის დეტალები</h3>
          <p><strong>🏥 კლინიკა:</strong> ${booking.clinicName}</p>
          <p><strong>📍 მისამართი:</strong> ${booking.clinicAddress}</p>
          <p><strong>📅 თარიღი:</strong> ${booking.date}</p>
          <p><strong>⏰ დრო:</strong> ${booking.time}</p>
          <p><strong>👤 პაციენტი:</strong> ${booking.patientName}</p>
          <p><strong>📞 ტელეფონი:</strong> ${booking.patientPhone}</p>
          ${booking.notes ? `<p><strong>📝 შენიშვნა:</strong> ${booking.notes}</p>` : ''}
        </div>
        
        <p><strong>⚠️ მნიშვნელოვანი:</strong></p>
        <ul>
          <li>გთხოვთ მიხვიდეთ 10 წუთით ადრე</li>
          <li>თან იქონიეთ პირადობის მოწმობა</li>
          <li>გაუქმების შემთხვევაში გთხოვთ გვაცნობოთ 2 საათით ადრე</li>
        </ul>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:3000/my-bookings" style="background: #0d6e9e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">📅 ჩემი ვიზიტები</a>
        </div>
        
        <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
          &copy; 2025 MediRoute - ჯანმრთელობის ნავიგატორი
        </p>
      </div>
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

// Send booking reminder email
const sendBookingReminder = async (booking, user) => {
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
        <p>გახსენებთ რომ ხვალ გაქვთ დაჯავშნილი ვიზიტი!</p>
        
        <div style="background: #fef9c3; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #854d0e;">📋 ვიზიტის დეტალები</h3>
          <p><strong>🏥 კლინიკა:</strong> ${booking.clinicName}</p>
          <p><strong>📍 მისამართი:</strong> ${booking.clinicAddress}</p>
          <p><strong>📅 თარიღი:</strong> ${booking.date}</p>
          <p><strong>⏰ დრო:</strong> ${booking.time}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="tel:${booking.clinicPhone}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">📞 დაურეკე კლინიკას</a>
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