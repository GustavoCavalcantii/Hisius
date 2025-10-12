import User from "../database/models/User";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class UserRepository {
  async create(data: ICreateUserInput) {
    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async findByEmail(email: string) {
    return User.findOne({ where: { email, deletado: false } });
  }

  async findById(id: number) {
    return User.findOne({ where: { id, deletado: false } });
  }

  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) throw new BadRequestError("Usuário não encontrado.");
    user.deleted = true;
    await user.save();
    return user;
  }

  async updatePassword(id: number, hashedPassword: string) {
    const user = await this.findById(id);
    if (!user) throw new BadRequestError("Usuário não encontrado.");
    user.password = hashedPassword;
    await user.save();
    return user;
  }

  async updateEmail(id: number, email: string) {
    const user = await this.findById(id);
    if (!user) throw new BadRequestError("Usuário não encontrado.");
    user.email = email;
    await user.save();
    return user;
  }
}
