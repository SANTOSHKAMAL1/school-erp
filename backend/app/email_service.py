"""Email sending service for Arundhati Gurukulam."""
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

from . import config

logger = logging.getLogger(__name__)


def send_otp_email(to_email: str, recipient_name: str, otp: str, expires_minutes: int = 10) -> bool:
    """Send a password reset OTP email using configured SMTP settings."""
    host = config.SMTP_HOST
    port = config.SMTP_PORT
    user = config.SMTP_USER
    # Remove any internal spaces from app passwords like "abcd efgh ijkl mnop"
    password = config.SMTP_PASSWORD.replace(" ", "") if config.SMTP_PASSWORD else ""
    from_email = config.SMTP_FROM or user
    from_name = config.SMTP_FROM_NAME or "Arundhati Gurukulam"

    subject = f"{otp} is your Arundhati Gurukulam Password Reset OTP"

    text_body = f"""Namaste {recipient_name or 'User'},

You requested to reset your password for Arundhati Gurukulam.

Your One-Time Password (OTP) is:
{otp}

This OTP is valid for {expires_minutes} minutes. Please do not share this OTP with anyone.

If you did not request this password reset, please ignore this email or contact the school office.

Warm regards,
Arundhati Gurukulam
"""

    html_body = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 24px 16px; background-color: #f7f3ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2d261e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e7ded2; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <tr>
      <td style="background-color: #581816; padding: 28px 24px; text-align: center;">
        <h1 style="margin: 0; color: #fbf5ee; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">Arundhati Gurukulam</h1>
        <p style="margin: 6px 0 0 0; color: #e6b896; font-size: 13px; letter-spacing: 0.8px; text-transform: uppercase;">Password Reset Request</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 28px;">
        <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5;">Namaste <strong>{recipient_name or 'User'}</strong>,</p>
        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #55483b;">
          We received a request to reset your password. Use the verification code below to complete the reset process:
        </p>

        <div style="background-color: #fff9f0; border: 2px dashed #d17834; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <span style="display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #9c4b14; margin-bottom: 6px;">Your One-Time Password</span>
          <span style="display: inline-block; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #581816;">{otp}</span>
        </div>

        <p style="margin: 0 0 16px; font-size: 14px; color: #6e5e4d; line-height: 1.5;">
          ⏱️ This OTP will expire in <strong>{expires_minutes} minutes</strong>.
        </p>
        <p style="margin: 0 0 24px; font-size: 13px; color: #9e8e7c; line-height: 1.5;">
          If you did not make this request, you can safely ignore this email. Your account remains secure.
        </p>

        <hr style="border: 0; border-top: 1px solid #ede5d8; margin: 24px 0;">

        <p style="margin: 0; font-size: 12px; color: #9e8e7c; text-align: center; line-height: 1.5;">
          Arundhati Gurukulam · Bengaluru<br>
          For assistance, contact the school office at support@arundhatigurukulam.com
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = formataddr((from_name, from_email))
    msg["To"] = to_email

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        if port == 465:
            server = smtplib.SMTP_SSL(host, port, timeout=15)
        else:
            server = smtplib.SMTP(host, port, timeout=15)
            if config.SMTP_TLS:
                server.starttls()

        if user and password:
            server.login(user, password)

        server.sendmail(from_email, [to_email], msg.as_string())
        server.quit()
        logger.info("Sent OTP email successfully to %s", to_email)
        return True
    except Exception as e:
        logger.error("Failed to send email to %s: %s", to_email, e)
        raise RuntimeError(f"Could not send email: {e}")
