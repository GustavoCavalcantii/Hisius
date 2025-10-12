import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";

export class QueueDto {
  /**
   * Página inicial da busca (0-based)
   */
  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro 'page' deve ser um número", groups: ["search"] }
  )
  @Min(0, {
    message: "O parâmetro 'page' não pode ser negativo",
    groups: ["search"],
  })
  page: number = 0;

  /**
   * Quantidade máxima de itens por página
   */
  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro 'limit' deve ser um número", groups: ["search"] }
  )
  @Min(1, {
    message: "O parâmetro 'limit' deve ser pelo menos 1",
    groups: ["search"],
  })
  limit: number = 10;

  /**
   * Classificação de risco do paciente (triagem Manchester)
   * Valores válidos: 'imediato', 'muito urgente', 'urgente', 'pouco urgente', 'não urgente'
   */
  @IsOptional({ groups: ["search"] })
  @IsEnum(ManchesterClassification, {
    message:
      "A classificação informada não é válida. Valores válidos: imediato, muito urgente, urgente, pouco urgente, não urgente",
    groups: ["next", "search"],
  })
  classification: ManchesterClassification;

  /**
   * Nome do paciente para ser buscado
   */
  @IsOptional({ groups: ["search"] })
  @IsString({
    message: "O filtro do nome deve ser um texto",
    groups: ["search"],
  })
  nameFilter: string;

  /**
   * Nome da sala para o paciente ir
   */
  @IsString({
    message: "A sala deve ser um texto",
    groups: ["next-patient"],
  })
  @IsNotEmpty({
    message: "A sala não pode ser vazia",
    groups: ["next-patient"],
  })
  room: string;
}
