import { IsString } from "class-validator";

export class EnterQueueDto {
  @IsString({
    message: "O código do hospital deve ser um texto",
    groups: ["search"],
  })
  hospitalCode: string;
}
