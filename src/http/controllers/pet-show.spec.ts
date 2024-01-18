import app from "../app";
import request from "supertest";

describe("Pet show (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it("Should be able to get a pet by id", async () => {
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

    const petId = createPetResponse.body.id;
    const response = await request(app.server).get(`/pets/${petId}`).send();

    expect(response.statusCode).toEqual(200);
  });
});
