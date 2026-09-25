export { AUTH_API_URL } from "@/lib/auth/config";
export { API_URL } from "@/lib/api/config";
export {
  login,
  register,
  logout,
  fetchCurrentUser,
  AuthRequestError,
} from "@/lib/auth/api";
export { readSession, readUser, clearSession, safeNextPath } from "@/lib/auth/session";
export {
  validateLogin,
  validateRegister,
  hasFieldErrors,
  isValidEmail,
  mapLaravelFieldErrors,
} from "@/lib/auth/validation";
export type {
  AuthUser,
  AuthSession,
  LoginCredentials,
  RegisterPayload,
  FieldErrors,
} from "@/lib/auth/types";
