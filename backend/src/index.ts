import http from 'http';
import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

// DATABASE
import './db/mongoose';

//= SCHEMA
import { typeDefs } from './graphql/typeDefs';

//= RESOLVERS
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';

// EXPRESS SETUP
const app = express();
const PORT = process.env.PORT;

//======= APOLLO SERVER
//= Apollo Subscription
const pubsub = new PubSub();

//= setup
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: () => ({ pubsub }),
});

server.applyMiddleware({ app });

//= Subscriptions middleware
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
//======

httpServer.listen(PORT);

// SERVER'S LOG
console.log(
  `Server is running at http://localhost:${PORT}${server.graphqlPath} `
);
