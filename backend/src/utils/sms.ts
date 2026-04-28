// import twilio from 'twilio';

// Twilio Setup (Commented for future use)
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
// const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, message: string) => {
  try {
    // --- Mock SMS Implementation ---
    console.log('\n=============================================');
    console.log('📱 MOCK SMS SERVICE');
    console.log(`📡 To: ${to}`);
    console.log(`💬 Message: ${message}`);
    console.log('=============================================\n');

    // --- Real Twilio Implementation (Uncomment to use) ---
    /*
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: to,
    });
    console.log(`SMS sent successfully: ${response.sid}`);
    return response;
    */

    return { success: true, message: 'Mock SMS logged to console' };
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
};
