from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# Konfigurer SMTP-innstillinger for Flask-Mail
app.config["MAIL_SERVER"] = "smtp.example.com"         # For eksempel: smtp.gmail.com
app.config["MAIL_PORT"] = 587                           # Port for TLS, endre hvis nødvendig
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "your_username@example.com"   # Din e-post
app.config["MAIL_PASSWORD"] = "your_password"               # Passord for din e-postkonto
app.config["MAIL_DEFAULT_SENDER"] = "contact@skyonai.com"     # Sender-adressen

mail = Mail(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    # Hent data fra kontaktskjemaet (forvent JSON-data)
    data = request.get_json()
    sender_name = data.get("navn")
    sender_email = data.get("epost")
    message_content = data.get("melding")
    
    # Utform e-post-meldingen
    subject = "Kontaktmelding fra SkyonAI nettside"
    body = (
        f"Navn: {sender_name}\n"
        f"E-post: {sender_email}\n\n"
        f"Melding:\n{message_content}"
    )
    
    msg = Message(subject, recipients=["contact@skyonai.com"], body=body)
    
    try:
        mail.send(msg)
        return jsonify({"message": "Melding sendt."}), 200
    except Exception as e:
        print("Feil ved sending av e-post:", e)
        return jsonify({"message": "Noe gikk galt, prøv igjen senere."}), 500

if __name__ == "__main__":
    app.run(debug=True)