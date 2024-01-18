import app from "../app";
import request from "supertest";

describe("Pet create (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a pet", async () => {
    await request(app.server)
      .post("/orgs")
      .send({
        name: "Org-01",
        email: "org01@test.com",
        password: "123456",
        whatsapp: "31999999999",
        address: {
          city: "Some city",
          state: "Some state",
          street: "Some street",
          number: 1001,
        },
      });

    const authenticateOrgResponse = await request(app.server)
      .post("/orgs/sessions")
      .send({
        email: "org01@test.com",
        password: "123456",
      });

    const createPetResponse = await request(app.server)
      .post("/pets")
      .send({
        name: "Some Pet",
        description: "Some description",
        age: "puppy",
        size: "small",
        energyLevel: "low",
        levelOfIndependence: "low",
        typeOfEnvironment: "open",
      })
      .set({ Authorization: `Bearer ${authenticateOrgResponse.body.token}` });

    expect(createPetResponse.statusCode).toEqual(201);
  });

  it("Should not be able to create a pet without been an authenticated org", async () => {
    const createPetResponse = await request(app.server).post("/pets").send({
      name: "Some Pet",
      description: "Some description",
      age: "puppy",
      size: "small",
      energyLevel: "low",
      levelOfIndependence: "low",
      typeOfEnvironment: "open",
    });

    expect(createPetResponse.statusCode).toEqual(401);
  });
});
