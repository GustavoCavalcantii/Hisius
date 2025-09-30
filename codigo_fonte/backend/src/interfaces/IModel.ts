import { Sequelize } from "sequelize";

export interface IModel {
  initialize(sequelize: Sequelize): void;
  associate?(): void;
}