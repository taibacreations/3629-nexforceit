import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// User input ko HTML mein daalne se pehle escape karna zaroori hai (security)
const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const label = (text: string) => `
  <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7b8b99;margin-bottom:5px;">
    ${text}
  </div>`;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, company, message, consent } = body;

    // subject ab required nahi hai
    if (!firstName || !lastName || !email || !consent) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone) || "-";
    const safeCompany = escapeHtml(company) || "-";
    const safeMessage = escapeHtml(message) || "-";

    // Fixed subject (header injection se bachne ke liye newlines hata diye)
    const fullName = `${firstName} ${lastName}`.replace(/[\r\n]+/g, " ").trim();
    const mailSubject = `Neue Kontaktanfrage von ${fullName}`;
    const replySubject = encodeURIComponent(`Re: ${mailSubject}`);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: mailSubject,
      html: `
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nieuwe contactaanvraag</title>
    <style>
      .reply-button:hover {
        background-color: #0cc1fa !important;
        border-color: #012549 !important;
        color: #012549 !important;
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f7fa;font-family:Arial,Helvetica,sans-serif;color:#012549;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fa;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"
            style="max-width:680px;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(1,37,73,0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:#012549;padding:32px 36px;">
                <div style="font-size:24px;font-weight:700;letter-spacing:1px;color:#ffffff;">
                  NEXFORCE<span style="color:#0cc1fa;">IT</span>
                </div>
                <div style="margin-top:8px;font-size:13px;color:#b8d4e8;">
                  Nieuwe contactaanvraag
                </div>
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding:36px 36px 20px;">
                <h1 style="margin:0 0 10px;font-size:26px;line-height:1.3;color:#012549;">
                  Nieuwe aanvraag ontvangen
                </h1>
                <p style="margin:0;font-size:15px;line-height:1.7;color:#607080;">
                  Er is een nieuw bericht verstuurd via het contactformulier op de website.
                </p>
              </td>
            </tr>

            <!-- Contact details -->
            <tr>
              <td style="padding:10px 36px 24px;">
                <div style="background-color:#f5f9fc;border-radius:12px;padding:24px;border-left:4px solid #0cc1fa;">

                  <div style="margin-bottom:18px;">
                    ${label("Naam")}
                    <div style="font-size:16px;font-weight:600;color:#012549;">
                      ${safeFirstName} ${safeLastName}
                    </div>
                  </div>

                  <div style="margin-bottom:18px;">
                    ${label("E-mail")}
                    <div style="font-size:15px;">
                      <a href="mailto:${safeEmail}" style="color:#0cc1fa;text-decoration:none;">
                        ${safeEmail}
                      </a>
                    </div>
                  </div>

                  <div style="margin-bottom:18px;">
                    ${label("Telefoon")}
                    <div style="font-size:15px;color:#012549;">${safePhone}</div>
                  </div>

                  <div>
                    ${label("Bedrijf")}
                    <div style="font-size:15px;color:#012549;">${safeCompany}</div>
                  </div>

                </div>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:0 36px 36px;">
                ${label("Bericht")}
                <div style="background-color:#ffffff;border:1px solid #e3eaf0;border-radius:12px;padding:20px;font-size:15px;line-height:1.7;color:#34495e;white-space:pre-line;">
                  ${safeMessage}
                </div>
              </td>
            </tr>

            <!-- Reply Button -->
            <tr>
              <td style="padding:0 36px 36px;text-align:center;">
                <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                  <tr>
                    <td align="center" bgcolor="#012549" style="border-radius:10px;background-color:#012549;">
                      <a href="mailto:${safeEmail}?subject=${replySubject}"
                        target="_blank"
                        class="reply-button"
                        style="display:inline-block;padding:14px 34px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;letter-spacing:0.3px;color:#ffffff;text-decoration:none;border-radius:10px;border:1px solid #0cc1fa;">
                        Auf Nachricht antworten
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#012549;padding:24px 36px;text-align:center;">
                <div style="font-size:12px;line-height:1.6;color:#9db5c8;">
                  Dit bericht is verzonden via het contactformulier van NEXFORCEIT.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}