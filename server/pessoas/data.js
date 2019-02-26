const resolvers = {
  Pessoa: {
    livrosFavoritos: async (parents, args, { dbConnection, query }, info) => {
      const sql =
          `SELECT b.id_book as id, b.title, b.author from livros_favoritos lf ` +
          `INNER JOIN books b ON b.id_book = lf.book ` +
          `INNER JOIN pessoas p ON p.id_pessoa = lf.pessoa ` +
          `WHERE p.id_pessoa = ${parents.id};`

      const [livrosFavoritos] = await query(dbConnection, sql)
      return livrosFavoritos
    }
  }
}

module.exports = {
  ...resolvers
}
