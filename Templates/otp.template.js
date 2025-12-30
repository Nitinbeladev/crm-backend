export const otpTemplate = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>One-Time Password (OTP)</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
  <!-- Wrapper table (email-friendly) -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,0.08);">
          <!-- Header -->
          <tr>
            <td style="padding:24px 28px;background:linear-gradient(90deg,#2563eb,#7c3aed);color:#fff;">
              <h1 style="margin:0;font-size:20px;font-weight:600;">Your verification code</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 16px 0;color:#0f172a;font-size:15px;line-height:1.4;">Hi there,</p>
              <p style="margin:0 0 24px 0;color:#334155;font-size:14px;line-height:1.5;">Use the following One-Time Password (OTP) to complete your action. This code is valid for <strong>{{EXPIRE_MINUTES}} minutes</strong>. If you didn't request this, you can safely ignore this email.</p>

              <!-- OTP box -->
              <div style="display:flex;align-items:center;justify-content:center;margin:12px 0 24px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-radius:10px;border:1px dashed #e2e8f0;padding:18px 28px;background:#fbfdff;">
                  <tr>
                    <td align="center" style="font-size:28px;letter-spacing:4px;font-weight:700;color:#0b1220;">
                      {OTP}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Action button (web fallback) -->
              <p style="text-align:center;margin:0 0 22px 0;">
                <a href="{{VERIFY_URL}}" style="display:inline-block;padding:12px 22px;border-radius:8px;background:linear-gradient(90deg,#2563eb,#7c3aed);color:#fff;text-decoration:none;font-weight:600;">Verify now</a>
              </p>

              <p style="margin:0 0 8px 0;color:#475569;font-size:13px;">Or copy and paste the code into the app/website where requested.</p>

              <hr style="border:none;border-top:1px solid #eef2f7;margin:22px 0;"> 

              <p style="margin:0;color:#667085;font-size:13px;line-height:1.45;">If you're having trouble, contact our support: <a href="mailto:{{SUPPORT_EMAIL}}" style="color:#2563eb;text-decoration:none;">{{SUPPORT_EMAIL}}</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 20px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
              <div>Need help? Visit <a href="{{HELP_URL}}" style="color:#2563eb;text-decoration:none;">Help Center</a></div>
              <div style="margin-top:6px;">&copy; {{YEAR}} Your Company. All rights reserved.</div>
            </td>
          </tr>

        </table>

        <!-- Plain-text fallback (visible for clients that expand) -->
        <div style="max-width:600px;margin:14px auto 0;color:#94a3b8;font-size:12px;text-align:center;">
          <small>TIP: If the button doesn't work, copy the code <strong>{{OTP}}</strong> into the verification field on the website or app.</small>
        </div>

      </td>
    </tr>
  </table>

  <!-- Optional: simple web page preview (non-email use) -->
  <!--
  To use this as a standalone web page, uncomment the section below and style as needed.
  -->
  
  <!-- Standalone page preview (hidden in email clients) -->
  <div style="display:none;">
    <section style="max-width:480px;margin:28px auto;padding:20px;background:#fff;border-radius:10px;text-align:center;">
      <h2 style="margin:0 0 6px 0;font-size:18px;color:#0b1220;">Verify your account</h2>
      <p style="margin:8px 0 18px 0;color:#475569;">Enter the code below to continue</p>
      <div style="font-size:36px;font-weight:700;letter-spacing:6px;background:#f8fafc;padding:16px;border-radius:8px;display:inline-block;">{{OTP}}</div>
      <div style="margin-top:18px;"><small style="color:#94a3b8;">Code expires in {{EXPIRE_MINUTES}} minutes</small></div>
    </section>
  </div>

</body>
</html>
`