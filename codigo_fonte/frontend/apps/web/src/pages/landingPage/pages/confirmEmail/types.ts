export interface ResetPasswordFormData {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export type ResetPasswordStep = "EMAIL_INPUT" | "EMAIL_SENT" | "PASSWORD_RESET";

export interface FormErrors {
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}
