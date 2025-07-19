import type { BetterFetchError } from "better-auth/react";

const BETTER_AUTH_ERROR_MESSAGE = {
  USER_NOT_FOUND: "Usuário não encontrado.",
  FAILED_TO_CREATE_USER: "Não foi possível criar o usuário.",
  FAILED_TO_CREATE_SESSION: "Não foi possível iniciar a sessão.",
  FAILED_TO_UPDATE_USER: "Erro ao atualizar os dados do usuário.",
  FAILED_TO_GET_SESSION: "Erro ao recuperar a sessão.",
  INVALID_PASSWORD: "Senha inválida.",
  INVALID_EMAIL: "E-mail inválido.",
  INVALID_EMAIL_OR_PASSWORD: "E-mail ou senha incorretos.",
  SOCIAL_ACCOUNT_ALREADY_LINKED:
    "Essa conta social já está vinculada a outro usuário.",
  PROVIDER_NOT_FOUND: "Provedor de autenticação não encontrado.",
  INVALID_TOKEN: "Token inválido ou expirado.",
  ID_TOKEN_NOT_SUPPORTED: "O token de identificação não é suportado.",
  FAILED_TO_GET_USER_INFO: "Não foi possível obter as informações do usuário.",
  USER_EMAIL_NOT_FOUND: "E-mail do usuário não encontrado.",
  EMAIL_NOT_VERIFIED: "O e-mail ainda não foi verificado.",
  PASSWORD_TOO_SHORT: "A senha é muito curta.",
  PASSWORD_TOO_LONG: "A senha é muito longa.",
  USER_ALREADY_EXISTS: "Usuário já cadastrado.",
  EMAIL_CAN_NOT_BE_UPDATED: "Este e-mail não pode ser alterado.",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Conta com essas credenciais não encontrada.",
  SESSION_EXPIRED: "Sessão expirada. Faça login novamente.",
  FAILED_TO_UNLINK_LAST_ACCOUNT:
    "Não é possível desvincular a última conta conectada.",
  ACCOUNT_NOT_FOUND: "Conta não encontrada.",
  USER_ALREADY_HAS_PASSWORD: "O usuário já possui uma senha cadastrada.",
};

export const betterAuthErrorMessage = (
  error: BetterFetchError & Record<string, string>
) => {
  const key = (error.code as keyof typeof BETTER_AUTH_ERROR_MESSAGE) || "";

  return key ? BETTER_AUTH_ERROR_MESSAGE[key] : "Aconteceu um erro.";
};
