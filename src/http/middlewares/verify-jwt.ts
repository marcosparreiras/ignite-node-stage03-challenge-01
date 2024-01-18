import { FastifyReply, FastifyRequest } from "fastify";

async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    request.jwtVerify();
  } catch (_error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}

export default verifyJWT;
