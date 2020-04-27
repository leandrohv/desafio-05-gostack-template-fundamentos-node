import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

/**
 * [x] GET /transactions: Essa rota deve retornar uma listagem com todas as transações
 *                          que você cadastrou até agora junto com o valor
 *                          de soma de entradas, retiradas e total de crédito
 */
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/**
 * [x] POST /transactions: A rota deve receber "title", "value" e "type" dentro do corpo da requisição,
 *                          sendo "type" o tipo da transação, que deve ser
 *                          "income" para entradas (depósitos) e
 *                          "outcome" para saidas (retiradas).
 * [x] Ao cadastrar uma nova transação, ela deve ser armazenada dentro de um objeto
 *                          com o formato como o seguinte:
 *                          {
                              "id": "uuid",
                              "title": "Salário",
                              "value": 3000,
                              "type": "income"
                            }
 */
transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
