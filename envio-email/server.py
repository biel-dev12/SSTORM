from flask import Flask, request, jsonify
from flask_cors import CORS
from email_service import enviar_email_outlook

app = Flask(__name__)
CORS(app)

# Modelos de e-mail disponíveis
EMAIL_MODELOS = {
    "padrao": "<p style='color: orange; font-size: 18px; font-weight: bold;'>E-mail com assinatura! Tudo automatizado.</p>",
    "boas_vindas": "<p>Bem-vindo(a) ao nosso serviço! Estamos felizes em tê-lo(a) conosco.</p>",
    "aviso": "<p>Atenção! Há uma atualização importante que requer sua ação.</p>"
}

@app.route("/enviar-email", methods=["POST"])
def enviar_email():
    try:
        dados = request.json
        destinatario = dados.get("destinatario")
        copia = dados.get("copia", "").split(";") if dados.get("copia") else []
        assunto = dados.get("assunto")
        modelo = dados.get("modelo", "padrao")  # Se não escolher, usa o modelo padrão

        if not destinatario or not assunto:
            return jsonify({"erro": "Campos obrigatórios faltando"}), 400

        corpo_email = EMAIL_MODELOS.get(modelo, EMAIL_MODELOS["padrao"])
        enviar_email_outlook(destinatario, copia, assunto, corpo_email)

        return jsonify({"mensagem": "E-mail enviado com sucesso!"})

    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)