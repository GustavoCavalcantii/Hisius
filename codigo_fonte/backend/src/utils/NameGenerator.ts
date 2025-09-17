import figlet from "figlet";

export function generateASCII(appName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!appName || typeof appName !== "string") {
      reject("Nome da aplicação não é válido");
      return;
    }

    figlet.text(appName, (err, data) => {
      if (err || !data) {
        reject("Erro ao gerar arte ASCII");
        return;
      }
      resolve(data);
    });
  });
}
