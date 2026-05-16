const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'test@ethereal.email',
    pass: 'testpassword'
  }
});

// Send reminder email
const sendReminderEmail = async (booking, user, clinic, hoursBefore) => {
  const mailOptions = {
    from: '"MediRoute" <noreply@mediroute.ge>',
    to: user.email,
    subject: `🔔 ვიზიტის შეხსენება - ${hoursBefore} საათით ადრე`,
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
          .button { background: #0d6e9e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
          .warning { background: #fef9c3; padding: 15px; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🏥 MediRoute</h2>
            <h3>ვიზიტის შეხსენება</h3>
          </div>
          <div class="content">
            <p>გამარჯობა <strong>${user.name}</strong>,</p>
            <p>გახსენებთ, რომ <strong>${hoursBefore} საათში</strong> გაქვთ დაჯავშნილი ვიზიტი!</p>
            
            <div class="booking-details">
              <h3>📋 ვიზიტის დეტალები</h3>
              <p><strong>🏥 კლინიკა:</strong> ${booking.clinicName}</p>
              <p><strong>📍 მისამართი:</strong> ${booking.clinicAddress}</p>
              <p><strong>📅 თარიღი:</strong> ${booking.date}</p>
              <p><strong>⏰ დრო:</strong> ${booking.time}</p>
              <p><strong>📞 ტელეფონი:</strong> ${booking.clinicPhone}</p>
            </div>

            <div class="warning">
              <p><strong>⚠️ მნიშვნელოვანი:</strong></p>
              <ul>
                <li>გთხოვთ მიხვიდეთ 10 წუთით ადრე</li>
                <li>თან იქონიეთ პირადობის მოწმობა</li>
                <li>გაუქმების შემთხვევაში გთხოვთ გვაცნობოთ</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="http://localhost:3000/my-bookings" class="button">📅 ჩემი ვიზიტები</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${user.email} for booking on ${booking.date}`);
    return true;
  } catch (error) {
    console.error('Reminder email error:', error);
    return false;
  }
};

// Check for appointments in 24 hours and send reminder
const check24HourReminders = async () => {
  const now = new Date();
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
  const todayStr = now.toISOString().split('T')[0];
  const tomorrowStr = in24Hours.toISOString().split('T')[0];
  
  // Find bookings for tomorrow that haven't received reminder
  const bookings = await Booking.find({
    date: tomorrowStr,
    status: 'confirmed',
    reminderSent: false
  });
  
  console.log(`Found ${bookings.length} bookings for tomorrow`);
  
  for (const booking of bookings) {
    const user = await User.findById(booking.userId);
    if (user) {
      await sendReminderEmail(booking, user, booking.clinicName, 24);
      booking.reminderSent = true;
      await booking.save();
    }
  }
};

// Check for appointments in 1 hour and send reminder
const check1HourReminders = async () => {
  const now = new Date();
  const in1Hour = new Date(now.getTime() + 60 * 60 * 1000);
  
  const todayStr = now.toISOString().split('T')[0];
  
  // Get current time in HH:MM format
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const targetHour = in1Hour.getHours();
  const targetTime = `${targetHour.toString().padStart(2, '0')}:00`;
  
  // Find bookings for today within next hour
  const bookings = await Booking.find({
    date: todayStr,
    status: 'confirmed',
    reminderSent1h: false
  });
  
  for (const booking of bookings) {
    const bookingHour = parseInt(booking.time.split(':')[0]);
    if (bookingHour === targetHour) {
      const user = await User.findById(booking.userId);
      if (user) {
        await sendReminderEmail(booking, user, booking.clinicName, 1);
        booking.reminderSent1h = true;
        await booking.save();
      }
    }
  }
};

// Run cron job every hour
const startReminderCron = () => {
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Running reminder check...', new Date().toISOString());
    await check24HourReminders();
    await check1HourReminders();
  });
  
  console.log('✅ Reminder cron job started (runs every hour)');
};

module.exports = { startReminderCron };