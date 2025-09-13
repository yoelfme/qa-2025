// Import the framework and instantiate it
import fastify from './app.js'

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}