import win32com.client
import pythoncom

def enviar_email_outlook(destinatario, copia, assunto, corpo_email):
    try:
        pythoncom.CoInitialize()  # Inicializa o COM
        # Cria o objeto do Outlook
        outlook = win32com.client.Dispatch("Outlook.Application")
        
        # Cria o item de e-mail
        mensagem = outlook.CreateItem(0)
        
        # Exibe o e-mail para capturar a assinatura padrão
        mensagem.Display()
        assinatura = mensagem.HTMLBody  # Captura a assinatura padrão do Outlook

        # Define os campos do e-mail
        mensagem.To = destinatario
        mensagem.CC = ";".join(copia) if copia else ""  # Permite múltiplos e-mails em cópia
        mensagem.Subject = assunto
        mensagem.HTMLBody = corpo_email + assinatura  # Mantém a assinatura padrão

        # Caminhos dos anexos
        attachment1 = r"U:\Depto Técnico\00. Modelos\09. Emails\qrcode_google.jpg"
        attachment2 = r"U:\Depto Técnico\01. Empresas\Z. Empresas de Fevereiro de 2025\Z. Mensagens Padrão\Informe Técnico.pdf"
        attachment3 = r"U:\Depto Técnico\01. Empresas\Z. Empresas de Fevereiro de 2025\Z. Mensagens Padrão\Modelo de Ficha de EPI - Equipamento de Proteção Individual.docx"
        attachment4 = r"U:\Depto Técnico\01. Empresas\Z. Empresas de Fevereiro de 2025\Z. Mensagens Padrão\Modelo de OS - Ordem de Serviço de Saúde e Segurança.docx"

        # Adicionar anexos
        mensagem.Attachments.Add(attachment1)
        mensagem.Attachments.Add(attachment2)
        mensagem.Attachments.Add(attachment3)
        mensagem.Attachments.Add(attachment4)

        # Envia o e-mail
        mensagem.Send()

    except Exception as e:
        print(f"Erro ao enviar o e-mail: {e}")