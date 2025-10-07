import Manager from "../database/models/Manager";
import { ICreateManagerInput } from "../interfaces/manager/ICreateManagerInput";

export class ManagerRepository {
  async create(data: ICreateManagerInput) {
    return Manager.create({
      userId: data.userId, 
      hospitalCode: data.hospitalCode
    });
  }

  async findById(id: number) {
    return Manager.findOne({ where: { id, deletado: false } });
  }

  async findByUserId(userId: number) {
    return Manager.findOne({ where: { userId, deletado: false } });
  }
}
