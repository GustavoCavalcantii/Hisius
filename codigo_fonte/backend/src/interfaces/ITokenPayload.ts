import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayload extends JwtPayload {
  id: number;
  role: number;
}