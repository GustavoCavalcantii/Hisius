import { EstatisticaFila } from "../database/models";
import { Op } from "sequelize";
import { subDays, startOfDay, endOfDay } from 'date-fns';

export class ReportService {
  async getDashboardData(filters: { periodo?: 'semanal' | 'mensal' | 'diario', data?: string }) {
    
    let dataInicio: Date;
    let dataFim: Date = new Date();

    if (filters.data) {
     
      const dataEspecifica = new Date(filters.data + 'T00:00:00'); 
      
      dataInicio = startOfDay(dataEspecifica);
      dataFim = endOfDay(dataEspecifica);
    } else {
     
      if (filters.periodo === 'diario') {
        dataInicio = subDays(dataFim, 1);
      } else if (filters.periodo === 'mensal') {
        dataInicio = subDays(dataFim, 30);
      } else {
        dataInicio = subDays(dataFim, 7);
      }
    }

    const estatisticas = await EstatisticaFila.findAll({
      where: {
        data: { [Op.between]: [dataInicio, dataFim] }
      },
      order: [['data', 'ASC']]
    });

    const triagemStats = estatisticas.filter(s => s.fila === 'triagem');
    const atendimentoStats = estatisticas.filter(s => s.fila === 'atendimento');

    const tempoMedioGeral = (filaStats: EstatisticaFila[]) => {
      if (filaStats.length === 0) return 0;
      const soma = filaStats.reduce((acc, cur) => acc + cur.tempo_medio_espera_minutos, 0);
      return Math.round(soma / filaStats.length);
    };

    const picoDemandaSemanal = [0, 0, 0, 0, 0, 0, 0];
    estatisticas.forEach(stat => {
        const diaDaSemana = new Date(stat.data + 'T00:00:00').getUTCDay();
        picoDemandaSemanal[diaDaSemana] += stat.total_atendidos;
    });

    return {
      tempoMedioEsperaAtendimento: tempoMedioGeral(atendimentoStats),
      tempoMedioEsperaTriagem: tempoMedioGeral(triagemStats),
      picoDeDemanda: picoDemandaSemanal
    };
  }
}