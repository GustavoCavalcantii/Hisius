import { Op } from "sequelize";
import User from "../database/models/User";
import { UserRole } from "../enums/User/UserRole";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class UserRepository {
  async create(data: ICreateUserInput) {
    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  }

  async findByEmail(email: string) {
    return User.findOne({ where: { email, deletado: false } });
  }

  async findById(id: number) {
    return User.findOne({ where: { id, deletado: false } });
  }

  async findPaginated(params: {
    offset: number;
    limit: number;
    name?: string;
    role?: UserRole;
  }) {
    const { offset, limit, name, role } = params;
    const whereClause: any = {};

    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}`,
      };
    }

    if (role !== undefined) {
      whereClause.role = {
        [Op.eq]: role,
      };
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["data_criacao", "DESC"]],
    });

    return {
      users: rows,
      total: count,
    };
  }

  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) throw new BadRequestError("Usuário não encontrado.");
    user.deleted = true;
    await user.save();
    return user;
  }

  async updateRole(newRole: UserRole, userId: number) {
    const user = await this.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");
    user.role = newRole;
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
