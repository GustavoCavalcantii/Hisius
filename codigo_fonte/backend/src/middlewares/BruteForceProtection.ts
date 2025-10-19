import { Request, Response, NextFunction } from "express";
import { TooManyRequest } from "../utils/Errors/TooManyRequest";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { BruteForceProtectionRepository } from "../repositories/BruteForceProtectionRepository";

const bruteRepo = new BruteForceProtectionRepository();

export default async function BruteForceProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const dto = plainToInstance(UserDTO, req.body);
  const username = dto.email;
  if (!username) return next();

  try {
    const rate = await bruteRepo.getAttempts(username);
    if (rate && rate.consumedPoints >= bruteRepo.maxAttempts) {
      const retrySecs = Math.round(rate.msBeforeNext / 1000) || 60;
      throw new TooManyRequest(
        `Conta temporariamente bloqueada. Tente novamente em ${retrySecs} segundos.`
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}
