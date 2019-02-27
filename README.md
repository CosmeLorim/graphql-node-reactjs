# graphql-node-reactjs
Boilerplate de aplicação Web (Front-end e Back-end) com API GraphQL sobre NodeJS e com ReactJS.
Também contém o express para servir os arquivos estáticos do build.

# Stack
  * Apollo Server <https://www.apollographql.com/docs/apollo-server/>;
  * GraphQL <https://graphql.org/>;
  * ReactJS <https://reactjs.org/>;
  * ExpressJS <http://expressjs.com/>;
  * Driver Mysql <https://www.npmjs.com/package/mysql>;

Lembrando que o uso do Mysql foi apenas ilustrativo,  é complemente opcional, bastando apenas remover a dependência `mysql` e instalar para o novo banco que for fazer uso, mas está pronto para uso em produção.

# Pré-requisitos
  * Node.js 10.15.1 +
  * Mysql 5.7 +
  * NPM 6.8 +

# Executando
São duas aplicações que estão no mesmo repositório, o front-end em ReactJS está em  `react-ui/` e o back-end NodeJS dentro de `server/`.
Quando em desenvolvimento necessita instalar as dependências e subir separadamente cada servidor e configurar as variáveis de ambientes.
  * Para iniciar o back-end execute:
```bash
  $ cp .env.example .env
```
  * Faça a configuração do arquivo `.env` e execute:
```bash
  $ npm install
  $ npm run dev
```
  * Para o front-end execute:
```bash
  $ cd react-ui
  $ npm install
  $ npm start
```

# Deploy
  * Em produção basta executar os comandos:
```bash
  $ npm install
  $ npm run prod 
```
Lembrando que assim o servidor node será executado em background e um novo processo será iniciado para efetuar o build do front-end.
Para executar o build do front-end separadamente e subir o servidor node em primeiro plano execute:
```bash
  $ npm run build
  $ npm install
  $ npm start
```

# Estrutura de arquivos
server/
```
server/
├── books/
│   ├── data.js
│   ├── mutation.js
│   ├── query.js
│   └── type.js
├── pessoas/
│   ├── data.js
│   ├── mutation.js
│   ├── query.js
│   └── type.js
├── resolvers.js
└── schema.graphql
react-ui/
├── build/
├── src/
```

# Observações
Há algumas observações que precisam ser revisadas conforme o seu caso, verifique o arquivo `server/index.js`.
