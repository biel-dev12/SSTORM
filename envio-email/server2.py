from flask import Flask, request, jsonify
from flask_cors import CORS
from email_service import enviar_email_outlook
import os

app = Flask(__name__)
CORS(app)

EMAIL_TEMPLATES_DIR = "email_templates"

def carregar_modelos():
    modelos = {}
    if not os.path.exists(EMAIL_TEMPLATES_DIR):
        return modelos

    for dept in os.listdir(EMAIL_TEMPLATES_DIR):
        dept_path = os.path.join(EMAIL_TEMPLATES_DIR, dept)
        if os.path.isdir(dept_path):
            modelos[dept] = []
            for arquivo in os.listdir(dept_path):
                if arquivo.endswith(".html"):
                    nome_modelo = os.path.splitext(arquivo)[0]
                    modelos[dept].append(nome_modelo)
    return modelos

EMAIL_MODELOS = carregar_modelos()

@app.route("/email-templates", methods=["GET"])
def listar_modelos_email():
    try:
        return jsonify(EMAIL_MODELOS)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route("/enviar-email", methods=["POST"])
def enviar_email():
    dados = request.json
    try:
        enviar_email_outlook(
            destinatario=dados["destinatario"],
            copia=dados["copia"].split(";") if dados["copia"] else [],
            assunto=dados["assunto"],
            corpo_email=f"<p>Enviando o modelo: {dados['modelo']} ({dados['codigoEnvio']})</p>",
        )
        return jsonify({"mensagem": "E-mail enviado com sucesso!"})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
