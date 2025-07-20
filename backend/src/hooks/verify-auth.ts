import type { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "../lib/auth.ts";
import { fromNodeHeaders } from "better-auth/node";

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });
    if (!session) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: "Não autenticado" });
    }

    request.user = session.user;
  } catch (err) {
    request.log.error(err, "Erro ao obter sessão");
    return reply
      .code(401)
      .send({ statusCode: 401, message: "Sessão inválida" });
  }
}
