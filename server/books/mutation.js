const resolvers = {
  createBook: async (parents, args, { dbConnection, query }, info) => {
    const sqlConsultaLivro = `SELECT id_book FROM books WHERE title = '${args.data.title}'`
    const [bookJaRegistrado] = await query(dbConnection, sqlConsultaLivro)

    if (bookJaRegistrado.length) {
      throw new Error('Livro já cadastrado')
    }

    const sqlRegistroLivro = `INSERT INTO books (title, author) VALUES ('${args.data.title}', '${args.data.author}');`
    const registroBook = await query(dbConnection, sqlRegistroLivro)

    const newBook = {
      id: registroBook[0].insertId,
      ...args.data
    }
    return newBook
  },
  addFavoriteBook: async (parents, { bookId, pessoaId }, { dbConnection, query }, info) => {
    const sqlConsultaLivro = `SELECT id_book FROM books WHERE id_book = ${bookId}`
    const sqlConsultaPessoa = `SELECT id_pessoa id, nome FROM pessoas WHERE id_pessoa = ${pessoaId}`
    const sqlConsultaLivroFavorito = `SELECT id_favorito FROM livros_favoritos WHERE pessoa = ${pessoaId} AND book = ${bookId}`

    const [[consultaLivro], [ConsultaPessoa], [ConsultaLivroFavorito]] = await Promise.all([
      query(dbConnection, sqlConsultaLivro),
      query(dbConnection, sqlConsultaPessoa),
      query(dbConnection, sqlConsultaLivroFavorito)
    ])

    if (!consultaLivro.length) {
      throw new Error('Livro não encontrado.')
    }

    if (!ConsultaPessoa.length) {
      throw new Error('Pessoa não encontrada.')
    }

    if (ConsultaLivroFavorito.length) {
      throw new Error('Livro já está na lista de livros favoritos.')
    }

    const sqlRegistroNovoFavorito = `INSERT INTO livros_favoritos (pessoa, book) VALUES (${pessoaId}, ${bookId})`
    await query(dbConnection, sqlRegistroNovoFavorito)

    return ConsultaPessoa[0]
  }
}

module.exports = {
  ...resolvers
}
