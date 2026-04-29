import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const MY_EMAIL = process.env.CONTACT_EMAIL ?? "jaimenguyen168@gmail.com";

// ─── Admin email ──────────────────────────────────────────────────────────────

function adminEmailHtml(name: string, email: string, message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New message from ${name}</title>
</head>
<body style="margin:0;padding:0;background:#060c22;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table style="width:100%;border-collapse:collapse;background:#060c22;">
    <tr>
      <td style="padding:48px 24px;">
        <table style="width:100%;max-width:560px;border-collapse:collapse;margin:0 auto;">

          <!-- Logo row -->
          <tr>
            <td style="padding-bottom:32px;">
              <table style="border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:16px;font-weight:700;">&lt;/&gt;</span>
                  </td>
                  <td style="padding-left:10px;color:#ffffff;font-size:15px;font-weight:700;vertical-align:middle;">Jaime Dev</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#0b1230;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">

              <!-- Header banner -->
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);padding:28px 36px;">
                    <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.65);font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:500;">Portfolio Contact</p>
                    <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">You have a new message</p>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:32px 36px;">

                    <!-- Sender block -->
                    <p style="margin:0 0 10px 0;color:#818cf8;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;">Sender</p>
                    <table style="width:100%;border-collapse:collapse;background:#060c22;border-radius:12px;margin-bottom:28px;">
                      <tr>
                        <td style="padding:18px 22px;">
                          <table style="border-collapse:collapse;">
                            <tr>
                              <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);border-radius:50%;width:40px;height:40px;text-align:center;vertical-align:middle;">
                                <span style="color:#ffffff;font-size:16px;font-weight:700;">${name.charAt(0).toUpperCase()}</span>
                              </td>
                              <td style="padding-left:14px;vertical-align:middle;">
                                <p style="margin:0 0 2px 0;color:#ffffff;font-size:15px;font-weight:600;">${name}</p>
                                <p style="margin:0;color:#8892a4;font-size:13px;">${email}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Message block -->
                    <p style="margin:0 0 10px 0;color:#818cf8;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;">Message</p>
                    <table style="width:100%;border-collapse:collapse;background:#060c22;border-radius:12px;margin-bottom:28px;">
                      <tr>
                        <td style="padding:20px 22px;">
                          <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.8;">${message.replace(/\n/g, "<br>")}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                      <tr>
                        <td style="border-top:1px solid rgba(255,255,255,0.07);font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- Reply CTA -->
                    <table style="border-collapse:collapse;">
                      <tr>
                        <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);border-radius:10px;padding:13px 28px;">
                          <a href="mailto:${email}?subject=Re: Your message" style="color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.2px;">Reply to ${name} &rarr;</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;text-align:center;">
              <p style="margin:0;color:#3d4a6b;font-size:12px;line-height:1.6;">
                This notification was sent to you because someone submitted the contact form on your portfolio.<br>
                &copy; 2025 Jaime Dev. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Confirmation email ───────────────────────────────────────────────────────

function confirmationEmailHtml(name: string, message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Got your message!</title>
</head>
<body style="margin:0;padding:0;background:#060c22;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <table style="width:100%;border-collapse:collapse;background:#060c22;">
    <tr>
      <td style="padding:48px 24px;">
        <table style="width:100%;max-width:560px;border-collapse:collapse;margin:0 auto;">

          <!-- Logo row -->
          <tr>
            <td style="padding-bottom:32px;">
              <table style="border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:16px;font-weight:700;">&lt;/&gt;</span>
                  </td>
                  <td style="padding-left:10px;color:#ffffff;font-size:15px;font-weight:700;vertical-align:middle;">Jaime Dev</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#0b1230;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">

              <!-- Header banner -->
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);padding:36px;text-align:center;">
                    <p style="margin:0 0 8px 0;color:rgba(255,255,255,0.65);font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:500;">Message received</p>
                    <p style="margin:0 0 4px 0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">Thanks, ${name}!</p>
                    <p style="margin:0;color:rgba(255,255,255,0.75);font-size:14px;">I'll be in touch soon.</p>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:32px 36px;">

                    <p style="margin:0 0 28px 0;color:#94a3b8;font-size:15px;line-height:1.8;">
                      Hey ${name}, thanks for reaching out! I've received your message and will get back to you within <strong style="color:#ffffff;">24–48 hours</strong>.
                    </p>

                    <!-- Message recap -->
                    <p style="margin:0 0 10px 0;color:#818cf8;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;">Your message</p>
                    <table style="width:100%;border-collapse:collapse;background:#060c22;border-radius:12px;margin-bottom:28px;">
                      <tr>
                        <td style="padding:20px 22px;">
                          <p style="margin:0;color:#8892a4;font-size:14px;line-height:1.8;font-style:italic;">&ldquo;${message.replace(/\n/g, "<br>")}&rdquo;</p>
                        </td>
                      </tr>
                    </table>

                    <!-- What to expect -->
                    <table style="width:100%;border-collapse:collapse;background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.18);border-radius:12px;margin-bottom:28px;">
                      <tr>
                        <td style="padding:20px 22px;">
                          <p style="margin:0 0 12px 0;color:#818cf8;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;">What to expect</p>
                          <table style="border-collapse:collapse;margin-bottom:8px;">
                            <tr>
                              <td style="color:#6d28d9;font-size:14px;padding-right:10px;vertical-align:top;">&#10003;</td>
                              <td style="color:#94a3b8;font-size:14px;line-height:1.6;">I'll review your message personally</td>
                            </tr>
                          </table>
                          <table style="border-collapse:collapse;margin-bottom:8px;">
                            <tr>
                              <td style="color:#6d28d9;font-size:14px;padding-right:10px;vertical-align:top;">&#10003;</td>
                              <td style="color:#94a3b8;font-size:14px;line-height:1.6;">You'll hear back within 24–48 hours</td>
                            </tr>
                          </table>
                          <table style="border-collapse:collapse;">
                            <tr>
                              <td style="color:#6d28d9;font-size:14px;padding-right:10px;vertical-align:top;">&#10003;</td>
                              <td style="color:#94a3b8;font-size:14px;line-height:1.6;">Reply will come from <span style="color:#ffffff;">jaimenguyen168@gmail.com</span></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                      <tr>
                        <td style="border-top:1px solid rgba(255,255,255,0.07);font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table style="border-collapse:collapse;">
                      <tr>
                        <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);border-radius:10px;padding:13px 28px;">
                          <a href="https://jaimenguyen.com" style="color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.2px;">View my portfolio &rarr;</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;text-align:center;">
              <p style="margin:0;color:#3d4a6b;font-size:12px;line-height:1.6;">
                You received this email because you submitted a contact form on jaimenguyen.com.<br>
                &copy; 2025 Jaime Dev &nbsp;&middot;&nbsp; Ship fast. Build well.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [adminResult, confirmResult] = await Promise.all([
      resend.emails.send({
        from: "Jaime Dev Portfolio <noreply@jaimenguyen.com>",
        to: [MY_EMAIL],
        replyTo: email,
        subject: `New message from ${name}`,
        html: adminEmailHtml(name, email, message),
      }),
      resend.emails.send({
        from: "Jaime Dev <hello@jaimenguyen.com>",
        to: [email],
        subject: `Thank you for reaching out, ${name}`,
        html: confirmationEmailHtml(name, message),
      }),
    ]);

    if (adminResult.error || confirmResult.error) {
      console.error("Resend errors:", { admin: adminResult.error, confirm: confirmResult.error });
      return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
