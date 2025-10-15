import {describe, expect, test, it, vi} from 'vitest';
import request from "supertest";
import { app } from "../index";
import { prismaClient } from '../__mocks__/db'; // needed to use mockResolvedValue

// two steps
// external service client defined in seperate file
// and then we mock it here
// vi.mock('../db', () => ({
//   prismaClient: { sum: { create: vi.fn() }} // the import of prisma client must be mocked with this
// }));
// the problem with above approach is that we have to mock each table/key
// one at a time, how about we mock everythin??
// deep-mocking with -> npm i -D vitest-mock-extended 
// __mocks__ must be at same level as of db.ts that's right next to what we want to mock

vi.mock('../db'); // will understand the deep mock we have defined for db.ts at __mocks__/db.ts

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
      // before you send the request
      prismaClient.sum.create.mockResolvedValue({
        id: 1,
        a: 1,
        b: 1,
        result: 3
      });
      // now send the request
      const res = await request(app).post("/sum").send({a: 1,b: 2});
      expect(prismaClient.sum.create).toHaveBeenCalledWith({
        data: {
          a: 1,
          b: 2,
          result: 3
        }
      })
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(3);
    });

    it("should return 411 if no inputs are provided", async () => {
      const res = await request(app).post("/sum").send({});
      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Incorrect inputs");
    });
});

describe("GET /sum", () => {
  it("should return the sum of two numbers", async () => {
      prismaClient.sum.create.mockResolvedValue({
        id: 1,
        a: 1,
        b: 1,
        result: 3
      });

      const res = await request(app)
        .get("/sum")
        .set({
          a: "1",
          b: "2"
        })
        .send();
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app)
      .get("/sum").send();
    expect(res.statusCode).toBe(411);
  });

});