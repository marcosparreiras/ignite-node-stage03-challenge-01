import app from "../app";
import request from "supertest";

describe("Org create (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a org", async () => {
    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201);
  });
});
