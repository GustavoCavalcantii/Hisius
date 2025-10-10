import nodemailer, { Transporter } from "nodemailer";
import Logger from "../config/Logger";

let transporter: Transporter | null = null;
let fromAddress: string;

export const initSMTP = async (CONFIG: any): Promise<Transporter> => {
  if (transporter) return transporter;

  const { host, port, user, pass, secure, from } = CONFIG.smtp;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: true
  });

  try {
    await transporter.verify();
    Logger.info("Conexão com SMTP realizada com sucesso!");
    fromAddress = from;
  } catch (error) {
    Logger.error("Erro ao conectar ao SMTP:", error);
    throw error;
  }

  return transporter;
};

export const getTransporter = (): {
  transporter: Transporter;
  from: string;
} => {
  if (!transporter || !fromAddress)
    throw new Error("SMTP não configurado. Chame initSMTP primeiro.");
  return { transporter, from: fromAddress };
};
