# API Banco Digital

RESTful API para um Banco Digital, desenvolvida em Node.js com JavaScript é Express.js, com
as seguintes funcionalidades abaixo.
## Features

## Consultas e criação de contas bancárias

#### Criação de conta bancária

```http
  POST /contas
```
Esse endpoint, é responsável pela criação de conta bancária


#### Listagem de contas bancárias

```http
  GET /contas
```
Esse endpoint, é responsável pela listagem de contas bancárias


#### Atualizar dados de conta bancária

```http 
  PUT /contas/:numeroConta/usuario
```
Esse endpoint, é para atualizar dados de uma conta bancária


#### Excluir conta bancária

```http 
  DELETE /contas/:numeroConta/usuario
```
Esse endpoint, é responsável pela exclusão de conta bancária

## Transações bancárias


#### deposito de dinheiro
```http 
  POST /transacoes/depositar
```
Esse endpoint, é responsável pelo deposito de "dinheiro" em conta bancária


#### Saque de dinheiro 
```http 
  POST /transacoes/sacar
```
Esse endpoint, é responsável pelo saque de "dinheiro" de  uma conta bancária


#### transferências de dinheiro 
```http 
  POST /transacoes/transferir
```
Esse endpoint, é responsável pelas transferências de "dinheiro" de uma conta bancária para outra





## 🔗 Links
[![Instagram](https://img.shields.io/badge/instagram-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.instagram.com/franb0rges.dev/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)


## 🛠 Skills
Node.js, API, JavaScript

