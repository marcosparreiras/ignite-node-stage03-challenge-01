import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import makeCreateOrgUseCase from "../../application/use-cases/factories/make-create-org-use-case";
import EmailAlreadyInUseError from "../../application/errors/email-alreay-in-use-error";
import makeAuthenticateOrgUseCase from "../../application/use-cases/factories/make-authenticate-org-use-case";
import InvalidCredentialsError from "../../application/errors/invalid-credentials-error";

class OrgController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createOrgSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      whatsapp: z.string(),
      address: z.object({
        city: z.string(),
        state: z.string(),
        street: z.string(),
        number: z.coerce.number(),
      }),
    });

    const { name, email, password, whatsapp, address } = createOrgSchema.parse(
      request.body
    );

    try {
      const createOrg = makeCreateOrgUseCase();
      await createOrg.execute({ name, email, password, whatsapp, address });

      return reply.status(201).send();
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return reply.status(409).send({ message: error.message });
      }

      throw error;
    }
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateOrgSchema = z.object({
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = authenticateOrgSchema.parse(request.body);

    try {
      const authenticateOrg = makeAuthenticateOrgUseCase();
      const { org } = await authenticateOrg.execute({ email, password });
      const token = await reply.jwtSign(
        {},
        { sign: { sub: org.id.toString() } }
      );
      return reply.status(200).send({ token });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(401).send({ message: error.message });
      }
      throw error;
    }
  }
}

export default OrgController;
