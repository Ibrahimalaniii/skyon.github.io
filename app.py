from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    data = request.get_json()
    # Her kan du legge til behandling av data (f.eks. lagring eller e-postsending)
    print("Mottatt data:", data)
    return jsonify({"message": "Melding mottatt."}), 200

if __name__ == "__main__":
    app.run(debug=True)