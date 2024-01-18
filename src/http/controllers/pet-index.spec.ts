import app from "../app";
import request from "supertest";

describe("Pet index (e2e)", () => {
  beforeAll(async () => {
    app.ready();

    await request(app.server)
      .post("/orgs")
      .send({
        name: "Org-01",
        email: "org01@test.com",
        password: "123456",
        whatsapp: "31999999999",
        address: {
          city: "city-01",
          state: "Some state",
          street: "Some street",
          number: 1001,
        },
      });

    await request(app.server)
      .post("/orgs")
      .send({
        name: "Org-02",
        email: "org02@test.com",
        password: "123456",
        whatsapp: "31999999999",
        address: {
          city: "city-02",
          state: "Some state",
          street: "Some street",
          number: 1002,
        },
      });

    const authenticateOrg01Response = await request(app.server)
      .post("/orgs/sessions")
      .send({
        email: "org01@test.com",
        password: "123456",
      });

    const authenticateOrg02Response = await request(app.server)
      .post("/orgs/sessions")
      .send({
        email: "org02@test.com",
        password: "123456",
      });

    await request(app.server)
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
      .set({ Authorization: `Bearer ${authenticateOrg01Response.body.token}` });

    await request(app.server)
      .post("/pets")
      .send({
        name: "Some Pet",
        description: "Some description",
        age: "senior",
        size: "small",
        energyLevel: "low",
        levelOfIndependence: "low",
        typeOfEnvironment: "open",
      })
      .set({ Authorization: `Bearer ${authenticateOrg01Response.body.token}` });

    await request(app.server)
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
      .set({ Authorization: `Bearer ${authenticateOrg02Response.body.token}` });
  });

  afterAll(async () => {
    app.close();
  });

  it("Should be able to fetch pets by city", async () => {
    const fetchPetByCityResponse = await request(app.server)
      .get("/pets/search/city-01")
      .send();
    expect(fetchPetByCityResponse.statusCode).toEqual(200);
    expect(fetchPetByCityResponse.body.pets).toHaveLength(2);
  });

  it("Should be able to use others filter when fetching pets by city", async () => {
    const fetchPetByCityResponse = await request(app.server)
      .get("/pets/search/city-01?age=puppy")
      .send();

    expect(fetchPetByCityResponse.statusCode).toEqual(200);
    expect(fetchPetByCityResponse.body.pets).toHaveLength(1);
  });
});
