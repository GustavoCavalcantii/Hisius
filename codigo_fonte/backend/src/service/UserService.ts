import bcrypt from "bcrypt";
import { ICreateUserInput } from "../interfaces/user/ICreateUser.js";
import User from "../database/models/User.js";

const SALT_ROUNDS = 10;

export const createUser = async (userInput: ICreateUserInput) => {
  const { name, email, password } = userInput;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ nome: name, email, senha: hashedPassword });
  return user;
};

export const updateUserPassword = async (
  userId: number,
  newPassword: string
) => {
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  user.senha = hashedPassword;
  await user.save();
  return user;
};

export const checkPassword = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;
  return await bcrypt.compare(password, user.senha);
};
