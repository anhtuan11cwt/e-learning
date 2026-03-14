import nodemailer from "nodemailer";
import "dotenv/config";

const sendMail = async (email, subject, data) => {
  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.password,
        user: process.env.gmail,
      },
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .otp { font-size: 32px; font-weight: bold; color: #4CAF50; text-align: center; letter-spacing: 5px; margin: 20px 0; }
            .footer { text-align: center; color: #888; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Xác minh mã OTP</h1>
            <p>Xin chào <strong>${data.name}</strong>,</p>
            <p>Mã OTP để xác minh của bạn là:</p>
            <div class="otp">${data.otp}</div>
            <p>Mã OTP này sẽ hết hạn sau 5 phút.</p>
            <div class="footer">
              <p>Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.gmail,
      html: htmlContent,
      subject: subject,
      to: email,
    });
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
  }
};

export default sendMail;
