# 🥩 Butcher Manager Portfolio

Sistema Full Stack de gerenciamento de açougue (vendas, estoque,
clientes e perdas).

> ⚠️ Este projeto é apenas para fins de demonstração/teste.

## 🚀 Como rodar o projeto

Siga os passos abaixo exatamente na ordem.

## 1. Clonar o repositório

``` bash
git clone <url-do-repositorio>
cd Butcher-manager-portfolio
```

------------------------------------------------------------------------

## 2. Instalar as dependências

### Backend

cd back
npm install

### Frontend

cd ../front
npm install

------------------------------------------------------------------------

## 3. Configurar variáveis de ambiente

Dentro da pasta `back`:

1.  Renomeie o arquivo:

.env.example → .env

2.  Edite o arquivo `.env` com suas credenciais do PostgreSQL:


    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=Acougue

    JWT_SECRET=qualquer_token_seguro

------------------------------------------------------------------------

## 4. Criar o banco de dados

No PostgreSQL, crie um banco chamado:

    CREATE DATABASE Acougue;

------------------------------------------------------------------------

## 5. Restaurar o banco (backup)

O projeto já possui um backup na raiz:

backup.sql

### Usando pgAdmin (recomendado):

1.  Abra o pgAdmin
2.  Clique com o botão direito no banco **Acougue**
3.  Vá em **Query Tool**
4.  Cole todo o conteúdo do arquivo `backup.sql`
5.  Execute

------------------------------------------------------------------------

## 6. Rodar o projeto

### Backend

``` bash
cd back
npm run dev
```

### Frontend

``` bash
cd front
npm run dev
```

------------------------------------------------------------------------

## 🔐 Acesso ao sistema

Como este projeto é apenas para teste, já existe um usuário criado:

Usuário: admin
Senha: 1234567

> A senha está armazenada como hash no banco.

------------------------------------------------------------------------

## 📁 Estrutura do projeto

    Butcher-manager-portfolio/
    ├── back/
    ├── front/
    ├── backup.sql
    └── README.md

------------------------------------------------------------------------

## ⚠️ Observações importantes

-   O arquivo `.env` não está no repositório por segurança
-   É necessário configurá-lo manualmente
-   O banco deve ser criado antes de rodar o sistema
-   O backup já contém dados de exemplo
