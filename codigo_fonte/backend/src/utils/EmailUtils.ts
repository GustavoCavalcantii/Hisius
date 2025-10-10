import { getTransporter } from "../config/Smtp";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import Logger from "../config/Logger";

export class EmailUtils {
  private compileTemplate(fileName: string, variables: Record<string, any>) {
    const filePath = path.join(__dirname, "../emails/templates", fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const template = Handlebars.compile(content);
    return template(variables);
  }

  private compileWithBase(
    contentTemplateName: string,
    variables: Record<string, any>
  ) {
    const body = this.compileTemplate(contentTemplateName, variables);
    return this.compileTemplate("base.html", { body });
  }

  private compileTextWithBase(
    contentTemplateName: string,
    variables: Record<string, any>
  ) {
    const body = this.compileTemplate(contentTemplateName, variables);
    return this.compileTemplate("base.txt", { body });
  }

  public async sendResetEmail(to: string, userName: string, resetLink: string) {
    const { transporter, from } = getTransporter();

    const html = this.compileWithBase("reset-email.html", {
      userName,
      resetLink,
    });
    const text = this.compileTextWithBase("reset-email.txt", {
      userName,
      resetLink,
    });

    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject: "Redefinição do email",
        html,
        text,
      });
      Logger.info(`E-mail enviado para ${to} com sucesso!`);
      return info;
    } catch (error) {
      Logger.error("Erro ao enviar e-mail:", error);
      throw error;
    }
  }

  public async sendResetPass(to: string, userName: string, resetLink: string) {
    const { transporter, from } = getTransporter();

    const html = this.compileWithBase("reset-password.html", {
      userName,
      resetLink,
    });
    const text = this.compileTextWithBase("reset-password.txt", {
      userName,
      resetLink,
    });

    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject: "Redefinição de senha",
        html,
        text,
      });
      Logger.info(`E-mail enviado para ${to} com sucesso!`);
      return info;
    } catch (error) {
      Logger.error("Erro ao enviar e-mail:", error);
      throw error;
    }
  }
}
