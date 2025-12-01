interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

let transporter: any = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS environment variables are required');
  }

  // Dynamically require nodemailer
  const nodemailerModule = eval('require')('nodemailer');
  
  // Handle different export patterns
  let nodemailer = nodemailerModule;
  if (nodemailerModule.default) {
    nodemailer = nodemailerModule.default;
  }
  
  transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

export async function sendEmail(
  options: EmailOptions,
  retries = 3
): Promise<SendEmailResult> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const transporter = getTransporter();

      const info = await transporter.sendMail({
        from: `"SR Healthy Choice" <${process.env.EMAIL_USER}>`,
        ...options,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Unknown error';

      if (attempt === retries) {
        console.error(`Email send failed after ${retries} attempts:`, err);
        return {
          success: false,
          error: err,
        };
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return {
    success: false,
    error: 'Max retries exceeded',
  };
}