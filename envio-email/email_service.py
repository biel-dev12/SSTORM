import win32com.client
import pythoncom

def enviar_email_outlook(destinatario, copia, assunto, corpo_email):
    pythoncom.CoInitialize()
    outlook = win32com.client.Dispatch("Outlook.Application")
    mensagem = outlook.CreateItem(0)

    mensagem.Display()  # Exibir para capturar a assinatura padrão
    assinatura = mensagem.HTMLBody  # Captura a assinatura padrão do Outlook

    mensagem.To = destinatario
    mensagem.CC = ";".join(copia) if copia else ""  # Permitir múltiplos e-mails em cópia
    mensagem.Subject = assunto
    mensagem.HTMLBody = corpo_email + assinatura  # Mantém a assinatura padrão
    mensagem.Send()
