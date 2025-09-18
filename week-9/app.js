import Fastify from "fastify";
import pg from "@fastify/postgres";

const fastify = Fastify({
  logger: true,
});

fastify.register(pg, {
  connectionString: "postgres://postgres:Losmejoresalumnos!@localhost/store",
});

// Create a new product
fastify.route({
  method: "POST",
  url: "/products",
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number", minimum: 1 },
      },
    },
  },
  handler: async function handler(request, reply) {
    const { name, description, price } = request.body;

    const client = await fastify.pg.connect();
    try {
      const { rowCount } = await client.query(
        "INSERT INTO products (name, description, price) VALUES ($1, $2, $3)",
        [name, description, price]
      );

      if (rowCount === 0) {
        reply.status(500).send({ error: "Failed to create product" });
        return;
      }

      reply.status(201).send({ product: { name, description, price } });
    } finally {
      // Release the client immediately after query resolves, or upon error
      client.release();
    }
  },
});

export default fastify;
