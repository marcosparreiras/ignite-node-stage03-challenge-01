import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import makeCreatePetUseCase from "../../application/use-cases/factories/make-create-pet-use-case";
import ResourceNotFoundError from "../../application/errors/resource-not-found-error";
import InvalidParameterError from "../../application/errors/invalid-parameter-error";
import makeGetPetUseCase from "../../application/use-cases/factories/make-get-pet-use-case";
import makeFetchPetsByCityUseCase from "../../application/use-cases/factories/make-fetch-pets-by-city-use-case";

class PetControllers {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createPetSchema = z.object({
      name: z.string(),
      description: z.string(),
      age: z.string(),
      size: z.string(),
      energyLevel: z.string(),
      levelOfIndependence: z.string(),
      typeOfEnvironment: z.string(),
    });

    const data = createPetSchema.parse(request.body);

    try {
      const createPet = makeCreatePetUseCase();
      const { pet } = await createPet.execute({
        ...data,
        orgId: request.user.sub,
      });

      return reply.status(201).send({ id: pet.id.toString() });
    } catch (error) {
      if (
        error instanceof ResourceNotFoundError ||
        error instanceof InvalidParameterError
      ) {
        return reply.status(400).send({ message: error.message });
      }
      throw error;
    }
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const indexPetParamsSchema = z.object({
      city: z.string(),
    });

    const indexPetQuerySchema = z.object({
      age: z.string().optional(),
      size: z.string().optional(),
      energyLevel: z.string().optional(),
      levelOfIndependence: z.string().optional(),
      typeOfEnvironment: z.string().optional(),
    });

    const { city } = indexPetParamsSchema.parse(request.params);
    const filters = indexPetQuerySchema.parse(request.query);

    try {
      const fetchPets = makeFetchPetsByCityUseCase();
      const { pets } = await fetchPets.execute({ city, filters });

      return reply.status(200).send({ pets });
    } catch (error) {
      throw error;
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const showPetParamsSchema = z.object({
      id: z.string(),
    });

    const { id } = showPetParamsSchema.parse(request.params);

    try {
      const getPet = makeGetPetUseCase();
      const { pet } = await getPet.execute({ petId: id });

      return reply.status(200).send({ pet });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return reply.status(400).send({ message: error.message });
      }
      throw error;
    }
  }
}

export default PetControllers;
