'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { TOURS } from '@/lib/tours';
import { BUSINESS } from '@/lib/site';

const schema = z.object({
  name: z.string().trim().min(2, 'errName').max(120),
  email: z.string().trim().email('errEmail').max(200),
  phone: z.string().trim().max(40).optional().default(''),
  service: z.enum(['tour', 'shuttle', 'moz', 'custom']).catch('tour'),
  trip: z.string().trim().max(100).optional().default(''),
  date: z.string().trim().max(20).optional().default(''),
  people: z.string().trim().max(5).optional().default(''),
  message: z.string().trim().min(10, 'errMessage').max(4000),
  locale: z.string().max(5).optional().default('en'),
  company: z.string().max(0).optional().default(''), // honeypot: must stay empty
});

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function sendEnquiry(_prev, formData) {
  const raw = Object.fromEntries(formData.entries());

  // Bots fill every field. Pretend success so they learn nothing.
  if (raw.company) return { status: 'ok' };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) errors[issue.path[0]] = issue.message;
    return { status: 'invalid', errors };
  }
  const d = parsed.data;
  const tripName = TOURS.find((t) => t.slug === d.trip)?.slug || d.trip;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Enquiry form: email service is not configured.');
    return { status: 'error' };
  }

  const rows = [
    ['Name', d.name],
    ['Email', d.email],
    ['Phone / WhatsApp', d.phone],
    ['Interested in', d.service],
    ['Trip', tripName],
    ['Travel date', d.date],
    ['People', d.people],
    ['Site language', d.locale],
  ].filter(([, v]) => v);

  const html = `
    <h2 style="font-family:sans-serif">New enquiry from khondlotours.co.za</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${esc(k)}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`).join('')}
    </table>
    <p style="font-family:sans-serif;white-space:pre-wrap;margin-top:16px">${esc(d.message)}</p>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'Khondlo Tours website <onboarding@resend.dev>',
      to: [process.env.ENQUIRY_TO || BUSINESS.email],
      replyTo: d.email,
      subject: `Website enquiry: ${d.service}${tripName ? ` — ${tripName}` : ''} (${d.name})`,
      html,
    });
    if (error) {
      console.error('Enquiry form: send failed', error.name);
      return { status: 'error' };
    }
    return { status: 'ok' };
  } catch (e) {
    console.error('Enquiry form: send threw', e?.name);
    return { status: 'error' };
  }
}
