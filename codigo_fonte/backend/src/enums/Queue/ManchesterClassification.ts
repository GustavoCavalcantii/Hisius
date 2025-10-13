export enum ManchesterClassification {
  RED = "imediato", // Emergência – atendimento imediato
  ORANGE = "muito urgente", // Muito urgente – atendimento em até 10 min
  YELLOW = "urgente", // Urgente – atendimento em até 60 min
  GREEN = "pouco urgente", // Pouco urgente – atendimento em até 120 min
  BLUE = "não urgente", // Não urgente – atendimento em até 240 min
}
