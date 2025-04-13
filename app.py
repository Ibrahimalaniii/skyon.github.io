from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# Konfigurer Flask-Mail (endre til dine opplysninger)
app.config["MAIL_SERVER"] = "smtp.example.com"         # f.eks. smtp.gmail.com
app.config["MAIL_PORT"] = 587                           # for TLS
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "your_username@example.com"
app.config["MAIL_PASSWORD"] = "your_password"
app.config["MAIL_DEFAULT_SENDER"] = "contact@skyonai.com"

mail = Mail(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/priser")
def priser():
    return render_template("priser.html")

@app.route("/om-oss")
def om_oss():
    return render_template("om_oss.html")

@app.route("/send", methods=["POST"])
def send():
    data = request.get_json()
    sender_name = data.get("navn")
    sender_email = data.get("epost")
    message_content = data.get("melding")

    subject = "Kontaktmelding fra SkyonAI nettside"
    body = f"Navn: {sender_name}\nE-post: {sender_email}\n\nMelding:\n{message_content}"

    msg = Message(subject, recipients=["contact@skyonai.com"], body=body)
    try:
        mail.send(msg)
        return jsonify({"message": "Melding sendt."}), 200
    except Exception as e:
        print("Feil ved sending av e-post:", e)
        return jsonify({"message": "Noe gikk galt, prøv igjen senere."}), 500

if __name__ == "__main__":
    app.run(debug=True)