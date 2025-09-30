import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { IModel } from "../../interfaces/IModel";

export const initializeModels = async (sequelize: Sequelize) => {
  const modelsPath = path.resolve(__dirname);
  const files = fs.readdirSync(modelsPath).filter((f) => f.endsWith(".ts"));

  const models: IModel[] = [];

  for (const file of files) {
    if (file === "index.ts") continue;

    const modulePath = path.join(modelsPath, file);
    const moduleUrl = pathToFileURL(modulePath).href;

    const { [path.basename(file, path.extname(file))]: ModelClass } =
      await import(moduleUrl);

    if (ModelClass && typeof ModelClass.initialize === "function") {
      models.push(ModelClass);
    }
  }

  models.forEach((model) => model.initialize(sequelize));
  models.forEach((model) => model.associate?.());
};
