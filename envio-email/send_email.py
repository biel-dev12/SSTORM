import win32com.client

def enviar_email_outlook(destinatario, copia, assunto):
    # Inicializa o Outlook
    outlook = win32com.client.Dispatch("Outlook.Application")
    mensagem = outlook.CreateItem(0)  # Cria um novo e-mail

    # Define um corpo temporário para carregar a assinatura
    mensagem.Display()  # Abre o e-mail primeiro para que o Outlook insira a assinatura
    assinatura = mensagem.HTMLBody  # Agora captura a assinatura padrão

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

    mensagem.Send()  # Exibe novamente com o conteúdo correto


# Exemplo de uso
enviar_email_outlook(
    destinatario="gabrielabreu@doctorspraiagrande.com.br",
    copia="gabrielsantos@doctorspraiagrande.com.br",
    assunto="Teste de e-mail com assinatura"
)
