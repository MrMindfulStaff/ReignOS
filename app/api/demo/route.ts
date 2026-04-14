import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const MAILCHIMP_FORM_URL =
  'https://reignos.us21.list-manage.com/subscribe/post?u=51c8d9860074f1c7205c2f452&id=3e97664d88&f_id=00d043e6f0';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { FNAME, LNAME, EMAIL, PHONE, MMERGE3, MMERGE5 } = await req.json();

  if (!FNAME || !LNAME || !EMAIL || !PHONE || !MMERGE3 || !MMERGE5) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // 1. Send email notification to demo@reignos.com
  await transporter.sendMail({
    from: `"REIGNOS Demo Requests" <${process.env.GMAIL_USER}>`,
    to: 'demo@reignos.com',
    subject: `New Demo Request — ${FNAME} ${LNAME}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Demo Request</h1>
        </div>
        <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${FNAME} ${LNAME}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${EMAIL}" style="color: #7c3aed;">${EMAIL}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="tel:${PHONE}" style="color: #7c3aed;">${PHONE}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Team Size</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${MMERGE3}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Industry</td>
              <td style="padding: 10px 0;">${MMERGE5}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <a href="mailto:${EMAIL}?subject=Your REIGNOS Demo" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Reply to ${FNAME}
            </a>
          </div>
        </div>
      </div>
    `,
  });

  // 2. Forward to Mailchimp
  const mailchimpBody = new URLSearchParams({
    EMAIL, FNAME, LNAME, PHONE,
    MMERGE3, MMERGE5,
    tags: '3146512',
    EMAILTYPE: 'html',
    'b_51c8d9860074f1c7205c2f452_3e97664d88': '',
  });

  await fetch(MAILCHIMP_FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: mailchimpBody.toString(),
  });

  return NextResponse.json({ success: true });
}
