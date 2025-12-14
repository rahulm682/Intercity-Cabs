import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your hosting SMTP
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your App Password (Not regular password)
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    
    console.log('📧 Email sent successfully');
  } catch (error) {
    console.error('❌ Email failed:', error);
  }
};

export default sendEmail;