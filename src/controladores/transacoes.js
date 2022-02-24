let {
  contas,
  saques,
  depositos,
  transferencias
} = require('../bancodados/bancodados');

const { format } = require('date-fns');

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res.status(400).json({mensagem:'O número da conta e o valor são obrigatórios para o deposito!'});
  }

  const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numero_conta));

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'A conta informado não existe!' });
  }

  if (valor <= 0) {
    return res.status(400).json({ mensagem: 'O valor do deposito não pode ser negativo nem zerado!' });
  }

  contaEncontrada.saldo += valor;

  const registroDepositos = {
    data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    numero_conta,
    valor
  }

  depositos.push(registroDepositos);
  return res.status(201).send();
}

const sacarDinheiro = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios para o saque!' });
  }

  const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'A conta informado não existe!' });
  }

  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: 'A senha informado é inválida!' });
  }

  if (contaEncontrada.saldo < valor) {
    return res.status(403).json({ mensagem: 'Não a saldo disponivel para o saque!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 números ou caracteres' });
  }

  contaEncontrada.saldo -= valor;

  const registroSaques = {
    data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    numero_conta,
    valor,
    senha
  }
  saques.push(registroSaques);
  return res.status(201).send();
}

const transferenciaBanco = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(400).json({mensagem:'O número da conta de origem e o número da conta de destino são obrigatórios para a tranferência!'});
  }

  const contaDeOrigem = contas.find(umaConta => umaConta.numero === Number(numero_conta_origem));
  const contaDeDestino = contas.find(umaConta => umaConta.numero === Number(numero_conta_destino));

  if (!contaDeOrigem) {
    return res.status(404).json({ mensagem: 'Conta de origem não encontrada!' });
  }

  if (!contaDeDestino) {
    return res.status(404).json({ mensagem: 'Conta de destino não encontrada!' });
  }

  if (contaDeOrigem.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: 'A senha informado é inválida!' });
  }

  if (contaDeOrigem.saldo < valor) {
    return res.status(400).json({ mensagem: 'Não a saldo disponivel para transferência!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 números ou caracteres' });
  }

  contaDeOrigem.saldo -= valor;
  contaDeDestino.saldo += valor;

  const registroTransferencias = {
    data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    numero_conta_origem,
    numero_conta_destino,
    valor
  }

  transferencias.push(registroTransferencias);
  return res.status(201).send();
}

module.exports = {
  depositar,
  sacarDinheiro,
  transferenciaBanco
}
