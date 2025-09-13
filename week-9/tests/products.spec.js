import { describe, it, expect, afterAll } from "vitest";
import fastify from "../app.js";

// 201 - Created
// 400 - Bad Request
// 500 - Internal Server Error

describe("Products", () => {
  describe("Create Product", () => {
    afterAll(async () => {
      await fastify.pg.query("DELETE FROM products");
    });

    it("should create a product", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/products",
        body: {
          name: "Product 1",
          description: "Description 1",
          price: 100,
        },
      });
      expect(response.statusCode).toBe(201);
      expect(response.json()).toEqual({
        product: {
          name: "Product 1",
          description: "Description 1",
          price: 100,
        },
      });

      // Validate we stored the product in our Pg database
      const products = await fastify.pg.query("SELECT * FROM products");
      
      expect(products.rows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Product 1",
            description: "Description 1",
          })
        ])
      );
      expect(products.rows.length).toBe(1);
    });
  });

});
