import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
require('dotenv').config()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'the.abdo.kh@gmail.com',
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
        from: email,
        to: 'the.abdo.kh@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: message,
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}
