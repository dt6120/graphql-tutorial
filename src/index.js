const { ApolloServer } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const { PrismaClient } = require('@prisma/client')
const path = require('path')
const { readFileSync } = require('fs')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')
const Vote = require('./resolvers/Vote')

const { getUserId } = require('./utils')

const prisma = new PrismaClient()
const pubsub = new PubSub()

// implementation of GraphQL schema
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}

const server = new ApolloServer({
  // typeDefs: readFileSync(
  //   new URL('./schema.graphql', import.meta.url),
  //   'utf-8'
  // ),
  typeDefs: readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    pubsub,
    userId: req && req.headers.authorization ? getUserId(req) : null
  })
})

server.listen()
  .then(({ url }) => console.log(`Server is running on ${url}`))