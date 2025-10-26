import { UserRole } from "../../enums/User/UserRole";

export interface IUserQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  role: UserRole;
}
