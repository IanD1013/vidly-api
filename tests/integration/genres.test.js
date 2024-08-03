const request = require("supertest");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      //   expect(res.body.length).toBe(3);
      //   expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      //   expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
      //   expect(res.body.some((g) => g.name === "genre3")).toBeTruthy();
    });
  });
});
