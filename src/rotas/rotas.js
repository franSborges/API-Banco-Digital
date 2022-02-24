const express = require('express');
const controleContas = require('../controladores/contas');
const transacoesBancarias = require('../controladores/transacoes');

const app = express();

app.get('/contas', controleContas.listaContasBancarias);
app.post('/contas', controleContas.criarContaBancaria);
app.put('/contas/:numeroConta/usuario', controleContas.atualizarContaBancaria);
app.delete('/contas/:numeroConta', controleContas.excluirConta);

app.post('/transacoes/depositar', transacoesBancarias.depositar);
app.post('/transacoes/sacar', transacoesBancarias.sacarDinheiro);
app.post('/transacoes/transferir', transacoesBancarias.transferenciaBanco)

app.get('/contas/saldo', controleContas.consultarSaldo);
app.get('/contas/extrato', controleContas.consultarExtrato);

module.exports = app;
