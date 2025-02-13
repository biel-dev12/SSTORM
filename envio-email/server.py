from flask import Flask, request, jsonify
from flask_cors import CORS
import win32com.client
import pythoncom

app = Flask(__name__)
CORS(app)  # Permite requisições do React

def enviar_email_outlook(destinatario, copia, assunto):
    # Inicializa o COM, necessário para interação com o Outlook
    pythoncom.CoInitialize()

    # Inicializa o Outlook
    outlook = win32com.client.Dispatch("Outlook.Application")
    mensagem = outlook.CreateItem(0)  # Cria um novo e-mail

    # Obtém a assinatura padrão do Outlook (já inserida automaticamente)
    mensagem.Display()
    assinatura = mensagem.HTMLBody  

    # Define os detalhes do e-mail
    mensagem.To = destinatario
    mensagem.CC = copia
    mensagem.Subject = assunto

    # Corpo do e-mail com formatação HTML
    corpo_email = f"""
    <html>
    <p style="color: orange; font-size: 18px; font-weight: bold;">E-mail com assinatura! Tudo automatizado.</p>
    </html>
    """

    # Define o corpo do e-mail e mantém a assinatura padrão
    mensagem.HTMLBody = corpo_email + assinatura

    # Envia o e-mail
    mensagem.Send()

@app.route("/enviar-email", methods=["POST"])
def enviar_email():
    try:
        dados = request.json
        destinatario = dados.get("destinatario")
        copia = dados.get("copia")
        assunto = dados.get("assunto")

        if not destinatario or not assunto:
            return jsonify({"erro": "Campos obrigatórios faltando"}), 400

        enviar_email_outlook(destinatario, copia, assunto)
        return jsonify({"mensagem": "E-mail enviado com sucesso!"})

    except Exception as e:
        print(f"Erro ao enviar e-mail: {str(e)}")  # Exibe o erro no terminal
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
