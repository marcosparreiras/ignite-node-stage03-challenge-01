import app from "../app";
import request from "supertest";

describe("OrgControllers - authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip("Should be able to authenticate a org", async () => {
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

    const response = await request(app.server).post("/orgs/sessions").send({
      email: "org01@test.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).toEqual(expect.any(String));
  });
});
