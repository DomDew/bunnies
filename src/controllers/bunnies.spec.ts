import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import seeds from "../db/seeds";
import { Bunny, Food } from "../interfaces";
import {
  batchPostBunnies,
  deleteBunny,
  getBunnies,
  getBunny,
  postBunny,
  putBunny,
} from "./bunnies";
import { getFoods } from "./foods";

describe("bunnies-controller", () => {
  beforeAll(() => {
    seeds.reset();
    seeds.populate();
  });

  afterAll(() => {
    seeds.reset();
  });

  describe("getBunnies", () => {
    test("should return a list of bunnies", async () => {
      const bunnies = await getBunnies().json<Bunny[]>();
      expect(bunnies.length).toEqual(seeds.bunnies.length);
    });
  });

  describe("getBunny", () => {
    test("should return a bunny", async () => {
      const bunnies = await getBunnies().json<Bunny & { id: number }[]>();
      const bunny = bunnies[0];

      const req = new Request(`http://localhost:3000/bunnies/${bunny.id}`);
      const res = getBunny(req, { id: bunny.id.toString() });

      expect(res.status).toEqual(200);
    });

    test("should return a 404 if bunny does not exist", () => {
      const req = new Request("http://localhost:3000/bunnies/999");
      const res = getBunny(req, { id: "999" });

      expect(res.status).toEqual(404);
    });
  });

  describe("putBunny", () => {
    test("should update a bunny", async () => {
      const bunnies = await getBunnies().json<Bunny & { id: number }[]>();
      const bunny = bunnies[0];

      const req = new Request(`http://localhost:3000/bunnies/${bunny.id}`, {
        method: "PUT",
        body: JSON.stringify(bunny),
      });

      const res = await putBunny(req, { id: bunny.id.toString() });

      expect(res.status).toEqual(204);
    });

    test("should return a 404 if bunny does not exist", async () => {
      const bunnies = await getBunnies().json<Bunny & { id: number }[]>();
      const bunny = bunnies[0];

      const req = new Request("http://localhost:3000/bunnies/999", {
        method: "PUT",
        body: JSON.stringify(bunny),
      });

      const res = await putBunny(req, { id: "999" });

      expect(res.status).toEqual(404);
    });
  });

  describe("postBunny", () => {
    test("should create a bunny", async () => {
      const foods = await getFoods().json<Food & { id: number }[]>();

      const bunny = {
        name: "Bugs Bunny",
        age: 80,
        favoriteFoodId: foods[0].id,
        fluffiness: 10,
      };

      const req = new Request("http://localhost:3000/bunnies", {
        method: "POST",
        body: JSON.stringify(bunny),
      });

      const res = await postBunny(req);

      expect(res.status).toEqual(201);
    });
  });

  describe("batchPostBunnies", () => {
    test("should create multiple bunnies", async () => {
      const foods = await getFoods().json<Food & { id: number }[]>();

      const bunnies = [
        {
          name: "Bugs Bunny",
          age: 80,
          favoriteFoodId: foods[0].id,
          fluffiness: 10,
        },
        {
          name: "Roger Rabbit",
          age: 30,
          favoriteFoodId: foods[1].id,
          fluffiness: 5,
        },
      ];

      const req = new Request("http://localhost:3000/bunnies", {
        method: "POST",
        body: JSON.stringify(bunnies),
      });

      const res = await batchPostBunnies(req);

      expect(res.status).toEqual(201);
    });
  });

  describe("deleteBunny", () => {
    test("should delete a bunny", async () => {
      const bunnies = await getBunnies().json<Bunny & { id: number }[]>();
      const bunny = bunnies[0];

      const req = new Request(`http://localhost:3000/bunnies/${bunny.id}`, {
        method: "DELETE",
      });

      const res = deleteBunny(req, { id: bunny.id.toString() });

      expect(res.status).toEqual(204);
    });

    test("should return a 404 if bunny does not exist", async () => {
      const req = new Request("http://localhost:3000/bunnies/999", {
        method: "DELETE",
      });

      const res = deleteBunny(req, { id: "999" });

      expect(res.status).toEqual(404);
    });
  });
});
