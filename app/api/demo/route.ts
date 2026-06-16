import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabase';

const NOTIFY_EMAIL = 'emily@noracomply.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, role, size, tools, message } = body as {
      name?: string;
      email?: string;
      company?: string;
      role?: string;
      size?: string;
      tools?: string[];
      message?: string;
    };

    if (!name?.trim() || !company?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!email?.trim() || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Persist lead — happens first so we never lose an enquiry even if email fails
    const { error: dbError } = await supabase.from('demo_inquiries').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      role: role?.trim() || null,
      company_size: size || null,
      ai_tools: tools && tools.length > 0 ? tools : null,
      message: message?.trim() || null,
    });

    if (dbError) {
      console.error('[demo] Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Could not save inquiry' }, { status: 500 });
    }

    // Fire both emails in parallel — failures are logged but don't block the response
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [{ error: notifyErr }, { error: confirmErr }] = await Promise.all([
      resend.emails.send({
        from: 'Nora Comply <hello@noracomply.eu>',
        to: NOTIFY_EMAIL,
        replyTo: email.trim(),
        subject: `New demo request — ${name.trim()} at ${company.trim()}`,
        html: buildNotifyHtml({ name: name.trim(), email: email.trim(), company: company.trim(), role, size, tools, message }),
      }),
      resend.emails.send({
        from: 'Nora Comply <hello@noracomply.eu>',
        to: email.trim(),
        subject: 'We received your demo request',
        html: buildConfirmHtml({ name: name.trim() }),
      }),
    ]);

    if (notifyErr) console.error('[demo] Resend notify error:', notifyErr);
    if (confirmErr) console.error('[demo] Resend confirm error:', confirmErr);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[demo] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 14px;background:#EEF2FB;font-size:13px;font-weight:600;color:#4A5B7A;white-space:nowrap;border-bottom:1px solid #D1DCF5;vertical-align:top;">${label}</td>
    <td style="padding:10px 14px;font-size:14px;color:#15213A;border-bottom:1px solid #D1DCF5;">${value}</td>
  </tr>`;
}

function buildNotifyHtml(data: {
  name: string; email: string; company: string;
  role?: string; size?: string; tools?: string[]; message?: string;
}): string {
  const { name, email, company, role, size, tools, message } = data;
  const toolsStr = tools?.length ? tools.join(', ') : 'None selected';
  const timestamp = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' });
  const safeMsg = message ? message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
  const messageBlock = safeMsg
    ? `<div style="background:#EEF2FB;border-left:4px solid #2F5FD0;border-radius:0 8px 8px 0;padding:14px 18px;margin:20px 0 0;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#4A5B7A;text-transform:uppercase;letter-spacing:.05em;">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.65;color:#15213A;">${safeMsg}</p>
       </div>`
    : '';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px 16px;font-family:Arial,sans-serif;background:#EEF2FB;color:#15213A;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="background:#16244A;padding:24px 28px;border-radius:14px 14px 0 0;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7aabff;">Nora Comply</p>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;line-height:1.25;">New demo request</h1>
      <p style="margin:6px 0 0;font-size:14px;color:#A8BEDF;">${name} · ${company}</p>
    </div>
    <div style="background:#fff;border:1px solid #D1DCF5;border-top:none;padding:24px 28px;border-radius:0 0 14px 14px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Name', name)}
        ${row('Email', `<a href="mailto:${email}" style="color:#2F5FD0;font-weight:600;">${email}</a>`)}
        ${row('Company', `<strong>${company}</strong>`)}
        ${row('Role', role || 'Not provided')}
        ${row('Company size', size || 'Not provided')}
        ${row('AI tools', toolsStr)}
      </table>
      ${messageBlock}
      <p style="margin:24px 0 0;font-size:12px;color:#7E92BE;border-top:1px solid #D1DCF5;padding-top:16px;">
        Submitted ${timestamp} · Reply to respond directly to ${name}.
      </p>
    </div>
  </div>
</body></html>`;
}

function buildConfirmHtml(data: { name: string }): string {
  const { name } = data;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px 16px;font-family:Arial,sans-serif;background:#EEF2FB;color:#15213A;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="background:#16244A;padding:24px 28px;border-radius:14px 14px 0 0;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7aabff;">Nora Comply</p>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;line-height:1.25;">We've got your request</h1>
    </div>
    <div style="background:#fff;border:1px solid #D1DCF5;border-top:none;padding:24px 28px;border-radius:0 0 14px 14px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${name},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
        Thanks for requesting a demo of Nora Comply. We'll be in touch within <strong>one business day</strong> to find a time that works.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
        Questions in the meantime? Reply to this email or reach us at
        <a href="mailto:hello@noracomply.eu" style="color:#2F5FD0;font-weight:600;">hello@noracomply.eu</a>.
      </p>
      <p style="margin:0;font-size:14px;color:#4A5B7A;">The Nora Comply team</p>
      <p style="margin:24px 0 0;font-size:12px;color:#7E92BE;border-top:1px solid #D1DCF5;padding-top:16px;">
        You're receiving this because you submitted a demo request at noracomply.eu.
      </p>
    </div>
  </div>
</body></html>`;
}
