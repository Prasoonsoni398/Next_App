import nodemailer from 'nodemailer';

let devTransporter = null;

const getTransporter = async () => {
    if (process.env.NODE_ENV === 'production') {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
    }

    if (!devTransporter) {
        let testAccount = await nodemailer.createTestAccount();
        devTransporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    }
    return devTransporter;
}

export const sendVerificationEmail = async (email, token) => {
    const transporter = await getTransporter();
    
    const verificationUrl = `http://localhost:3000/api/verify-email?token=${token}`;
    
    const info = await transporter.sendMail({
        from: '"Hospital App" <noreply@hospitalapp.com>',
        to: email,
        subject: "Verify your email address",
        html: `
            <h1>Welcome to Hospital App!</h1>
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
        `,
    });

    console.log("Message sent: %s", info.messageId);
    if (process.env.NODE_ENV !== 'production') {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
};

export const sendPasswordResetEmail = async (email, token) => {
    const transporter = await getTransporter();
    
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    
    const info = await transporter.sendMail({
        from: '"Hospital App" <noreply@hospitalapp.com>',
        to: email,
        subject: "Reset your password",
        html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    });

    console.log("Message sent: %s", info.messageId);
    if (process.env.NODE_ENV !== 'production') {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
};
