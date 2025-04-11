from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Senere kan du legge til:
# @app.route('/chat', methods=['POST']) ...
# @app.route('/send', methods=['POST']) ...

if __name__ == '__main__':
    app.run(debug=True)