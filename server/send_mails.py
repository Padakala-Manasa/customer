import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email credentials
sender_email = "padakala.manasa2005@gmail.com"
password = "gags jezn vkhd accp"

# Subject and body of the email
subject = "Your Promotional Email Subject"
body = """Hello,


This is your promotional email content  visit our website on https://customer-pl.vercel.app/.

Best regards,
Your Company"""

# Read recipients from file
with open("emails.txt") as f:
    recipients = f.read().splitlines()

# Send email to each recipient
for recipient in recipients:
    # Set up the MIME
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the server and send email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Secure the connection
            server.login(sender_email, password)
            server.sendmail(sender_email, recipient, msg.as_string())
        print(f"Email sent to {recipient}")
    except Exception as e:
        print(f"Failed to send email to {recipient}: {e}")
