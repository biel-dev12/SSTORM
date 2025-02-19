from flask import Flask, request, jsonify
from flask_cors import CORS
from email_service import enviar_email_outlook
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Diretório onde os modelos de e-mail estão armazenados por departamento
EMAIL_TEMPLATES_DIR = "email_templates"

# Função para carregar os modelos de e-mail por departamento
def carregar_modelos():
    modelos = {}
    
    if not os.path.exists(EMAIL_TEMPLATES_DIR):
        return modelos
    
    for departamento in os.listdir(EMAIL_TEMPLATES_DIR):
        departamento_path = os.path.join(EMAIL_TEMPLATES_DIR, departamento)
        if os.path.isdir(departamento_path):
            modelos[departamento] = {}
            for arquivo in os.listdir(departamento_path):
                if arquivo.endswith(".html"):
                    nome_modelo = os.path.splitext(arquivo)[0]
                    with open(os.path.join(departamento_path, arquivo), "r", encoding="utf-8") as f:
                        modelos[departamento][nome_modelo] = f.read()
    
    return modelos

# Carregar os modelos no dicionário global
EMAIL_MODELOS = carregar_modelos()

def definir_saudacao():
    hora_atual = datetime.now().hour
    if hora_atual < 12:
        return "Bom dia"
    elif hora_atual < 18:
        return "Boa tarde"
    else:
        return "Boa noite"

@app.route("/enviar-email", methods=["POST"])
def enviar_email():
    try:
        dados = request.json
        destinatario = dados.get("destinatario")
        copia = dados.get("copia", "").split(";") if dados.get("copia") else []
        assunto = dados.get("assunto")
        departamento = dados.get("departamento")
        modelo = dados.get("modelo")

        if not destinatario or not assunto or not departamento or not modelo:
            return jsonify({"erro": "Campos obrigatórios faltando"}), 400

        corpo_email = EMAIL_MODELOS.get(departamento, {}).get(modelo, "")
        
        if not corpo_email:
            return jsonify({"erro": "Modelo de e-mail não encontrado"}), 404

        corpo_email = corpo_email.replace("{saudacao}", definir_saudacao())

        enviar_email_outlook(destinatario, copia, assunto, corpo_email)

        return jsonify({"mensagem": "E-mail enviado com sucesso!"})

    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")
        return jsonify({"erro": str(e)}), 500

@app.route("/email-templates", methods=["GET"])
def listar_modelos_email():
    try:
        resposta = []
        for departamento, modelos in EMAIL_MODELOS.items():
            resposta.append({
                "departamento": departamento,
                "modelos": [
                    {"value": nome, "label": nome.replace("_", " ").title(), "assunto": f"Assunto - {nome}"}
                    for nome in modelos.keys()
                ]
            })
        return jsonify(resposta)
    except Exception as e:
        print(f"Erro ao carregar modelos de e-mail: {str(e)}")
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
