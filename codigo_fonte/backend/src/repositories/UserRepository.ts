import User from "../database/models/User.js";
import { ICreateUserInput } from "../interfaces/user/ICreateUser.js";

export class UserRepository {
  async create(data: ICreateUserInput) {
    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async findById(id: number) {
    return User.findByPk(id);
  }

  async updatePassword(id: number, hashedPassword: string) {
    const user = await this.findById(id);
    if (!user) throw new Error("User not found");
    user.password = hashedPassword;
    await user.save();
    return user;
  }
}
