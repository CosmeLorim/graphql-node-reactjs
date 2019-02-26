// Caso faça deploy no Heroku descomente as linhas a seguir
// As variáveis de ambiente devem ser configuradas via CLI Heroku ou através da interface Web
// Consulte: <https://devcenter.heroku.com/articles/config-vars>
// Ou se as variáveis forem carregadas por outros meio
// if (process.env !== 'production') {
require('dotenv').config()
// }

// Servidor Apollo para servir o GraphQL
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')

// Express está sendo utilizando única e puramente para servir os arquivos estáticos gerados na build em produção
const express = require('express')

const typeDefs = importSchema('./server/schema.graphql')
const { resolvers } = require('./resolvers')

// Carregamento da conexão de banco de dados, fora implementado com a Técnica de Pooling
// Consulte: <https://pt.wikipedia.org/wiki/Pool_de_conex%C3%B5es>
// Além disso escrevi um Wrapper para fazer uso do async await
const { PoolConnection, query } = require('./dbConfig')
const dbConnection = PoolConnection()

// Caso esteja em produção o modo de instrospeção e o playground é desativado
const server =
  process.env === 'production'
    ? new ApolloServer({ typeDefs, resolvers, context: { dbConnection, query } })
    : new ApolloServer({ typeDefs, resolvers, context: { dbConnection, query }, introspection: true, playground: true })

// Configuração para load dos arquivos do build do front-end ReactJS
const app = express()
app.use(express.static('./react-ui/build'))

// Configuração de porta para o back-end, em produção tanto o back-end como o front-end serão servidos na mesma porta
// A rota padrão do GraphQL é "/graphql", caso precise utilizá-la por algum motivo em algum rota de arquivo ou no express pode ser mudada
const path = process.env.GRAPHQL_PATH || `/graphql`

server.applyMiddleware({ app, path })

const port = process.env.PORT || 4000

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}, env: ${process.env.NODE_ENV}`
  )
)
