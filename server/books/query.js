const resolvers = {
  books: async (parents, args, { dbConnection, query }, info) => {
    try {
      let sql = 'SELECT id_book AS id, title, author FROM books'
      sql += typeof args.id !== 'undefined' ? ` WHERE id_book = ${args.id};` : ';'

      const [books] = await query(dbConnection, sql)
      return books
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = {
  ...resolvers
}
