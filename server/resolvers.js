const pessoasQuery = require('./pessoas/query')
const pessoasMutation = require('./pessoas/mutation')
const pessoasData = require('./pessoas/data')

const booksQuery = require('./books/query')
const booksMutation = require('./books/mutation')

module.exports.resolvers = {
  Query: {
    ...pessoasQuery,
    ...booksQuery
  },
  Mutation: {
    ...pessoasMutation,
    ...booksMutation
  },
  ...pessoasData
}
