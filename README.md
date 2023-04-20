# SAAS Stock Manager
API RESTful para controle de estoque.


## Características

- Criação de multiplas filiais e usuarios para administrá-las respectivamente.  
- Vendas de produtos.
- Histórico das vendas.
- Produtos separados por categorias.

## Tecnólogias


- [Node.js](https://nodejs.org/) - Usado para o desenvolvimento da API.
- [Express](https://expressjs.com) - Framework web para Node.js
- [Prisma](https://www.prisma.io/) - Typescript ORM
- [PostgreSQL](https://www.postgresql.org/)- Banco de Dados SQL
- [Jest](https://jestjs.io) - Framework de Testes em JavaScript

## Instalação
Requer [Node.js](https://nodejs.org/) v16+ para executar o projeto.

Dependencias Globais.

```sh
npm install -g nodemon
```

Executando projeto em desenvolvimento.

```sh
npm install
npm run dev
```

Executando projeto em produção.

```sh
npm install
npm run start
```
.env
```sh
DATABASE_URL="postgresql://username:password@localhost:5432/stock_manager?schema=public"
JWT_SECRET=jwtSecret
```

#### Build

Para lançamento em produção:

```sh
npm run build
```

## License

MIT
