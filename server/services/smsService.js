// This is a simulated SMS service
// For real SMS, you would use Twilio API

const sendSMS = async (phoneNumber, message) => {
  console.log(`📱 Sending SMS to ${phoneNumber}: ${message}`);
  return true;
};

const sendBookingReminderSMS = async (booking, user) => {
  const message = `🏥 MediRoute: გახსენებთ რომ ხვალ ${booking.date} ${booking.time} საათზე გაქვთ ვიზიტი ${booking.clinicName}-ში. ${booking.clinicPhone}`;
  return await sendSMS(user.phone, message);
};

module.exports = { sendSMS, sendBookingReminderSMS };