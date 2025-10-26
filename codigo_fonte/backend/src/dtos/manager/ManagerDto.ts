import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ManagerDto {
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
   * Nome do paciente para ser buscado
   */
  @IsOptional({ groups: ["search"] })
  @IsString({
    message: "O filtro do nome deve ser um texto",
    groups: ["search"],
  })
  nameFilter: string;
}
