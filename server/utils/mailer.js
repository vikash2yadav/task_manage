import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account - Task Manage</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 50px 30px;
                text-align: center;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.1)"/></svg>');
                background-size: cover;
            }
            
            .header-content {
                position: relative;
                z-index: 2;
            }
            
            .header h1 {
                font-size: 32px;
                font-weight: 800;
                margin-bottom: 12px;
                letter-spacing: -0.5px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .header p {
                font-size: 18px;
                opacity: 0.95;
                font-weight: 400;
                max-width: 400px;
                margin: 0 auto;
            }
            
            .content {
                padding: 50px 40px;
                text-align: center;
                background: #ffffff;
            }
            
            .logo {
                font-size: 24px;
                font-weight: 800;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 25px;
                display: inline-block;
            }
            
            .welcome-message {
                color: #4a5568;
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 35px;
                text-align: center;
            }
            
            .otp-section {
                background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
                border-radius: 20px;
                padding: 40px 30px;
                margin: 35px 0;
                border: 2px solid #e6eeff;
                position: relative;
                overflow: hidden;
            }
            
            .otp-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
            }
            
            .otp-label {
                color: #4a5568;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 15px;
                display: block;
            }
            
            .otp-code {
                font-size: 48px;
                font-weight: 800;
                color: #2d3748;
                letter-spacing: 12px;
                text-align: center;
                background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                padding: 25px 40px;
                border-radius: 16px;
                border: 3px solid #e6eeff;
                margin: 0 auto;
                display: inline-block;
                min-width: 320px;
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
                text-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            
            .instruction-section {
                background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
                border: 2px solid #ffeaa7;
                border-radius: 16px;
                padding: 30px;
                margin: 30px 0;
                text-align: left;
                position: relative;
            }
            
            .instruction-icon {
                position: absolute;
                top: -15px;
                left: 25px;
                background: #ffd43b;
                color: #856404;
                padding: 8px 12px;
                border-radius: 10px;
                font-weight: 700;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(255, 212, 59, 0.3);
            }
            
            .instruction-section h3 {
                color: #856404;
                font-size: 18px;
                margin-bottom: 20px;
                margin-top: 10px;
                font-weight: 700;
            }
            
            .instruction-list {
                color: #856404;
                padding-left: 20px;
                margin: 0;
            }
            
            .instruction-list li {
                margin-bottom: 12px;
                line-height: 1.5;
                font-size: 15px;
                position: relative;
            }
            
            .instruction-list li::marker {
                color: #ffd43b;
                font-weight: bold;
            }
            
            .security-alert {
                background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%);
                border: 2px solid #f5c6cb;
                border-radius: 16px;
                padding: 25px;
                margin: 25px 0;
                color: #721c24;
                font-size: 15px;
                text-align: center;
                position: relative;
            }
            
            .security-icon {
                position: absolute;
                top: -12px;
                left: 50%;
                transform: translateX(-50%);
                background: #dc3545;
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: 700;
                font-size: 12px;
            }
            
            .security-alert strong {
                color: #dc3545;
            }
            
            .action-message {
                color: #4a5568;
                font-size: 16px;
                line-height: 1.6;
                margin: 25px 0;
                padding: 20px;
                background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
                border-radius: 12px;
                border-left: 4px solid #667eea;
            }
            
            .footer {
                background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
                padding: 40px 30px;
                text-align: center;
                color: #e2e8f0;
            }
            
            .footer-content {
                max-width: 400px;
                margin: 0 auto;
            }
            
            .footer-logo {
                font-size: 20px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 15px;
                opacity: 0.9;
            }
            
            .footer p {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 12px;
                opacity: 0.8;
            }
            
            .support-link {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
                transition: color 0.3s ease;
            }
            
            .support-link:hover {
                color: #764ba2;
            }
            
            .social-links {
                margin-top: 20px;
            }
            
            .social-links a {
                color: #e2e8f0;
                text-decoration: none;
                margin: 0 10px;
                font-size: 14px;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .social-links a:hover {
                opacity: 1;
            }
            
            @media only screen and (max-width: 600px) {
                body {
                    padding: 10px;
                    background: #667eea;
                }
                
                .container {
                    margin: 0;
                    border-radius: 16px;
                }
                
                .header {
                    padding: 40px 25px;
                }
                
                .header h1 {
                    font-size: 26px;
                }
                
                .header p {
                    font-size: 16px;
                }
                
                .content {
                    padding: 40px 25px;
                }
                
                .otp-section {
                    padding: 30px 20px;
                    margin: 25px 0;
                }
                
                .otp-code {
                    font-size: 36px;
                    letter-spacing: 8px;
                    min-width: 280px;
                    padding: 20px 30px;
                }
                
                .instruction-section,
                .security-alert {
                    padding: 25px 20px;
                }
                
                .footer {
                    padding: 30px 25px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header Section -->
            <div class="header">
                <div class="header-content">
                    <h1>🔐 Verify Your Account</h1>
                    <p>Welcome to Task Manage! Let's get you started with your verification code</p>
                </div>
            </div>
            
            <!-- Content Section -->
            <div class="content">
                <div class="logo">Task Manage - By Vikash</div>
                
                <p class="welcome-message">
                    🎉 Thank you for joining <strong>Task Manage</strong>! We're excited to have you on board. 
                    To complete your registration and secure your account, please use the verification code below:
                </p>
                
                <!-- Action Message -->
                <div class="action-message">
                    💡 <strong>Quick Tip:</strong> Enter this code in the verification field to activate your account 
                    and start organizing your tasks efficiently!
                </div>
                
                <!-- OTP Display Section -->
                <div class="otp-section">
                    <span class="otp-label">Your Verification Code</span>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <!-- Instructions Section -->
                <div class="instruction-section">
                    <div class="instruction-icon">📋</div>
                    <h3>Important Instructions</h3>
                    <ul class="instruction-list">
                        <li>⏰ This OTP is valid for <strong>10 minutes</strong> only</li>
                        <li>🔒 Do not share this code with anyone</li>
                        <li>✅ Enter the code exactly as shown above</li>
                        <li>🚫 If you didn't request this, please ignore this email</li>
                        <li>💾 Keep your verification codes confidential at all times</li>
                    </ul>
                </div>
                
                <!-- Security Alert -->
                <div class="security-alert">
                    <div class="security-icon">⚠️ SECURITY</div>
                    <strong>Security Alert:</strong> Our team will never ask for your OTP or password. 
                    Keep your verification codes confidential and never share them with anyone.
                </div>
            </div>
            
            <!-- Footer Section -->
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-logo">Task Manage</div>
                    <p>Streamlining your productivity, one task at a time</p>
                    <p>Need help? Contact our support team at <br>
                    <a href="mailto:vikash9412077@gmail.com" class="support-link">vikash9412077@gmail.com</a></p>
                    <p>This is an automated message, please do not reply to this email.</p>
                    
                    <div class="social-links">
                        <a href="#">Website</a> • 
                        <a href="#">Privacy Policy</a> • 
                        <a href="#">Terms of Service</a>
                    </div>
                    
                    <p style="margin-top: 20px; opacity: 0.6;">&copy; 2024 Task Manage - By Vikash. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Task Manage - By Vikash" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject: "🎯 Your OTP Verification Code - Task Manage (By Vikash)",
    html: htmlTemplate,
  });
};