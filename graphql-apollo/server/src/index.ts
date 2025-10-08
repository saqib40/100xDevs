import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';

// Import schema, resolvers, and context type
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { MyContext } from './context.js';

async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    // Pass the context type to ApolloServer
    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }: { req: Request }) => ({ token: req.headers.token }),
        }),
    );

    const PORT = 4000;
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}
startServer();