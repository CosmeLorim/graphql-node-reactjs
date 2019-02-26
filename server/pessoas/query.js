const resolvers = {
  pessoas: async (parents, args, { dbConnection, query }, info) => {
    try {
      let sql = 'SELECT id_pessoa AS id, nome FROM pessoas'
      sql += typeof args.id !== 'undefined' ? ` WHERE id_pessoa = ${args.id};` : ';'

      const [pessoas] = await query(dbConnection, sql)
      return pessoas
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = {
  ...resolvers
}
