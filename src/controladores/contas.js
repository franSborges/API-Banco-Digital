let {
  banco,
  contas,
  saques,
  depositos,
  transferencias
} = require('../bancodados/bancodados');

let idConta = 1

const listaContasBancarias = (req, res) => {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(400).json({ mensagem: 'A senha do banco é obrigatória!' });
  }

  if (senha_banco !== banco.senha) {
    return res.status(400).json({ mensagem: 'A senha do banco informada é inválida!' });
  }

  return res.json(contas);
}

const criarContaBancaria = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  const contaExistente = contas.find(conta => conta.usuario.cpf === cpf || conta.usuario.email === email);

  if (contaExistente) {
    return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 números ou caracteres' });
  }

  if (cpf.length !== 11) {
    return res.status(400).json({ mensagem: 'CPF inválido, deve conter 11 números' });
  }

  const novaConta = {
    numero: idConta++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha
    }
  }
  contas.push(novaConta);
  return res.status(201).send();
}

const atualizarContaBancaria = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const { numeroConta } = req.params;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  const contaEncontrada = contas.find(idConta => Number(idConta.numero) === Number(numeroConta));

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'A conta informado não existe!!!' });
  }

  if (cpf !== contaEncontrada.usuario.cpf) {
    const existeCpf = contas.find(numeroCpf => numeroCpf.usuario.cpf === cpf);

    if (existeCpf) {
      return res.status(400).json({ mensagem: 'Já existe uma conta com o número informado!' });
    }
  }

  if (email !== contaEncontrada.usuario.email) {
    const existeEmail = contas.find(email => email.usuario.email === email);

    if (existeEmail) {
      return res.status(400).json({ mensagem: 'Já existe uma conta com o email informado!' });
    }
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 números ou caracteres' });
  }

  if (cpf.length !== 11) {
    return res.status(400).json({ mensagem: 'CPF inválido, deve conter 11 números' });
  }

  contaEncontrada.usuario = {
    nome,
    email,
    cpf,
    data_nascimento,
    telefone,
    senha
  }
  return res.status(204).send();
}

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  const contaAExcluir = contas.find(conta => conta.numero === Number(numeroConta));

  if (!contaAExcluir) {
    return res.status(404).json({ mensagem: 'A conta informado não existe!' });
  }

  if (contaAExcluir.saldo > 0) {
    return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
  }

  contas = contas.filter(conta => Number(conta.numero) !== Number(numeroConta));
  return res.status(204).send();
}

const consultarSaldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' });
  }

  const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
  }

  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: 'A senha informado é inválida!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 números ou caracteres' });
  }

  const saldos = {
    saldo: contaEncontrada.saldo
  }

  return res.status(200).json(saldos);
}

const consultarExtrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios para a consulta do extrato!' });
  }

  const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
  }

  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(400).json({ mensagem: 'A senha informado é inválida!' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 números ou caracteres' });
  }

  const deposito = depositos.filter(deposito => Number(deposito.numero_conta) === Number(numero_conta));
  const saque = saques.filter(saque => Number(saque.numero_conta) === Number(numero_conta));
  const transferenciasEnviadas = transferencias.filter(transferencia => Number(transferencia.numero_conta_origem) === Number(numero_conta));
  const transferenciasRecebidas = transferencias.filter(transferencia => Number(transferencia.numero_conta_destino) === Number(numero_conta));

  const extratoBancario = {
    depositos: deposito,
    saques: saque,
    transferenciasEnviadas,
    transferenciasRecebidas
  }
  res.status(200).json(extratoBancario);
}

module.exports = {
  listaContasBancarias,
  criarContaBancaria,
  atualizarContaBancaria,
  excluirConta,
  consultarSaldo,
  consultarExtrato
}
